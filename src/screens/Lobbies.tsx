import { useEffect, useState } from "react";
import { SharedTopNav } from "@/components/SharedTopNav";
import OpenLobbies, { type LobbyListItem } from "@/imports/OpenLobbies/index";
import { getOpenLobbies } from "@/lib/lobbyApi";
import type { Page } from "@/lib/navigation";

export function InteractiveLobbies({
  onNavigate,
  onEnterLobby,
}: {
  onNavigate: (p: Page) => void;
  onEnterLobby: (lobbyId: string) => void;
}) {
  const [lobbies, setLobbies] = useState<LobbyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getOpenLobbies()
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
      <OpenLobbies lobbies={lobbies} isLoading={isLoading} onEnterLobby={onEnterLobby} />
    </div>
  );
}
