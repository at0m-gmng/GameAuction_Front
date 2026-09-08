import { LOBBY_API_BASE_URL } from "@/lib/config";

const RETRY_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 1000;

// NOTE: Lobby.API — Render free-тариф, засыпает после простоя; первый запрос может не достучаться.
// Ретраим только сетевые сбои (fetch throws), не HTTP-ошибки — те несут смысл (400 и т.п.) и должны доходить сразу.
async function fetchWithRetry(input: string, init: RequestInit): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetch(input, init);
    } catch (error) {
      if (attempt >= RETRY_ATTEMPTS) throw error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_BASE_DELAY_MS * 2 ** attempt));
    }
  }
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function getOpenLobbies(): Promise<Response> {
  return fetchWithRetry(`${LOBBY_API_BASE_URL}/api/lobbies`, {});
}

export function getLobby(lobbyId: string, token: string): Promise<Response> {
  return fetchWithRetry(`${LOBBY_API_BASE_URL}/api/lobbies/${lobbyId}`, { headers: authHeaders(token) });
}

export function joinLobby(lobbyId: string, token: string): Promise<Response> {
  return fetchWithRetry(`${LOBBY_API_BASE_URL}/api/lobbies/${lobbyId}/join`, { method: "POST", headers: authHeaders(token) });
}

export function leaveLobby(lobbyId: string, token: string): Promise<Response> {
  return fetchWithRetry(`${LOBBY_API_BASE_URL}/api/lobbies/${lobbyId}/leave`, { method: "POST", headers: authHeaders(token) });
}

// NOTE: для beforeunload — страница может исчезнуть раньше ретраев, шлём один keepalive-запрос без них.
export function leaveLobbyBeacon(lobbyId: string, token: string): void {
  fetch(`${LOBBY_API_BASE_URL}/api/lobbies/${lobbyId}/leave`, {
    method: "POST",
    headers: authHeaders(token),
    keepalive: true,
  }).catch(() => {});
}

export function placeBid(lobbyId: string, token: string, amount: number): Promise<Response> {
  return fetchWithRetry(`${LOBBY_API_BASE_URL}/api/lobbies/${lobbyId}/bids`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ amount }),
  });
}
