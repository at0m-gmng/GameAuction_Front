import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/auth";
import LandingTerminal from "@/imports/LandingTerminal/index";
import OpenLobbies from "@/imports/OpenLobbies/index";
import ProfileInventory from "@/imports/ProfileInventory/index";
import loginSvgPaths from "@/imports/LoginRegistration/svg-i5tnpjrq0m";
import catalogSvgPaths from "@/imports/ItemCatalog/svg-r87hwqqn1g";

// Catalog item images
import imgCat0 from "@/imports/ItemCatalog/ab63c4449a5f71f870f6dc70653f918e549f30af.png";
import imgCat1 from "@/imports/ItemCatalog/5fae9ce40f452646114b776c34c365fb88fb96bb.png";
import imgCat2 from "@/imports/ItemCatalog/73513a2b072469961baf7a661f88e955fb066408.png";
import imgCat3 from "@/imports/ItemCatalog/a1c0d58aa5ee67c834e439faca8f15b7a9e7db18.png";
import imgCat4 from "@/imports/ItemCatalog/8ef904f465f6741a1c054ae3f10b42320d46049b.png";
import imgCat5 from "@/imports/ItemCatalog/74fb9bdbc5ead1f88d296bbe23d248cd82778db1.png";
import imgCat6 from "@/imports/ItemCatalog/aa7db501a2aa12ae87ba59044a5369e89cd6bc21.png";
import imgCat7 from "@/imports/ItemCatalog/16f854ba5653d2677ff12511e9722692957cf225.png";
import imgCatAvatar from "@/imports/ItemCatalog/30d85ad1fe84d113722360fcbb932c120432dc2a.png";

// Login SVG paths (referenced by InteractiveLogin)
const svgPaths = loginSvgPaths;

type Page = "landing" | "lobbies" | "login" | "catalog" | "profile";
type TransitionType = "fade" | "slide" | "scale" | "glitch" | "wipe";
type Direction = "left" | "right" | "up" | "down";
type Easing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier(0.34,1.56,0.64,1)";

interface AnimConfig {
  transition: TransitionType;
  direction: Direction;
  duration: number;
  easing: Easing;
  scanlines: boolean;
  grid: boolean;
  glitchColor: boolean;
}

const defaultConfig: AnimConfig = {
  transition: "glitch",
  direction: "left",
  duration: 480,
  easing: "ease-in-out",
  scanlines: true,
  grid: false,
  glitchColor: false,
};

function getAnimationNames(
  type: TransitionType,
  dir: Direction
): { enter: string; exit: string } {
  switch (type) {
    case "fade":
      return { enter: "nx-fade-in", exit: "nx-fade-out" };
    case "scale":
      return { enter: "nx-scale-in", exit: "nx-scale-out" };
    case "glitch":
      return { enter: "nx-glitch-in", exit: "nx-glitch-out" };
    case "slide": {
      const map: Record<Direction, { enter: string; exit: string }> = {
        left:  { enter: "nx-slide-in-right",  exit: "nx-slide-out-left" },
        right: { enter: "nx-slide-in-left",   exit: "nx-slide-out-right" },
        up:    { enter: "nx-slide-in-down",   exit: "nx-slide-out-up" },
        down:  { enter: "nx-slide-in-up",     exit: "nx-slide-out-down" },
      };
      return map[dir];
    }
    case "wipe": {
      const map: Record<Direction, { enter: string; exit: string }> = {
        left:  { enter: "nx-wipe-in-left",  exit: "nx-wipe-out-right" },
        right: { enter: "nx-wipe-in-right", exit: "nx-wipe-out-left" },
        up:    { enter: "nx-wipe-in-down",  exit: "nx-wipe-out-up" },
        down:  { enter: "nx-wipe-in-down",  exit: "nx-wipe-out-up" },
      };
      return map[dir];
    }
  }
}

type PanelSection = "type" | "timing" | "overlay";

