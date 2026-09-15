import { useAuth } from "@/auth";
import { formatBalance } from "@/lib/format";
import type { Page } from "@/lib/navigation";

/**
 * Верхняя навигация всех интерактивных экранов; minimal — только логотип (для Landing).
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

  const handleLogout = () => {
    auth.logout();
    onNavigate("landing");
  };

  const navItems: { label: string; page: Page }[] = [
    { label: "CATALOG", page: "catalog" },
    { label: "AUCTIONS", page: "lobbies" },
    { label: "PROFILE", page: "profile" },
  ];

  return (
    // Mobile: flex-wrap — логотип+действия в первой строке, навигация центрируется во второй.
    // sm+: flex-nowrap, боковые группы flex-1 → навигация ровно по центру (эквивалент 1fr auto 1fr).
    <div
      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:flex-nowrap sm:px-12 sm:py-0 sm:h-20"
      style={{
        background: "#121212",
        borderBottom: "1px solid #ffb000",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="order-1 sm:flex-1" style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <div style={{ width: 24, height: 24, background: "#ffb000", border: "1px solid #d4af37", borderRadius: 2, flexShrink: 0 }} />
        <span
          className="text-[13px] sm:text-[16px]"
          style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontWeight: 800, color: "#ffb000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          NEXUS EXCHANGE
        </span>
      </div>

      {!minimal && (
        <div className="order-3 w-full justify-center gap-6 sm:order-2 sm:w-auto sm:gap-10" style={{ display: "flex", alignItems: "center" }}>
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
        <div className="order-2 gap-3 sm:order-3 sm:flex-1 sm:justify-end sm:gap-6" style={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn && (
            <div
              style={{
                background: "#000",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: 4,
                padding: "6px 12px",
                display: "flex",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>BAL //</span>
              <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 13, color: "#ffb000" }}>
                {auth.profile ? formatBalance(auth.profile.balance) : "..."}
              </span>
            </div>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid rgba(255,60,60,0.4)",
                borderRadius: 4,
                padding: "8px 14px",
                cursor: "pointer",
                outline: "none",
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 10, color: "#ff6060", letterSpacing: 1 }}>
                LOG OUT
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
