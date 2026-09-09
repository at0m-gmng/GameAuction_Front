import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { IDENTITY_API_BASE_URL } from "@/lib/config";

export const API_BASE_URL = IDENTITY_API_BASE_URL;

// TODO: токен в localStorage (уязвим для XSS) — решение: короткоживущий access + refresh token в httpOnly cookie.
const TOKEN_KEY = "nexus_token";

export interface PlayerProfile {
  playerId: string;
  nickname: string;
  email: string;
  balance: number;
  createdAt: string;
}

interface AuthContextValue {
  token: string | null;
  profile: PlayerProfile | null;
  isProfileLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nickname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function authRequest(path: string, body: unknown): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("UPLINK UNREACHABLE — CHECK CONNECTION");
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "TRANSMISSION REJECTED BY SERVER");
  }

  const data = (await response.json()) as { token: string };
  return data.token;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const fetchProfile = useCallback(async (activeToken: string) => {
    setIsProfileLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${activeToken}` },
      });

      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setProfile(null);
        return;
      }

      if (!response.ok) return;

      const data = (await response.json()) as PlayerProfile;
      setProfile(data);
    } catch {
      // Network hiccup — leave existing profile state as-is, caller can retry later.
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setProfile(null);
    }
  }, [token, fetchProfile]);

  const applyToken = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const login = async (email: string, password: string) => {
    const newToken = await authRequest("/api/auth/login", { email, password });
    applyToken(newToken);
  };

  const register = async (nickname: string, email: string, password: string) => {
    const newToken = await authRequest("/api/auth/register", { nickname, email, password });
    applyToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setProfile(null);
  };

  const refreshProfile = useCallback(() => {
    if (token) fetchProfile(token);
  }, [token, fetchProfile]);

  return (
    <AuthContext.Provider value={{ token, profile, isProfileLoading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