function AnimPanel({
  config,
  onChange,
  open,
  onToggle,
}: {
  config: AnimConfig;
  onChange: (patch: Partial<AnimConfig>) => void;
  open: boolean;
  onToggle: () => void;
}) {
  const [section, setSection] = useState<PanelSection>("type");

  const TRANSITIONS: { id: TransitionType; label: string }[] = [
    { id: "fade",   label: "FADE" },
    { id: "slide",  label: "SLIDE" },
    { id: "scale",  label: "SCALE" },
    { id: "glitch", label: "GLITCH" },
    { id: "wipe",   label: "WIPE" },
  ];

  const DIRECTIONS: { id: Direction; label: string; icon: string }[] = [
    { id: "left",  label: "LEFT",  icon: "←" },
    { id: "right", label: "RIGHT", icon: "→" },
    { id: "up",    label: "UP",    icon: "↑" },
    { id: "down",  label: "DOWN",  icon: "↓" },
  ];

  const EASINGS: { id: Easing; label: string }[] = [
    { id: "linear",                         label: "LINEAR" },
    { id: "ease-in",                        label: "EASE IN" },
    { id: "ease-out",                       label: "EASE OUT" },
    { id: "ease-in-out",                    label: "EASE I/O" },
    { id: "cubic-bezier(0.34,1.56,0.64,1)", label: "SPRING" },
  ];

  const showDirection = config.transition === "slide" || config.transition === "wipe";

  return (
    <div
      style={{
        position: "fixed",
        right: open ? 0 : -320,
        top: 0,
        bottom: 0,
        width: 320,
        transition: "right 0.35s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toggle tab */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          right: "100%",
          top: 80,
          background: "#121212",
          border: "1px solid rgba(255,176,0,0.4)",
          borderRight: "none",
          padding: "12px 10px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          outline: "none",
        }}
      >
        <span style={{ fontSize: 14, color: "#ffb000" }}>{open ? "▶" : "◀"}</span>
        {["A","N","I","M"].map((c, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Unbounded:Bold', sans-serif",
              fontWeight: 700,
              fontSize: 9,
              color: "#ffb000",
              letterSpacing: 1,
            }}
          >
            {c}
          </span>
        ))}
      </button>

      {/* Panel body */}
      <div
        style={{
          flex: 1,
          background: "#0d0d0d",
          borderLeft: "1px solid rgba(255,176,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 0",
            borderBottom: "1px solid rgba(255,176,0,0.15)",
            paddingBottom: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'Geist Mono:Regular', sans-serif",
              fontSize: 10,
              color: "#888",
              marginBottom: 4,
            }}
          >
            [ANIM_CONFIG_v2.4]
          </p>
          <p
            style={{
              fontFamily: "'Unbounded:Bold', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#ffb000",
              letterSpacing: 1,
            }}
          >
            TRANSITION ENGINE
          </p>

          {/* Section tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 16 }}>
            {(["type", "timing", "overlay"] as PanelSection[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  background: section === s ? "rgba(255,176,0,0.12)" : "transparent",
                  border: "none",
                  borderBottom: section === s ? "2px solid #ffb000" : "2px solid transparent",
                  cursor: "pointer",
                  fontFamily: "'Unbounded:Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: 9,
                  color: section === s ? "#ffb000" : "#555",
                  letterSpacing: 1,
                  outline: "none",
                }}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Section content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>

          {section === "type" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <FieldLabel label="TRANSITION TYPE" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {TRANSITIONS.map((t) => (
                  <OptionRow
                    key={t.id}
                    label={t.label}
                    active={config.transition === t.id}
                    onClick={() => onChange({ transition: t.id })}
                  />
                ))}
              </div>

              {showDirection && (
                <>
                  <FieldLabel label="DIRECTION" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {DIRECTIONS.map((d) => (
                      <OptionRow
                        key={d.id}
                        label={`${d.icon} ${d.label}`}
                        active={config.direction === d.id}
                        onClick={() => onChange({ direction: d.id })}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {section === "timing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <FieldLabel label={`DURATION // ${config.duration}ms`} />
                <div style={{ marginTop: 12 }}>
                  <input
                    type="range"
                    min={80}
                    max={1400}
                    step={20}
                    value={config.duration}
                    onChange={(e) => onChange({ duration: Number(e.target.value) })}
                    style={{
                      width: "100%",
                      accentColor: "#ffb000",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <Mono label="80ms" />
                    <Mono label="1400ms" />
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel label="EASING CURVE" />
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                  {EASINGS.map((e) => (
                    <OptionRow
                      key={e.id}
                      label={e.label}
                      active={config.easing === e.id}
                      onClick={() => onChange({ easing: e.id })}
                    />
                  ))}
                </div>
              </div>

              {/* Visual timing preview */}
              <div>
                <FieldLabel label="PREVIEW CURVE" />
                <TimingCurvePreview easing={config.easing} duration={config.duration} />
              </div>
            </div>
          )}

          {section === "overlay" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 10, color: "#555" }}>
                PERSISTENT SCREEN OVERLAYS
              </p>
              <ToggleRow
                label="SCANLINES"
                desc="CRT horizontal scan effect"
                active={config.scanlines}
                onClick={() => onChange({ scanlines: !config.scanlines })}
              />
              <ToggleRow
                label="GRID OVERLAY"
                desc="Gold grid structure"
                active={config.grid}
                onClick={() => onChange({ grid: !config.grid })}
              />
              <ToggleRow
                label="CHROMATIC SHIFT"
                desc="RGB channel offset during glitch"
                active={config.glitchColor}
                onClick={() => onChange({ glitchColor: !config.glitchColor })}
              />

              <div
                style={{
                  marginTop: 8,
                  padding: "12px",
                  border: "1px solid rgba(255,176,0,0.15)",
                  background: "rgba(255,176,0,0.03)",
                }}
              >
                <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 10, color: "#888", marginBottom: 6 }}>
                  ACTIVE FX //
                </p>
                <p style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontSize: 11, color: "#ffb000" }}>
                  {[
                    config.scanlines && "SCANLINES",
                    config.grid && "GRID",
                    config.glitchColor && "CHROMA",
                  ]
                    .filter(Boolean)
                    .join(" + ") || "NONE"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer status */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid rgba(255,176,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              background: "#ffb000",
              borderRadius: 0,
              animation: "nx-fade-in 1s infinite alternate",
            }}
          />
          <p
            style={{
              fontFamily: "'Geist Mono:Regular', sans-serif",
              fontSize: 10,
              color: "#555",
            }}
          >
            {config.transition.toUpperCase()} · {config.duration}ms · LIVE
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <p
      style={{
        fontFamily: "'Unbounded:Bold', sans-serif",
        fontWeight: 700,
        fontSize: 9,
        color: "#888",
        letterSpacing: 2,
        marginBottom: 4,
      }}
    >
      {label}
    </p>
  );
}

