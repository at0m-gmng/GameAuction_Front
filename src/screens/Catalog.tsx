import { useEffect, useState } from "react";
import { useAuth } from "@/auth";
import { SharedTopNav } from "@/components/SharedTopNav";
import { getCatalogItems, startAuction, type CatalogItem } from "@/lib/catalogApi";
import { formatBalance, formatRarityLabel, rarityColors } from "@/lib/format";
import type { Page } from "@/lib/navigation";
import StartAuction from "@/imports/StartAuction/index";

type CatalogFilter = "All" | "Weapons" | "Armor" | "Tech" | "Rare+";

const FILTERS: CatalogFilter[] = ["All", "Weapons", "Armor", "Tech", "Rare+"];
const CATEGORY_BY_FILTER: Record<"Weapons" | "Armor" | "Tech", number> = { Weapons: 100, Armor: 200, Tech: 300 };

function matchesFilter(item: CatalogItem, filter: CatalogFilter): boolean {
  if (filter === "All") return true;
  if (filter === "Rare+") return item.rarity >= 200;
  return item.category === CATEGORY_BY_FILTER[filter];
}

export function InteractiveCatalog({ onNavigate, onEnterLobby }: { onNavigate: (p: Page) => void; onEnterLobby: (lobbyId: string) => void }) {
  const auth = useAuth();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<CatalogFilter>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    getCatalogItems()
      .then((response) => (response.ok ? (response.json() as Promise<CatalogItem[]>) : Promise.reject(response)))
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((error: unknown) => {
        if (!cancelled) console.error("Failed to load catalog:", error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && matchesFilter(item, filter));

  const handleStartAuction = async () => {
    if (!selected) return;
    if (!auth.token) {
      onNavigate("login");
      return;
    }

    setIsStarting(true);
    setStartError(null);

    try {
      const response = await startAuction(selected.id, auth.token);
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "FAILED TO START AUCTION");
      }
      const lobbyId = (await response.json()) as string;
      setSelected(null);
      onEnterLobby(lobbyId);
    } catch (error) {
      setStartError(error instanceof Error ? error.message.toUpperCase() : "UPLINK UNREACHABLE — CHECK CONNECTION");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="catalog" onNavigate={onNavigate} />

      <div style={{ padding: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11 }}>
              <span style={{ color: "#888" }}>NEXUS</span>
              <span style={{ color: "#888" }}>{">"}</span>
              <span style={{ color: "#ffb000" }}>CATALOG</span>
            </div>
            <p style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontWeight: 800, fontSize: 28, color: "#ffb000" }}>MARKET CATALOG</p>
          </div>
          <div style={{ width: 360, background: "#121212", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
            <input
              type="text"
              placeholder="Search catalog / systems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'Geist:Regular', sans-serif", fontSize: 13, color: "#e0e0e0" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "#ffb000" : "#121212",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: 2,
                padding: "8px 16px",
                cursor: "pointer",
                fontFamily: "'Unbounded:Bold', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                color: filter === f ? "#0a0a0a" : "#e0e0e0",
                outline: "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
          {visible.map((item) => {
            const rarity = rarityColors(item.rarity);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setStartError(null);
                  setSelected(item);
                }}
                style={{ background: "#121212", border: "1px solid #2a2a2a", display: "flex", flexDirection: "column", width: 280, flexShrink: 0, padding: 0, cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ height: 200, overflow: "hidden", position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#444" }}>NO IMAGE</span>
                  )}
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                  <div style={{ background: rarity.background, border: `1px solid ${rarity.color}`, borderRadius: 2, padding: "4px 8px", alignSelf: "flex-start" }}>
                    <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 10, color: rarity.color, textTransform: "uppercase" }}>
                      {formatRarityLabel(item.rarity)}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.name}
                  </p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>START BID:</span>
                    <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 15, color: "#ffb000" }}>{formatBalance(item.startingPrice)}</span>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(212,175,55,0.25)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 11, color: "#ffb000" }}>START AUCTION</span>
                    <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000" }}>→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!isLoading && visible.length === 0 && (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>
              {items.length === 0 ? ">> NO LOTS LISTED YET" : ">> NO ITEMS MATCH QUERY — MATRIX SEARCH RETURNED NULL"}
            </p>
          </div>
        )}

        {isLoading && (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>{">> LOADING CATALOG..."}</p>
          </div>
        )}
      </div>

      {selected && (
        <StartAuction
          item={{
            itemName: selected.name,
            itemImageUrl: selected.imageUrl,
            itemRarity: selected.rarity,
            startingPrice: selected.startingPrice,
            blockRef: "SEC_GRID_9 // BLOCK_884",
          }}
          onStart={handleStartAuction}
          onClose={() => setSelected(null)}
          isSubmitting={isStarting}
          errorMessage={startError ?? undefined}
        />
      )}
    </div>
  );
}
