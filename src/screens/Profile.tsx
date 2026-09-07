import { useEffect, useState } from "react";
import { useAuth } from "@/auth";
import { SharedTopNav } from "@/components/SharedTopNav";
import { CATALOG_API_BASE_URL } from "@/lib/config";
import { formatBalance, formatMemberSince } from "@/lib/format";
import type { Page } from "@/lib/navigation";
import ProfileInventory, { type ProfileInventoryItem } from "@/imports/ProfileInventory/index";

export function InteractiveProfile({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const auth = useAuth();
  const [inventory, setInventory] = useState<ProfileInventoryItem[]>([]);
  const [isInventoryLoading, setIsInventoryLoading] = useState(false);

  useEffect(() => {
    if (!auth.token) onNavigate("login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  useEffect(() => {
    if (!auth.token) {
      setInventory([]);
      return;
    }

    let cancelled = false;
    setIsInventoryLoading(true);

    fetch(`${CATALOG_API_BASE_URL}/api/catalog/inventory`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((response) => (response.ok ? (response.json() as Promise<ProfileInventoryItem[]>) : Promise.reject(response)))
      .then((data) => {
        if (!cancelled) setInventory(data);
      })
      .catch((error: unknown) => {
        // Network hiccup, CORS, or expired token — leave inventory empty
        // rather than crash, but log it: a silently-empty inventory with no
        // trace anywhere was exactly what made a real bug look like "the
        // gift just isn't there".
        if (!cancelled) console.error("Failed to load inventory:", error);
      })
      .finally(() => {
        if (!cancelled) setIsInventoryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [auth.token]);

  const loadError = !auth.token ? false : !auth.isProfileLoading && !auth.profile;

  const profile = auth.profile
    ? {
        nickname: auth.profile.nickname,
        balanceLabel: formatBalance(auth.profile.balance),
        memberSinceLabel: formatMemberSince(auth.profile.createdAt),
      }
    : null;

  return (
    <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="profile" onNavigate={onNavigate} />
      {loadError && (
        <div style={{ padding: 16, background: "rgba(255,0,0,0.05)", border: "1px solid rgba(255,60,60,0.4)", margin: 24 }}>
          <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ff6060" }}>
            {">> UPLINK TO PROFILE SERVICE FAILED — SHOWING CACHED NODE DATA"}
          </p>
        </div>
      )}
      <ProfileInventory
        data={profile ?? undefined}
        inventory={inventory}
        isInventoryLoading={isInventoryLoading}
      />
    </div>
  );
}