function Mono({ label }: { label: string }) {
  return (
    <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 9, color: "#555" }}>
      {label}
    </p>
  );
}

function OptionRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        background: active ? "rgba(255,176,0,0.1)" : "transparent",
        border: active ? "1px solid rgba(255,176,0,0.5)" : "1px solid rgba(255,255,255,0.05)",
        cursor: "pointer",
        outline: "none",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: 0,
          background: active ? "#ffb000" : "transparent",
          border: active ? "1px solid #ffb000" : "1px solid #333",
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: "'Unbounded:Bold', sans-serif",
          fontWeight: 700,
          fontSize: 10,
          color: active ? "#ffb000" : "#555",
          letterSpacing: 1,
        }}
      >
        {label}
      </p>
    </button>
  );
}

function ToggleRow({
  label,
  desc,
  active,
  onClick,
}: {
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px",
        background: active ? "rgba(255,176,0,0.06)" : "transparent",
        border: active ? "1px solid rgba(255,176,0,0.3)" : "1px solid rgba(255,255,255,0.05)",
        cursor: "pointer",
        outline: "none",
        textAlign: "left",
        gap: 12,
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "'Unbounded:Bold', sans-serif",
            fontWeight: 700,
            fontSize: 10,
            color: active ? "#ffb000" : "#888",
            letterSpacing: 1,
            marginBottom: 3,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'Geist Mono:Regular', sans-serif",
            fontSize: 10,
            color: "#444",
          }}
        >
          {desc}
        </p>
      </div>
      <div
        style={{
          width: 32,
          height: 18,
          background: active ? "rgba(255,176,0,0.2)" : "rgba(255,255,255,0.04)",
          border: active ? "1px solid rgba(255,176,0,0.5)" : "1px solid #333",
          borderRadius: 0,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: active ? 15 : 3,
            width: 10,
            height: 10,
            background: active ? "#ffb000" : "#333",
            transition: "left 0.2s, background 0.2s",
          }}
        />
      </div>
    </button>
  );
}

