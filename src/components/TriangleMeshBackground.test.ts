import { describe, it, expect } from "vitest";
import { buildPoints } from "./TriangleMeshBackground";

describe("buildPoints", () => {
  const WIDTH = 1280;
  const HEIGHT = 820;
  const points = buildPoints(WIDTH, HEIGHT);
  const anchors = points.filter((p) => p.isAnchor);
  const interior = points.filter((p) => !p.isAnchor);

  it("produces both anchor and interior points", () => {
    expect(anchors.length).toBeGreaterThan(0);
    expect(interior.length).toBeGreaterThan(0);
  });

  it("keeps every anchor exactly on one of the four screen edges", () => {
    for (const p of anchors) {
      const onEdge = p.x === 0 || p.x === WIDTH || p.y === 0 || p.y === HEIGHT;
      expect(onEdge).toBe(true);
    }
  });

  it("gives every anchor zero velocity so it never drifts", () => {
    for (const p of anchors) {
      expect(p.vx).toBe(0);
      expect(p.vy).toBe(0);
    }
  });

  it("includes all four corners", () => {
    const has = (x: number, y: number) => anchors.some((p) => p.x === x && p.y === y);
    expect(has(0, 0)).toBe(true);
    expect(has(WIDTH, 0)).toBe(true);
    expect(has(0, HEIGHT)).toBe(true);
    expect(has(WIDTH, HEIGHT)).toBe(true);
  });

  it("keeps interior points within the canvas bounds", () => {
    for (const p of interior) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(WIDTH);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(HEIGHT);
    }
  });

  it("initialises renderX/renderY to match x/y for every point", () => {
    for (const p of points) {
      expect(p.renderX).toBe(p.x);
      expect(p.renderY).toBe(p.y);
    }
  });
});
