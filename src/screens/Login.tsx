import { useState } from "react";
import { useAuth } from "@/auth";
import TriangleMeshBackground from "@/components/TriangleMeshBackground";
import loginSvgPaths from "@/imports/LoginRegistration/svg-i5tnpjrq0m";
import type { Page } from "@/lib/navigation";

const svgPaths = loginSvgPaths;

type AuthTab = "login" | "register";

export function InteractiveLogin({
  onNavigate,
  onBack,
}: {
  onNavigate: (p: Page) => void;
  onBack: () => void;
}) {
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
      {/* Back button — returns to whichever screen was actually visited before this one */}
      <button
        onClick={onBack}
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
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <TriangleMeshBackground />
        </div>

        <div
          className="px-[16px] py-[32px] sm:px-[80px] sm:py-[80px]"
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 32, width: "100%", boxSizing: "border-box" }}
        >
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
          <div className="w-full max-w-[480px]" style={{ position: "relative", background: "#121212", border: "1px solid rgba(212,175,55,0.25)" }}>
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
            <div className="p-[20px] sm:p-[32px]" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
