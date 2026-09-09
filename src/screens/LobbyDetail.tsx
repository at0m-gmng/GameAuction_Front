import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/auth";
import { SharedTopNav } from "@/components/SharedTopNav";
import { useLobbySocket } from "@/hooks/useLobbySocket";
import { formatBalance, formatTimeLeft } from "@/lib/format";
import { getLobby, joinLobby, leaveLobby, leaveLobbyBeacon, placeBid } from "@/lib/lobbyApi";
import type { Page } from "@/lib/navigation";
import AuctionResult from "@/imports/AuctionResult/index";
import LobbyAuction, { type AuctionLogEntry, type AuctionPlayerSlot } from "@/imports/LobbyAuction/index";

interface LobbyBidDto {
  playerId: string;
  amount: number;
  placedAt: string;
}

interface LobbyDetailsDto {
  id: string;
  itemId: string;
  itemName: string;
  itemImageUrl: string | null;
  startingPrice: number;
  status: number;
  maxSlots: number;
  participants: string[];
  currentBid: number;
  currentBidderId: string | null;
  endsAt: string | null;
  winnerId: string | null;
  bids: LobbyBidDto[];
}

// NOTE: Lobby.API не знает никнеймы — для себя берём из профиля, для остальных короткий id.
function resolvePlayerName(playerId: string, myPlayerId: string | undefined, myNickname: string | undefined): string {
  if (myPlayerId && playerId === myPlayerId && myNickname) return myNickname;
  return `PLAYER_${playerId.slice(0, 6).toUpperCase()}`;
}

function formatTimeOfDay(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", { hour12: false });
}

const FINAL_CALLS_THRESHOLD_MS = 15_000;
const QUICK_BID_AMOUNTS = [10_000, 50_000, 100_000];

