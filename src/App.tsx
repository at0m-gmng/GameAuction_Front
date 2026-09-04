import { useState, useRef, useCallback, useEffect } from "react";
import { AnimPanel } from "@/dev/AnimPanel";
import { InteractiveLanding } from "@/screens/Landing";
import { InteractiveLobbies } from "@/screens/Lobbies";
import { InteractiveLogin } from "@/screens/Login";
import { InteractiveCatalog } from "@/screens/Catalog";
import { InteractiveProfile } from "@/screens/Profile";
import type { Page } from "@/lib/navigation";
import { type AnimConfig, type TransitionState, defaultConfig, getAnimationNames } from "@/lib/transitions";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [pendingPage, setPendingPage] = useState<Page | null>(null);
  const [transitionState, setTransitionState] = useState<TransitionState>("idle");
  const [config, setConfig] = useState<AnimConfig>(defaultConfig);
  const [panelOpen, setPanelOpen] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const navigate = useCallback(
    (target: Page) => {
      if (target === page || transitionState !== "idle") return;
      setPendingPage(target);
      setTransitionState("exiting");

      timeoutRef.current = setTimeout(() => {
        setPage(target);
        setTransitionState("entering");

        timeoutRef.current = setTimeout(() => {
          setTransitionState("idle");
          setPendingPage(null);
        }, config.duration);
      }, config.duration);
    },
    [page, transitionState, config.duration]
  );

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const { enter, exit } = getAnimationNames(config.transition, config.direction);

  const screenAnimation = (): React.CSSProperties => {
    if (transitionState === "exiting") {
      return {
        animation: `${exit} ${config.duration}ms ${config.easing} forwards`,
        filter: config.glitchColor && config.transition === "glitch"
          ? "drop-shadow(2px 0 0 rgba(255,0,80,0.5)) drop-shadow(-2px 0 0 rgba(0,200,255,0.5))"
          : undefined,
      };
    }
    if (transitionState === "entering") {
      return {
        animation: `${enter} ${config.duration}ms ${config.easing} forwards`,
        filter: config.glitchColor && config.transition === "glitch"
          ? "drop-shadow(2px 0 0 rgba(255,0,80,0.5)) drop-shadow(-2px 0 0 rgba(0,200,255,0.5))"
          : undefined,
      };
    }
    return {};
  };

  const overlayClasses = [
    config.scanlines ? "nx-scanlines" : "",
    config.grid ? "nx-grid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Screen */}
      <div
        className={overlayClasses}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "auto",
          ...screenAnimation(),
        }}
      >
        {page === "landing" ? (
          <InteractiveLanding onNavigate={navigate} />
        ) : page === "lobbies" ? (
          <InteractiveLobbies onNavigate={navigate} />
        ) : page === "login" ? (
          <InteractiveLogin onNavigate={navigate} />
        ) : page === "catalog" ? (
          <InteractiveCatalog onNavigate={navigate} />
        ) : (
          <InteractiveProfile onNavigate={navigate} />
        )}
      </div>

      {/* Animation panel — dev only, disabled in production builds */}
      {import.meta.env.DEV && (
        <AnimPanel
          config={config}
          onChange={(patch) => setConfig((c) => ({ ...c, ...patch }))}
          open={panelOpen}
          onToggle={() => setPanelOpen((o) => !o)}
        />
      )}
    </div>
  );
}
