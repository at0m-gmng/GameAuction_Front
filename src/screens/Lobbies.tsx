import { useEffect, useState } from "react";
import { SharedTopNav } from "@/components/SharedTopNav";
import OpenLobbies, { type LobbyListItem } from "@/imports/OpenLobbies/index";
import { LOBBY_API_BASE_URL } from "@/lib/config";
import type { Page } from "@/lib/navigation";

// NOTE: "ENTER LOBBY" doesn't navigate anywhere yet — no lobby-detail/bidding
// screen exists on the frontend, only the list is wired to real data so far.
export function InteractiveLobbies({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [lobbies, setLobbies] = useState<LobbyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`${LOBBY_API_BASE_URL}/api/lobbies`)
      .then((response) => (response.ok ? (response.json() as Promise<LobbyListItem[]>) : Promise.reject(response)))
      .then((data) => {
        if (!cancelled) setLobbies(data);
      })
      .catch((error: unknown) => {
        if (!cancelled) console.error("Failed to load lobbies:", error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="lobbies" onNavigate={onNavigate} />
      <OpenLobbies lobbies={lobbies} isLoading={isLoading} />
    </div>
  );
}