export function InteractiveLobbyDetail({
  lobbyId,
  onNavigate,
}: {
  lobbyId: string;
  onNavigate: (p: Page) => void;
}) {
  const auth = useAuth();
  const myPlayerId = auth.profile?.playerId;
  const myNickname = auth.profile?.nickname;
  const [lobby, setLobby] = useState<LobbyDetailsDto | null>(null);
  const [bidValue, setBidValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!auth.token) onNavigate("login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  const refetch = useCallback(() => {
    if (!auth.token) return;

    getLobby(lobbyId, auth.token)
      .then((response) => (response.ok ? (response.json() as Promise<LobbyDetailsDto>) : Promise.reject(response)))
      .then(setLobby)
      .catch((error: unknown) => console.error("Failed to load lobby:", error));
  }, [lobbyId, auth.token]);

  // NOTE: fetch идёт сразу, не после join — join отдельный параллельный запрос, ждать его первым удвоило бы задержку.
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!auth.token) return;

    joinLobby(lobbyId, auth.token)
      .catch((error: unknown) => console.error("Failed to join lobby:", error))
      .finally(refetch);
  }, [lobbyId, auth.token, refetch]);

  // NOTE: beforeunload не может ждать ретраи (страница может исчезнуть) — один keepalive; уход по SPA — с ретраями.
  useEffect(() => {
    if (!auth.token) return;
    const token = auth.token;

    const onBeforeUnload = () => leaveLobbyBeacon(lobbyId, token);

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      leaveLobby(lobbyId, token).catch(() => {});
    };
  }, [lobbyId, auth.token]);

  useLobbySocket(lobbyId, refetch);

  // NOTE: сервер завершает аукцион лениво при чтении — опрашиваем, чтобы он переключил статус в Completed.
  useEffect(() => {
    if (lobby?.status !== 200) return;

    const endsAt = lobby.endsAt;
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      if (endsAt && new Date(endsAt).getTime() <= Date.now()) refetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [lobby?.status, lobby?.endsAt, refetch]);

  const handleSubmitBid = async () => {
    if (!auth.token || isSubmitting) return;

    const amount = Number(bidValue);
    if (!Number.isFinite(amount) || amount <= 0) {
      setSubmitError("ENTER A VALID BID");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await placeBid(lobbyId, auth.token, amount);

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "BID REJECTED BY SERVER");
      }

      setBidValue("");
      refetch();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message.toUpperCase() : "UPLINK UNREACHABLE — CHECK CONNECTION");
    } finally {
      setIsSubmitting(false);
    }
  };

  const bidsByPlayer = useMemo(() => {
    const map = new Map<string, number>();
    for (const bid of lobby?.bids ?? []) {
      map.set(bid.playerId, Math.max(map.get(bid.playerId) ?? 0, bid.amount));
    }
    return map;
  }, [lobby?.bids]);

  if (!lobby) {
    return (
      <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <SharedTopNav active="lobbies" onNavigate={onNavigate} />
        <p style={{ padding: 48, fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>{">> LOADING LOBBY..."}</p>
      </div>
    );
  }

  if (lobby.status !== 100 && lobby.status !== 200) {
    // NOTE: победа определяется по winnerId, не по текущему участию — иначе экран победы не покажется вышедшему.
    const didWin = myPlayerId != null && lobby.winnerId === myPlayerId;
    const wasParticipant = myPlayerId ? lobby.participants.includes(myPlayerId) : false;

    if (lobby.winnerId && (didWin || wasParticipant)) {
      const item = { itemName: lobby.itemName, itemImageUrl: lobby.itemImageUrl, itemRarity: 0, blockRef: "SEC_GRID_9 // BLOCK_884" };

      return (
        <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
          <SharedTopNav active="lobbies" onNavigate={onNavigate} />
          {didWin ? (
            <AuctionResult
              status="won"
              item={item}
              stats={{ finalBid: lobby.currentBid, totalBids: lobby.bids.length, participants: lobby.participants.length }}
              onAddToInventory={() => onNavigate("profile")}
              onBackToCatalog={() => onNavigate("catalog")}
            />
          ) : (
            <AuctionResult
              status="lost"
              item={item}
              stats={{
                winnerName: resolvePlayerName(lobby.winnerId, myPlayerId, myNickname),
                winningBid: lobby.currentBid,
                yourFinalBid: bidsByPlayer.get(myPlayerId ?? "") ?? 0,
              }}
              onBrowseCatalog={() => onNavigate("catalog")}
              onTryAgain={() => onNavigate("lobbies")}
            />
          )}
        </div>
      );
    }

    return (
      <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <SharedTopNav active="lobbies" onNavigate={onNavigate} />
        <div style={{ padding: 48, textAlign: "center" }}>
          <p style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontSize: 20, color: "#ffb000" }}>AUCTION ENDED</p>
          <p style={{ marginTop: 12, fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 13, color: "#e0e0e0" }}>
            {lobby.winnerId
              ? `WON BY ${resolvePlayerName(lobby.winnerId, myPlayerId, myNickname)} FOR ${formatBalance(lobby.currentBid)}`
              : "NO BIDS WERE PLACED"}
          </p>
        </div>
      </div>
    );
  }

  const transactionLog: AuctionLogEntry[] = [...lobby.bids]
    .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime())
    .map((bid) => ({
      id: `${bid.playerId}-${bid.placedAt}`,
      timestamp: formatTimeOfDay(bid.placedAt),
      actor: resolvePlayerName(bid.playerId, myPlayerId, myNickname),
      message: `PLACED_BID ${formatBalance(bid.amount)}`,
    }));

  const players: AuctionPlayerSlot[] = lobby.participants.map((playerId) => ({
    playerId,
    displayName: resolvePlayerName(playerId, myPlayerId, myNickname),
    bidAmount: bidsByPlayer.get(playerId) ?? 0,
    isYou: playerId === myPlayerId,
  }));

  const msRemaining = lobby.endsAt ? new Date(lobby.endsAt).getTime() - Date.now() : null;

  return (
    <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="lobbies" onNavigate={onNavigate} />
      <LobbyAuction
        data={{
          lobbyCode: lobby.id.slice(0, 8).toUpperCase(),
          itemName: lobby.itemName,
          itemImageUrl: lobby.itemImageUrl,
          itemDescription: null,
          itemRarity: 0,
          itemCategory: null,
          currentBid: lobby.currentBid,
          currentBidderName: lobby.currentBidderId
            ? resolvePlayerName(lobby.currentBidderId, myPlayerId, myNickname)
            : null,
          timeRemainingLabel: formatTimeLeft(lobby.endsAt),
          warningLabel: msRemaining !== null && msRemaining > 0 && msRemaining <= FINAL_CALLS_THRESHOLD_MS ? "[WARN: FINAL CALLS]" : null,
          transactionLog,
          players,
          maxParticipants: lobby.maxSlots,
        }}
        bidValue={bidValue}
        onBidValueChange={setBidValue}
        onQuickBid={(amount) => setBidValue(String(lobby.currentBid + amount))}
        onSubmitBid={handleSubmitBid}
        quickBidAmounts={QUICK_BID_AMOUNTS}
      />
      {submitError && (
        <p style={{ padding: "0 48px 24px", fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#f33" }}>{submitError}</p>
      )}
      {isSubmitting && (
        <p style={{ padding: "0 48px 24px", fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#888" }}>{">> SUBMITTING BID..."}</p>
      )}
    </div>
  );
}
