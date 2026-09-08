import { describe, it, expect } from "vitest";
import { formatAcquiredDate, formatBalance, formatCategoryLabel, formatCompactBalance, formatMemberSince, formatRarityLabel, rarityColors } from "./format";

describe("formatBalance", () => {
  it("formats a whole number with thousands separators and the credit symbol", () => {
    expect(formatBalance(842500)).toBe("842,500 ₵");
  });

  it("formats zero", () => {
    expect(formatBalance(0)).toBe("0 ₵");
  });
});

describe("formatCompactBalance", () => {
  it.each([
    [999, "999 ₵"],
    [1_500, "1.5K ₵"],
    [50_000, "50K ₵"],
    [1_200_000, "1.2M ₵"],
    [5_000_000_000, "5B ₵"],
    [2_500_000_000_000, "2.5T ₵"],
  ])("formats %i as %s", (amount, expected) => {
    expect(formatCompactBalance(amount)).toBe(expected);
  });

  it("keeps the full number below the K tier", () => {
    expect(formatCompactBalance(842500)).toBe("842.5K ₵");
  });
});

describe("formatMemberSince", () => {
  it("formats an ISO date into the terminal MEMBER SINCE label", () => {
    expect(formatMemberSince("2025-12-03T10:00:00Z")).toBe("MEMBER SINCE // DEC_2025");
  });

  it("uses UTC month/year, not local time", () => {
    // 2026-01-01T00:30 UTC could roll back a day/month in some local
    // timezones — must stay January in the label regardless.
    expect(formatMemberSince("2026-01-01T00:30:00Z")).toBe("MEMBER SINCE // JAN_2026");
  });
});

describe("formatAcquiredDate", () => {
  it("formats an ISO date as zero-padded MM.DD", () => {
    expect(formatAcquiredDate("2026-01-05T10:00:00Z")).toBe("ACQUIRED // 01.05");
  });
});

describe("formatRarityLabel", () => {
  it.each([
    [100, "COMMON"],
    [200, "RARE"],
    [300, "EPIC"],
    [400, "LEGENDARY"],
    [999, "UNKNOWN"],
  ])("maps rarity %i to %s", (rarity, label) => {
    expect(formatRarityLabel(rarity)).toBe(label);
  });
});

describe("formatCategoryLabel", () => {
  it.each([
    [100, "WEAPONS"],
    [200, "ARMOR"],
    [300, "TECH"],
    [999, "UNKNOWN"],
  ])("maps category %i to %s", (category, label) => {
    expect(formatCategoryLabel(category)).toBe(label);
  });
});

describe("rarityColors", () => {
  it("gives Legendary the gold accent color", () => {
    expect(rarityColors(400).color).toBe("#ffb000");
  });

  it("falls back to a neutral color for unknown rarities", () => {
    expect(rarityColors(999).color).toBe("#888");
  });
});
