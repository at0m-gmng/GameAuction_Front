import { useState } from "react";
import { SharedTopNav } from "@/components/SharedTopNav";
import type { Page } from "@/lib/navigation";
import catalogSvgPaths from "@/imports/ItemCatalog/svg-r87hwqqn1g";

import imgCat0 from "@/imports/ItemCatalog/ab63c4449a5f71f870f6dc70653f918e549f30af.png";
import imgCat1 from "@/imports/ItemCatalog/5fae9ce40f452646114b776c34c365fb88fb96bb.png";
import imgCat2 from "@/imports/ItemCatalog/73513a2b072469961baf7a661f88e955fb066408.png";
import imgCat3 from "@/imports/ItemCatalog/a1c0d58aa5ee67c834e439faca8f15b7a9e7db18.png";
import imgCat4 from "@/imports/ItemCatalog/8ef904f465f6741a1c054ae3f10b42320d46049b.png";
import imgCat5 from "@/imports/ItemCatalog/74fb9bdbc5ead1f88d296bbe23d248cd82778db1.png";
import imgCat6 from "@/imports/ItemCatalog/aa7db501a2aa12ae87ba59044a5369e89cd6bc21.png";
import imgCat7 from "@/imports/ItemCatalog/16f854ba5653d2677ff12511e9722692957cf225.png";

/* ─── Catalog page ──────────────────────────────────────────────────────── */

const CATALOG_ITEMS = [
  { img: imgCat0, name: "Satori Neural Link",    price: "250,000", rarity: "Legendary", rarityColor: "#ffb000", rarityBg: "rgba(255,176,0,0.08)", interest: 12 },
  { img: imgCat1, name: "Kusanagi Nanoblade",    price: "480,000", rarity: "Legendary", rarityColor: "#ffb000", rarityBg: "rgba(255,176,0,0.08)", interest: 31 },
  { img: imgCat2, name: "Arasaka Oni Mask v4",   price: "95,000",  rarity: "Epic",      rarityColor: "#a855f7", rarityBg: "rgba(168,85,247,0.08)", interest: 8  },
  { img: imgCat3, name: "Militech Tactical Vest",price: "120,000", rarity: "Epic",      rarityColor: "#a855f7", rarityBg: "rgba(168,85,247,0.08)", interest: 14 },
  { img: imgCat4, name: "Cyberdeck 'Deus-X'",    price: "600,000", rarity: "Legendary", rarityColor: "#ffb000", rarityBg: "rgba(255,176,0,0.08)", interest: 42 },
  { img: imgCat5, name: "NCPD Subdermal Plating",price: "45,000",  rarity: "Rare",      rarityColor: "#3b82f6", rarityBg: "rgba(59,130,246,0.08)", interest: 5  },
  { img: imgCat6, name: "Apex Smart Visor",      price: "65,000",  rarity: "Rare",      rarityColor: "#3b82f6", rarityBg: "rgba(59,130,246,0.08)", interest: 9  },
  { img: imgCat7, name: "Kang Tao EMP Cannon",   price: "185,000", rarity: "Epic",      rarityColor: "#a855f7", rarityBg: "rgba(168,85,247,0.08)", interest: 19 },
];

type CatalogFilter = "All" | "Weapons" | "Armor" | "Tech" | "Rare+";

const RARITY_MAP: Record<CatalogFilter, string[]> = {
  All:     [],
  Weapons: ["Satori Neural Link", "Kusanagi Nanoblade", "Kang Tao EMP Cannon"],
  Armor:   ["Militech Tactical Vest", "NCPD Subdermal Plating"],
  Tech:    ["Cyberdeck 'Deus-X'", "Apex Smart Visor", "Arasaka Oni Mask v4"],
  "Rare+": ["Legendary", "Epic"],
};

export function InteractiveCatalog({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [filter, setFilter] = useState<CatalogFilter>("All");
  const [search, setSearch] = useState("");

  const visible = CATALOG_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "All") return true;
    if (filter === "Rare+") return RARITY_MAP["Rare+"].includes(item.rarity);
    return RARITY_MAP[filter].includes(item.name);
  });

  const FILTERS: CatalogFilter[] = ["All", "Weapons", "Armor", "Tech", "Rare+"];

  return (
    <div style={{ width: "100%", minHeight: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="catalog" onNavigate={onNavigate} />

      <div style={{ padding: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11 }}>
              <span style={{ color: "#888" }}>NEXUS</span>
              <span style={{ color: "#888" }}>{">"}</span>
              <span style={{ color: "#ffb000" }}>CATALOG</span>
            </div>
            <p style={{ fontFamily: "'Unbounded:ExtraBold', sans-serif", fontWeight: 800, fontSize: 28, color: "#ffb000" }}>
              MARKET CATALOG
            </p>
          </div>
          {/* Search */}
          <div style={{ position: "relative", width: 360, background: "#121212", border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={catalogSvgPaths.p3f6e0f00} stroke="#888" strokeLinecap="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Search catalog / systems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'Geist:Regular', sans-serif", fontSize: 13, color: "#e0e0e0" }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12 }}>
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

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 280px)",
            gap: 24,
          }}
        >
          {visible.map((item) => (
            <div
              key={item.name}
              style={{ background: "#121212", border: "1px solid #2a2a2a", display: "flex", flexDirection: "column" }}
            >
              <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Meta row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div
                    style={{
                      background: item.rarityBg,
                      border: `1px solid ${item.rarityColor}`,
                      borderRadius: 2,
                      padding: "4px 8px",
                    }}
                  >
                    <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 10, color: item.rarityColor, textTransform: "uppercase" }}>
                      {item.rarity}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d={catalogSvgPaths.p2c9b3000} stroke="#888" strokeLinecap="round" strokeWidth="2" />
                    </svg>
                    <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>{item.interest}</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#888" }}>START BID:</span>
                  <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 15, color: "#ffb000" }}>{item.price} ₵</span>
                </div>
                {/* Card action */}
                <div style={{ borderTop: "1px solid rgba(212,175,55,0.25)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Unbounded:Bold', sans-serif", fontWeight: 700, fontSize: 11, color: "#ffb000" }}>JOIN AUCTION</span>
                  <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#ffb000" }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>
              {`>> NO ITEMS MATCH QUERY — MATRIX SEARCH RETURNED NULL`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
