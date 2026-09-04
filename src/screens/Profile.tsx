import { useEffect, useRef } from "react";
import { useAuth } from "@/auth";
import { formatBalance, formatMemberSince } from "@/lib/format";
import type { Page } from "@/lib/navigation";
import ProfileInventory from "@/imports/ProfileInventory/index";

export function InteractiveProfile({ onNavigate }: { onNavigate: (p: Page) => void }) {
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
