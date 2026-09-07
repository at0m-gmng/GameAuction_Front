import { useAuth } from "@/auth";
import { formatBalance } from "@/lib/format";
import type { Page } from "@/lib/navigation";
import imgCatAvatar from "@/imports/ItemCatalog/30d85ad1fe84d113722360fcbb932c120432dc2a.png";

/**
 * Top navigation bar used across every interactive screen. Renders real
 * <button onClick> handlers — not text-matching click hacks — so it works
 * identically regardless of which screen it's mounted on.
 *
 * `minimal` renders just the logo (used on Landing, which is the public
 * entry/marketing page and intentionally doesn't expose nav links or the
 * account badge).
 */
export function SharedTopNav({
  active,
  onNavigate,
  minimal = false,
}: {
  active: Page;
  onNavigate: (p: Page) => void;
  minimal?: boolean;
}) {
  const auth = useAuth();
  const isLoggedIn = Boolean(auth.token);

  // Clicking your own account badge opens your profile — the standard web
  // convention. Logging out is a separate, deliberate action that lives on
  // the profile screen itself, not hidden behind this same click target.
  const handleAccountClick = () => {
    onNavigate(isLoggedIn ? "profile" : "login");
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

      {!minimal && (
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
      )}

      {!minimal && (
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
            title={isLoggedIn ? "View profile" : "Log in"}
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
      )}
    </div>
  );
}
