import { useState, useRef, useCallback, useEffect } from "react";
import { AnimPanel } from "@/dev/AnimPanel";
import { InteractiveLanding } from "@/screens/Landing";
import { InteractiveLobbies } from "@/screens/Lobbies";
import { InteractiveLobbyDetail } from "@/screens/LobbyDetail";
import { InteractiveLogin } from "@/screens/Login";
import { InteractiveCatalog } from "@/screens/Catalog";
import { InteractiveProfile } from "@/screens/Profile";
import type { Page } from "@/lib/navigation";
import { type AnimConfig, type TransitionState, defaultConfig, getAnimationNames } from "@/lib/transitions";

// NOTE: sessionStorage, не localStorage — обновление страницы сохраняет сессию, но открытие через дни начинает заново.
const PAGE_STORAGE_KEY = "nexus_page";
const LOBBY_ID_STORAGE_KEY = "nexus_selected_lobby_id";
const VALID_PAGES: readonly Page[] = ["landing", "lobbies", "login", "catalog", "profile", "lobby-detail"];

function getPersistedPage(): Page {
  const stored = sessionStorage.getItem(PAGE_STORAGE_KEY);
  return (VALID_PAGES as readonly string[]).includes(stored ?? "") ? (stored as Page) : "landing";
}

export default function App() {
  const [page, setPage] = useState<Page>(getPersistedPage);
  const [selectedLobbyId, setSelectedLobbyId] = useState<string | null>(() => sessionStorage.getItem(LOBBY_ID_STORAGE_KEY));
  const [pendingPage, setPendingPage] = useState<Page | null>(null);
  const [transitionState, setTransitionState] = useState<TransitionState>("idle");
  const [config, setConfig] = useState<AnimConfig>(defaultConfig);
  const [panelOpen, setPanelOpen] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Stack of visited pages, current page always last. Ref, not state — it
  // only needs to be read synchronously by navigate/goBack, never rendered.
  // Restoring a refresh starts a fresh stack at the restored page rather
  // than reconstructing prior history, which isn't persisted.
  const historyRef = useRef<Page[]>([page]);

  const runTransition = useCallback(
    (target: Page) => {
      if (target === page || transitionState !== "idle") return;
      setPendingPage(target);
      setTransitionState("exiting");

      timeoutRef.current = setTimeout(() => {
        setPage(target);
        setTransitionState("entering");

        timeoutRef.current = setTimeout(() => {
          setTransitionState("idle");
          setPendingPage(null);
        }, config.duration);
      }, config.duration);
    },
    [page, transitionState, config.duration]
  );

  const navigate = useCallback(
    (target: Page) => {
      if (target === page || transitionState !== "idle") return;
      historyRef.current = [...historyRef.current, target];
      runTransition(target);
    },
    [page, transitionState, runTransition]
  );

  const enterLobby = useCallback(
    (lobbyId: string) => {
      setSelectedLobbyId(lobbyId);
      navigate("lobby-detail");
    },
    [navigate]
  );

  // Goes to whatever screen was actually visited before this one, instead
  // of a fixed destination. No-op at the root of the history stack.
  const goBack = useCallback(() => {
    if (transitionState !== "idle") return;
    const hist = historyRef.current;
    if (hist.length <= 1) return;
    const newHist = hist.slice(0, -1);
    historyRef.current = newHist;
    runTransition(newHist[newHist.length - 1]);
  }, [transitionState, runTransition]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    sessionStorage.setItem(PAGE_STORAGE_KEY, page);
  }, [page]);

  useEffect(() => {
    if (selectedLobbyId) sessionStorage.setItem(LOBBY_ID_STORAGE_KEY, selectedLobbyId);
    else sessionStorage.removeItem(LOBBY_ID_STORAGE_KEY);
  }, [selectedLobbyId]);

  const { enter, exit } = getAnimationNames(config.transition, config.direction);

  const screenAnimation = (): React.CSSProperties => {
    if (transitionState === "exiting") {
      return {
        animation: `${exit} ${config.duration}ms ${config.easing} forwards`,
        filter: config.glitchColor && config.transition === "glitch"
          ? "drop-shadow(2px 0 0 rgba(255,0,80,0.5)) drop-shadow(-2px 0 0 rgba(0,200,255,0.5))"
          : undefined,
      };
    }
    if (transitionState === "entering") {
      return {
        animation: `${enter} ${config.duration}ms ${config.easing} forwards`,
        filter: config.glitchColor && config.transition === "glitch"
          ? "drop-shadow(2px 0 0 rgba(255,0,80,0.5)) drop-shadow(-2px 0 0 rgba(0,200,255,0.5))"
          : undefined,
      };
    }
    return {};
  };

  const overlayClasses = [
    config.scanlines ? "nx-scanlines" : "",
    config.grid ? "nx-grid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Screen */}
      <div
        className={overlayClasses}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "auto",
          ...screenAnimation(),
        }}
      >
        {page === "landing" ? (
          <InteractiveLanding onNavigate={navigate} />
        ) : page === "lobbies" ? (
          <InteractiveLobbies onNavigate={navigate} onEnterLobby={enterLobby} />
        ) : page === "lobby-detail" && selectedLobbyId ? (
          <InteractiveLobbyDetail lobbyId={selectedLobbyId} onNavigate={navigate} />
        ) : page === "login" ? (
          <InteractiveLogin onNavigate={navigate} onBack={goBack} />
        ) : page === "catalog" ? (
          <InteractiveCatalog onNavigate={navigate} onEnterLobby={enterLobby} />
        ) : (
          <InteractiveProfile onNavigate={navigate} />
        )}
      </div>

      {/* Animation panel — dev only, disabled in production builds */}
      {import.meta.env.DEV && (
        <AnimPanel
          config={config}
          onChange={(patch) => setConfig((c) => ({ ...c, ...patch }))}
          open={panelOpen}
          onToggle={() => setPanelOpen((o) => !o)}
        />
      )}
    </div>
  );
}
