import { useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { LOBBY_API_BASE_URL } from "@/lib/config";

const LOBBY_EVENTS = ["PlayerJoinedLobby", "BidPlaced", "AuctionCompleted", "RoundExpiredWithoutBids"] as const;

// NOTE: onChange должен быть мемоизирован (useCallback) — иначе соединение пересоздаётся на каждый рендер.
/**
 * Подписывается на SignalR-хаб лобби и вызывает onChange при любом событии по этому лобби.
 */
export function useLobbySocket(lobbyId: string | null, onChange: () => void) {
  useEffect(() => {
    if (!lobbyId) return;

    const connection = new HubConnectionBuilder()
      .withUrl(`${LOBBY_API_BASE_URL}/hubs/lobby`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    for (const eventName of LOBBY_EVENTS) {
      connection.on(eventName, onChange);
    }

    let cancelled = false;

    connection
      .start()
      .then(() => {
        if (!cancelled) return connection.invoke("JoinLobby", lobbyId);
      })
      .catch((error: unknown) => console.error("Lobby socket failed to connect:", error));

    return () => {
      cancelled = true;
      connection.stop().catch(() => {});
    };
  }, [lobbyId, onChange]);
}
