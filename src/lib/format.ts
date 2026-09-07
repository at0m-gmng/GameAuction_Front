export function formatBalance(amount: number): string {
  return `${amount.toLocaleString("en-US")} ₵`;
}

export function formatMemberSince(isoDate: string): string {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(isoDate);
  return `MEMBER SINCE // ${months[date.getUTCMonth()]}_${date.getUTCFullYear()}`;
}

export function formatAcquiredDate(isoDate: string): string {
  const date = new Date(isoDate);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `ACQUIRED // ${month}.${day}`;
}

// Backend ItemRarity enum: Common=100, Rare=200, Epic=300, Legendary=400
// (GameBackend.SharedKernel.Domain.ItemRarity — numeric values are part of
// the wire contract since the backend doesn't serialize enums as strings).
export function formatRarityLabel(rarity: number): string {
  switch (rarity) {
    case 100: return "COMMON";
    case 200: return "RARE";
    case 300: return "EPIC";
    case 400: return "LEGENDARY";
    default: return "UNKNOWN";
  }
}

export function rarityColors(rarity: number): { color: string; background: string } {
  switch (rarity) {
    case 400: return { color: "#ffb000", background: "rgba(255,176,0,0.08)" };
    case 300: return { color: "#a855f7", background: "rgba(168,85,247,0.08)" };
    case 200: return { color: "#3b82f6", background: "rgba(59,130,246,0.08)" };
    default: return { color: "#888", background: "rgba(136,136,136,0.08)" };
  }
}

// Backend ItemCategory enum: Weapons=100, Armor=200, Tech=300.
export function formatCategoryLabel(category: number): string {
  switch (category) {
    case 100: return "WEAPONS";
    case 200: return "ARMOR";
    case 300: return "TECH";
    default: return "UNKNOWN";
  }
}
