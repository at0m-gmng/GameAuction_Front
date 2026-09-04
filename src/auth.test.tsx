import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./auth";

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("logs in, stores the token, and loads the profile", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.endsWith("/api/auth/login")) return jsonResponse({ token: "tok-123" });
      if (url.endsWith("/api/auth/me")) {
        return jsonResponse({ playerId: "1", nickname: "OPERATOR_X", email: "x@grid.net", balance: 100, createdAt: "2026-01-01T00:00:00Z" });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login("x@grid.net", "hunter2");
    });

    expect(result.current.token).toBe("tok-123");
    expect(localStorage.getItem("nexus_token")).toBe("tok-123");

    await waitFor(() => expect(result.current.profile?.nickname).toBe("OPERATOR_X"));
  });

  it("rejects with the server's error message on failed login", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ message: "Неверный email или пароль" }, 400));
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await expect(
      act(async () => {
        await result.current.login("x@grid.net", "wrong");
      })
    ).rejects.toThrow("Неверный email или пароль");

    expect(result.current.token).toBeNull();
    expect(localStorage.getItem("nexus_token")).toBeNull();
  });

  it("clears the session when the profile fetch comes back 401 (expired token)", async () => {
    localStorage.setItem("nexus_token", "stale-token");
    const fetchMock = vi.fn(async () => jsonResponse({}, 401));
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.token).toBe("stale-token");

    await waitFor(() => expect(result.current.token).toBeNull());
    expect(localStorage.getItem("nexus_token")).toBeNull();
    expect(result.current.profile).toBeNull();
  });

  it("logout clears token, profile, and localStorage", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.endsWith("/api/auth/login")) return jsonResponse({ token: "tok-456" });
      return jsonResponse({ playerId: "1", nickname: "OPERATOR_X", email: "x@grid.net", balance: 0, createdAt: "2026-01-01T00:00:00Z" });
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login("x@grid.net", "hunter2");
    });
    await waitFor(() => expect(result.current.profile).not.toBeNull());

    act(() => {
      result.current.logout();
    });

    expect(result.current.token).toBeNull();
    expect(result.current.profile).toBeNull();
    expect(localStorage.getItem("nexus_token")).toBeNull();
  });
});