function TimingCurvePreview({ easing, duration }: { easing: Easing; duration: number }) {
  const easingToPoints: Record<string, string> = {
    "linear": "0,100 100,0",
    "ease-in": "0,100 80,80 100,0",
    "ease-out": "0,100 20,20 100,0",
    "ease-in-out": "0,100 10,90 90,10 100,0",
    "cubic-bezier(0.34,1.56,0.64,1)": "0,100 10,80 60,-20 100,0",
  };
  const points = easingToPoints[easing] || "0,100 100,0";

  return (
    <div
      style={{
        marginTop: 12,
        padding: "12px",
        border: "1px solid rgba(255,176,0,0.1)",
        background: "rgba(0,0,0,0.4)",
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: 80 }}>
        <polyline
          points={points}
          fill="none"
          stroke="rgba(255,176,0,0.2)"
          strokeWidth="1"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#ffb000"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,176,0,0.1)" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,176,0,0.1)" strokeWidth="0.5" />
      </svg>
      <p
        style={{
          fontFamily: "'Geist Mono:Regular', sans-serif",
          fontSize: 9,
          color: "#444",
          marginTop: 4,
          textAlign: "center",
        }}
      >
        {duration}ms — {easing === "cubic-bezier(0.34,1.56,0.64,1)" ? "SPRING" : easing.toUpperCase()}
      </p>
    </div>
  );
}

type TransitionState = "idle" | "exiting" | "entering";

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

/* Wrapper components that intercept nav clicks */
function InteractiveLanding({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim().toUpperCase() ?? "";
      if (text === "CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOBBIES") { e.preventDefault(); e.stopPropagation(); onNavigate("lobbies"); }
      else if (text === "PROFILE") { e.preventDefault(); e.stopPropagation(); onNavigate("profile"); }
      else if (text === "BROWSE CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOGIN / REGISTER") { e.preventDefault(); e.stopPropagation(); onNavigate("login"); }
    };

    el.addEventListener("click", handler, true);
    return () => el.removeEventListener("click", handler, true);
  }, [onNavigate]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: "100%" }}>
      <LandingTerminal />
    </div>
  );
}

function InteractiveLobbies({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim().toUpperCase() ?? "";
      if (text === "CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOBBIES") { e.preventDefault(); e.stopPropagation(); onNavigate("lobbies"); }
      else if (text === "PROFILE") { e.preventDefault(); e.stopPropagation(); onNavigate("profile"); }
      else if (text === "ENTER LOBBY") { e.preventDefault(); e.stopPropagation(); onNavigate("login"); }
    };

    el.addEventListener("click", handler, true);
    return () => el.removeEventListener("click", handler, true);
  }, [onNavigate]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: "100%" }}>
      <OpenLobbies />
    </div>
  );
}

type AuthTab = "login" | "register";

