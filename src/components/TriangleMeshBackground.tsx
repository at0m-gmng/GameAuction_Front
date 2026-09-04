import { useEffect, useRef } from "react";
import Delaunator from "delaunator";

export interface MeshPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  renderX: number;
  renderY: number;
  isAnchor: boolean;
}

const INTERIOR_POINT_COUNT = 90;
const BORDER_SPACING = 140;
const DRIFT_SPEED = 0.2;
const MAGNET_RADIUS = 150;
const MAGNET_PULL = 0.6;
const EASE = 0.1;
const LINE_COLOR = "rgba(255, 176, 0, 0.16)";
const NODE_COLOR = "rgba(255, 176, 0, 0.9)";
const NODE_GLOW = "rgba(255, 176, 0, 0.9)";
const NODE_SIZE = 6;

export function buildPoints(width: number, height: number): MeshPoint[] {
  const points: MeshPoint[] = [];

  const makeAnchor = (x: number, y: number): MeshPoint => ({
    x, y, vx: 0, vy: 0, renderX: x, renderY: y, isAnchor: true,
  });
  const makeInterior = (x: number, y: number): MeshPoint => ({
    x,
    y,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    renderX: x,
    renderY: y,
    isAnchor: false,
  });

  // Anchor points pin the mesh to the screen edges — fixed in place, not
  // drawn as nodes — so triangulation reaches the border with no empty gaps.
  const nx = Math.max(2, Math.round(width / BORDER_SPACING));
  const ny = Math.max(2, Math.round(height / BORDER_SPACING));

  for (let i = 0; i <= nx; i++) {
    const x = (i / nx) * width;
    points.push(makeAnchor(x, 0));
    points.push(makeAnchor(x, height));
  }
  for (let i = 1; i < ny; i++) {
    const y = (i / ny) * height;
    points.push(makeAnchor(0, y));
    points.push(makeAnchor(width, y));
  }

  for (let i = 0; i < INTERIOR_POINT_COUNT; i++) {
    points.push(makeInterior(Math.random() * width, Math.random() * height));
  }

  return points;
}

export default function TriangleMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let points: MeshPoint[] = [];
    let coords = new Float64Array(0);
    let delaunay: Delaunator<Float64Array> | null = null;
    let mouse: { x: number; y: number } | null = null;
    let animationFrame: number;

    const setup = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      width = w;
      height = h;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = buildPoints(width, height);
      coords = new Float64Array(points.length * 2);
      points.forEach((p, i) => {
        coords[i * 2] = p.x;
        coords[i * 2 + 1] = p.y;
      });
      delaunay = new Delaunator(coords);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouse = null;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      mouse = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };
    const handleTouchEnd = () => {
      mouse = null;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const hot = new Set<number>();

      points.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) { p.vx *= -1; p.x = Math.max(0, Math.min(width, p.x)); }
        if (p.y < 0 || p.y > height) { p.vy *= -1; p.y = Math.max(0, Math.min(height, p.y)); }

        let targetX = p.x;
        let targetY = p.y;

        if (mouse && !p.isAnchor) {
          const dx = mouse.x - p.renderX;
          const dy = mouse.y - p.renderY;
          const dist = Math.hypot(dx, dy);
          if (dist < MAGNET_RADIUS) {
            hot.add(i);
            const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_PULL;
            targetX = p.x + dx * pull;
            targetY = p.y + dy * pull;
          }
        }

        p.renderX += (targetX - p.renderX) * EASE;
        p.renderY += (targetY - p.renderY) * EASE;
      });

      if (delaunay) {
        points.forEach((p, i) => {
          coords[i * 2] = p.renderX;
          coords[i * 2 + 1] = p.renderY;
        });
        delaunay.update();

        const triangles = delaunay.triangles;

        // Mesh lines — flat, no glow.
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < triangles.length; i += 3) {
          const a = points[triangles[i]];
          const b = points[triangles[i + 1]];
          const c = points[triangles[i + 2]];
          ctx.moveTo(a.renderX, a.renderY);
          ctx.lineTo(b.renderX, b.renderY);
          ctx.lineTo(c.renderX, c.renderY);
          ctx.closePath();
        }
        ctx.stroke();

        // Node markers — glowing triangles at every vertex, except anchors.
        ctx.save();
        ctx.fillStyle = NODE_COLOR;
        ctx.shadowBlur = 8;
        ctx.shadowColor = NODE_GLOW;
        points.forEach((p, i) => {
          if (p.isAnchor) return;
          const s = hot.has(i) ? NODE_SIZE * 1.5 : NODE_SIZE;
          ctx.beginPath();
          ctx.moveTo(p.renderX, p.renderY - s);
          ctx.lineTo(p.renderX + s * 0.87, p.renderY + s * 0.5);
          ctx.lineTo(p.renderX - s * 0.87, p.renderY + s * 0.5);
          ctx.closePath();
          ctx.fill();
        });
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const handleResize = () => setup(parent.clientWidth, parent.clientHeight);

    // Defer the first measurement to a macrotask: in dev mode Vite injects
    // Tailwind's CSS via JS after the initial script runs, so measuring
    // parent.clientWidth synchronously in this effect can catch a pre-layout
    // width. A setTimeout(0) runs after that CSS is applied.
    const initialMeasure = setTimeout(handleResize, 0);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    animationFrame = requestAnimationFrame(tick);

    return () => {
      clearTimeout(initialMeasure);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" />;
}
