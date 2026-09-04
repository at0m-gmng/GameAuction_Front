import { useState } from "react";
import type { AnimConfig, Direction, Easing, TransitionType } from "@/lib/transitions";

type PanelSection = "type" | "timing" | "overlay";

export function AnimPanel({
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