function InteractiveLogin({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const auth = useAuth();
  const [tab, setTab] = useState<AuthTab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("CREDENTIAL FIELD EMPTY — TRANSMISSION ABORTED");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await auth.login(email, password);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onNavigate("lobbies");
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message.toUpperCase() : "UPLINK FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !regEmail || !regPassword) {
      setError("ALL NODE FIELDS REQUIRED — INITIALIZATION FAILED");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await auth.register(username, regEmail, regPassword);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onNavigate("profile");
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message.toUpperCase() : "UPLINK FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "1px solid rgba(212,175,55,0.25)",
    padding: "14px",
    color: "#e0e0e0",
    fontFamily: "'Geist:Regular', sans-serif",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
  };

  const inputFocusStyle = (focused: boolean): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused ? "rgba(255,176,0,0.7)" : "rgba(212,175,55,0.25)",
    transition: "border-color 0.2s",
  });

  const [focusField, setFocusField] = useState<string | null>(null);

  return (
    <div style={{ width: "100%", minHeight: "100%", position: "relative" }}>
      {/* Back button */}
      <button
        onClick={() => onNavigate("lobbies")}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 10,
          background: "transparent",
          border: "1px solid rgba(255,176,0,0.3)",
          padding: "8px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          outline: "none",
        }}
      >
        <span style={{ color: "#ffb000", fontSize: 12 }}>←</span>
        <span style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 9, color: "#ffb000", letterSpacing: 2 }}>
          BACK
        </span>
      </button>

      {/* Auth screen — background */}
      <div style={{ width: "100%", minHeight: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/* Use the imported background image via the original component structure */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            alt=""
            src={new URL("../imports/LoginRegistration/756f8e55fb6448a17c688063ae3834bd66622a65.png", import.meta.url).href}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.9)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: 80, width: "100%" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: "#ffb000", borderRadius: 2 }} />
            <p style={{ fontFamily: "'Unbounded:Black', sans-serif", fontWeight: 900, fontSize: 24, color: "#ffb000", whiteSpace: "nowrap" }}>
              NEXUS EXCHANGE
            </p>
            <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>
              TERMINAL ACCESS // SECURED
            </p>
          </div>

          {/* Auth card */}
          <div style={{ position: "relative", width: 480, background: "#121212", border: "1px solid rgba(212,175,55,0.25)" }}>
            {/* HUD corners */}
            {[
              { top: 0, left: 0, borderTop: "2px solid #ffb000", borderLeft: "2px solid #ffb000" },
              { top: 0, right: 0, borderTop: "2px solid #ffb000", borderRight: "2px solid #ffb000" },
              { bottom: 0, left: 0, borderBottom: "2px solid #ffb000", borderLeft: "2px solid #ffb000" },
              { bottom: 0, right: 0, borderBottom: "2px solid #ffb000", borderRight: "2px solid #ffb000" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 12, height: 12, ...s }} />
            ))}

            {/* Tabs */}
            <div style={{ background: "#181818", display: "flex", borderBottom: "1px solid #2a2a2a" }}>
              <button
                onClick={() => { setTab("login"); setError(""); }}
                style={{
                  flex: 1,
                  padding: 18,
                  background: "transparent",
                  border: "none",
                  borderBottom: tab === "login" ? "2px solid #ffb000" : "2px solid transparent",
                  cursor: "pointer",
                  outline: "none",
                  fontFamily: "'Unbounded:Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: tab === "login" ? "#ffb000" : "#888",
                }}
              >
                AUTHENTICATE
              </button>
              <button
                onClick={() => { setTab("register"); setError(""); }}
                style={{
                  flex: 1,
                  padding: 18,
                  background: "transparent",
                  border: "none",
                  borderBottom: tab === "register" ? "2px solid #ffb000" : "2px solid transparent",
                  cursor: "pointer",
                  outline: "none",
                  fontFamily: "'Unbounded:Bold', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  color: tab === "register" ? "#ffb000" : "#888",
                }}
              >
                INITIALIZE NODE
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
              {tab === "login" ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000", textTransform: "uppercase" }}>
                      OPERATOR CREDENTIAL / EMAIL
                    </p>
                    <input
                      type="email"
                      placeholder="username@grid.net"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusField("email")}
                      onBlur={() => setFocusField(null)}
                      style={inputFocusStyle(focusField === "email")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000", textTransform: "uppercase" }}>
                      CIPHER KEY / PASSWORD
                    </p>
                    <input
                      type="password"
                      placeholder="••••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusField("pass")}
                      onBlur={() => setFocusField(null)}
                      onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                      style={inputFocusStyle(focusField === "pass")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                    <button
                      onClick={handleAuth}
                      disabled={isSubmitting}
                      style={{
                        width: "100%",
                        padding: 16,
                        background: success ? "rgba(255,176,0,0.8)" : "#ffb000",
                        border: "1px solid #ffb000",
                        cursor: isSubmitting ? "wait" : "pointer",
                        opacity: isSubmitting ? 0.6 : 1,
                        fontFamily: "'Unbounded:ExtraBold', sans-serif",
                        fontWeight: 800,
                        fontSize: 12,
                        color: "#0a0a0a",
                        outline: "none",
                        transition: "background 0.2s",
                      }}
                    >
                      {success ? "LINK ESTABLISHED ✓" : isSubmitting ? "CONNECTING..." : "ESTABLISH NEXUS LINK"}
                    </button>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888", textDecoration: "underline" }}
                    >
                      Forgot encryption cipher key?
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000", textTransform: "uppercase" }}>
                      OPERATOR HANDLE / USERNAME
                    </p>
                    <input
                      type="text"
                      placeholder="OPERATOR_TAG"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setFocusField("uname")}
                      onBlur={() => setFocusField(null)}
                      style={inputFocusStyle(focusField === "uname")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000", textTransform: "uppercase" }}>
                      OPERATOR CREDENTIAL / EMAIL
                    </p>
                    <input
                      type="email"
                      placeholder="username@grid.net"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      onFocus={() => setFocusField("remail")}
                      onBlur={() => setFocusField(null)}
                      style={inputFocusStyle(focusField === "remail")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000", textTransform: "uppercase" }}>
                      CIPHER KEY / PASSWORD
                    </p>
                    <input
                      type="password"
                      placeholder="••••••••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      onFocus={() => setFocusField("rpass")}
                      onBlur={() => setFocusField(null)}
                      onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                      style={inputFocusStyle(focusField === "rpass")}
                    />
                  </div>
                  <button
                    onClick={handleRegister}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: 16,
                      background: success ? "rgba(255,176,0,0.8)" : "#ffb000",
                      border: "1px solid #ffb000",
                      cursor: isSubmitting ? "wait" : "pointer",
                      opacity: isSubmitting ? 0.6 : 1,
                      fontFamily: "'Unbounded:ExtraBold', sans-serif",
                      fontWeight: 800,
                      fontSize: 12,
                      color: "#0a0a0a",
                      outline: "none",
                      transition: "background 0.2s",
                    }}
                  >
                    {success ? "NODE INITIALIZED ✓" : isSubmitting ? "TRANSMITTING..." : "INITIALIZE OPERATOR NODE"}
                  </button>
                </>
              )}

              {/* Error message */}
              {error && (
                <div style={{ padding: "10px 14px", border: "1px solid rgba(255,60,60,0.4)", background: "rgba(255,0,0,0.05)" }}>
                  <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 10, color: "#ff6060" }}>
                    {`>> ${error}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Security notice */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <g clipPath="url(#clip-shield)">
                <path d={svgPaths.p3db8e80} stroke="#FFB000" strokeLinecap="round" strokeWidth="2" />
              </g>
              <defs>
                <clipPath id="clip-shield">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>
              AES-256 SYSTEM PROTECTION DEPLOYED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared nav bar used by catalog and profile pages ─────────────────── */
function SharedTopNav({
  active,
  onNavigate,
}: {
  active: Page;
  onNavigate: (p: Page) => void;
}) {
  const auth = useAuth();
  const isLoggedIn = Boolean(auth.token);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      auth.logout();
      onNavigate("landing");
    } else {
      onNavigate("login");
    }
  };

  const navItems: { label: string; page: Page }[] = [
    { label: "CATALOG", page: "catalog" },
    { label: "LOBBIES", page: "lobbies" },
    { label: "PROFILE", page: "profile" },
  ];

  return (
    <div
      style={{
        background: "#121212",
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        borderBottom: "1px solid #ffb000",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <button
        onClick={() => onNavigate("landing")}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, outline: "none" }}
      >
        <div style={{ width: 24, height: 24, background: "#ffb000", border: "1px solid #d4af37", borderRadius: 2 }} />
        <span style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontWeight: 800, fontSize: 16, color: "#ffb000" }}>
          NEXUS EXCHANGE
        </span>
      </button>

      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {navItems.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              outline: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Unbounded:Bold', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: active === page ? "#ffb000" : "#888",
              }}
            >
              {label}
            </span>
            {active === page && (
              <div style={{ width: 24, height: 2, background: "#ffb000" }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {isLoggedIn && (
          <div
            style={{
              background: "#000",
              border: "1px solid rgba(212,175,55,0.25)",
              borderRadius: 4,
              padding: "6px 12px",
              display: "flex",
              gap: 8,
            }}
          >
            <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>BAL //</span>
            <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 13, color: "#ffb000" }}>
              {auth.profile ? formatBalance(auth.profile.balance) : "..."}
            </span>
          </div>
        )}
        <button
          onClick={handleAccountClick}
          title={isLoggedIn ? "Log out" : "Log in"}
          style={{ display: "flex", gap: 8, alignItems: "center", background: "none", border: "none", cursor: "pointer", outline: "none" }}
        >
          <img
            src={imgCatAvatar}
            alt=""
            style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4, border: "1px solid #ffb000" }}
          />
          <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#e0e0e0" }}>
            {isLoggedIn ? (auth.profile?.nickname ?? "...") : "GUEST // LOGIN"}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ─── Catalog page ──────────────────────────────────────────────────────── */

const CATALOG_ITEMS = [
  { img: imgCat0, name: "Satori Neural Link",    price: "250,000", rarity: "Legendary", rarityColor: "#ffb000", rarityBg: "rgba(255,176,0,0.08)", interest: 12 },
  { img: imgCat1, name: "Kusanagi Nanoblade",    price: "480,000", rarity: "Legendary", rarityColor: "#ffb000", rarityBg: "rgba(255,176,0,0.08)", interest: 31 },
  { img: imgCat2, name: "Arasaka Oni Mask v4",   price: "95,000",  rarity: "Epic",      rarityColor: "#a855f7", rarityBg: "rgba(168,85,247,0.08)", interest: 8  },
  { img: imgCat3, name: "Militech Tactical Vest",price: "120,000", rarity: "Epic",      rarityColor: "#a855f7", rarityBg: "rgba(168,85,247,0.08)", interest: 14 },
  { img: imgCat4, name: "Cyberdeck 'Deus-X'",    price: "600,000", rarity: "Legendary", rarityColor: "#ffb000", rarityBg: "rgba(255,176,0,0.08)", interest: 42 },
  { img: imgCat5, name: "NCPD Subdermal Plating",price: "45,000",  rarity: "Rare",      rarityColor: "#3b82f6", rarityBg: "rgba(59,130,246,0.08)", interest: 5  },
  { img: imgCat6, name: "Apex Smart Visor",      price: "65,000",  rarity: "Rare",      rarityColor: "#3b82f6", rarityBg: "rgba(59,130,246,0.08)", interest: 9  },
  { img: imgCat7, name: "Kang Tao EMP Cannon",   price: "185,000", rarity: "Epic",      rarityColor: "#a855f7", rarityBg: "rgba(168,85,247,0.08)", interest: 19 },
];

type CatalogFilter = "All" | "Weapons" | "Armor" | "Tech" | "Rare+";

const RARITY_MAP: Record<CatalogFilter, string[]> = {
  All:     [],
  Weapons: ["Satori Neural Link", "Kusanagi Nanoblade", "Kang Tao EMP Cannon"],
  Armor:   ["Militech Tactical Vest", "NCPD Subdermal Plating"],
  Tech:    ["Cyberdeck 'Deus-X'", "Apex Smart Visor", "Arasaka Oni Mask v4"],
  "Rare+": ["Legendary", "Epic"],
};

function InteractiveCatalog({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [filter, setFilter] = useState<CatalogFilter>("All");
  const [search, setSearch] = useState("");

  const visible = CATALOG_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "All") return true;
    if (filter === "Rare+") return RARITY_MAP["Rare+"].includes(item.rarity);
    return RARITY_MAP[filter].includes(item.name);
  });

  const FILTERS: CatalogFilter[] = ["All", "Weapons", "Armor", "Tech", "Rare+"];

  return (
    <div style={{ width: "100%", minHeight: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="catalog" onNavigate={onNavigate} />

      <div style={{ padding: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11 }}>
              <span style={{ color: "#888" }}>NEXUS</span>
              <span style={{ color: "#888" }}>{">"}</span>
              <span style={{ color: "#ffb000" }}>CATALOG</span>
            </div>
            <p style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontWeight: 800, fontSize: 28, color: "#ffb000" }}>
              MARKET CATALOG
            </p>
          </div>
          {/* Search */}
          <div style={{ position: "relative", width: 360, background: "#121212", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={catalogSvgPaths.p3f6e0f00} stroke="#888" strokeLinecap="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Search catalog / systems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'Geist:Regular', sans-serif", fontSize: 13, color: "#e0e0e0" }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "#ffb000" : "#121212",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: 2,
                padding: "8px 16px",
                cursor: "pointer",
                fontFamily: "'Unbounded:Bold', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                color: filter === f ? "#0a0a0a" : "#e0e0e0",
                outline: "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 280px)",
            gap: 24,
          }}
        >
          {visible.map((item) => (
            <div
              key={item.name}
              style={{ background: "#121212", border: "1px solid #2a2a2a", display: "flex", flexDirection: "column", cursor: "pointer" }}
              onClick={() => onNavigate("login")}
            >
              <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Meta row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div
                    style={{
                      background: item.rarityBg,
                      border: `1px solid ${item.rarityColor}`,
                      borderRadius: 2,
                      padding: "4px 8px",
                    }}
                  >
                    <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 10, color: item.rarityColor, textTransform: "uppercase" }}>
                      {item.rarity}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d={catalogSvgPaths.p2c9b3000} stroke="#888" strokeLinecap="round" strokeWidth="2" />
                    </svg>
                    <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>{item.interest}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>START BID:</span>
                  <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 15, color: "#ffb000" }}>{item.price} ₵</span>
                </div>
                {/* Card action */}
                <div style={{ borderTop: "1px solid rgba(212,175,55,0.25)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 11, color: "#ffb000" }}>JOIN AUCTION</span>
                  <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000" }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>
              {`>> NO ITEMS MATCH QUERY — MATRIX SEARCH RETURNED NULL`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Profile page ──────────────────────────────────────────────────────── */

function formatBalance(amount: number): string {
  return `${amount.toLocaleString("en-US")} ₵`;
}

function formatMemberSince(isoDate: string): string {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(isoDate);
  return `MEMBER SINCE // ${months[date.getUTCMonth()]}_${date.getUTCFullYear()}`;
}

function InteractiveProfile({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const auth = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth.token) onNavigate("login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  const loadError = !auth.token ? false : !auth.isProfileLoading && !auth.profile;

  const profile = auth.profile
    ? {
        nickname: auth.profile.nickname,
        balanceLabel: formatBalance(auth.profile.balance),
        memberSinceLabel: formatMemberSince(auth.profile.createdAt),
      }
    : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim().toUpperCase() ?? "";
      if (text === "CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOBBIES") { e.preventDefault(); e.stopPropagation(); onNavigate("lobbies"); }
      else if (text === "PROFILE") { e.preventDefault(); e.stopPropagation(); onNavigate("profile"); }
    };
    el.addEventListener("click", handler, true);
    return () => el.removeEventListener("click", handler, true);
  }, [onNavigate]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: "100%" }}>
      {loadError && (
        <div style={{ padding: 16, background: "rgba(255,0,0,0.05)", border: "1px solid rgba(255,60,60,0.4)", margin: 24 }}>
          <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ff6060" }}>
            {">> UPLINK TO PROFILE SERVICE FAILED — SHOWING CACHED NODE DATA"}
          </p>
        </div>
      )}
      <ProfileInventory data={profile ?? undefined} />
    </div>
  );
}
