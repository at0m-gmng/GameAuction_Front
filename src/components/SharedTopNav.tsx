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

  // Мобилки и планшеты (< xl): логотип скрыт, две строки — сверху баланс+logout, снизу
  // центрированная навигация. Десктоп (xl+): одна строка, боковые группы flex-1 дают
  // центрирование навигации (эквивалент 1fr auto 1fr). Landing (minimal) — всегда логотип.
  const containerClass = minimal
    ? "flex items-center px-4 py-3 sm:px-12 sm:h-20"
    : "flex flex-col gap-3 px-4 py-3 xl:h-20 xl:flex-row xl:items-center xl:gap-0 xl:px-12 xl:py-0";

  const logoClass = minimal
    ? "flex items-center gap-3 min-w-0"
    : "hidden xl:flex xl:flex-1 items-center gap-3 min-w-0";

  return (
    <div
      className={containerClass}
      style={{
        background: "#121212",
        borderBottom: "1px solid #ffb000",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className={logoClass}>
        <div style={{ width: 24, height: 24, background: "#ffb000", border: "1px solid #d4af37", borderRadius: 2, flexShrink: 0 }} />
        <span
          className="text-[13px] sm:text-[16px]"
          style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontWeight: 800, color: "#ffb000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          NEXUS EXCHANGE
        </span>
      </div>

      {!minimal && (
        <div className="order-2 flex w-full justify-center gap-6 items-center xl:order-none xl:w-auto xl:gap-10">
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
        <div className="order-1 flex w-full justify-center gap-3 items-center xl:order-none xl:w-auto xl:flex-1 xl:justify-end xl:gap-6">
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
