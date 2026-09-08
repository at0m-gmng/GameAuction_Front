import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileInventory, { type ProfileInventoryItem } from "./index";

const GIFT_ITEM: ProfileInventoryItem = {
  itemId: "11111111-1111-1111-1111-111111111111",
  name: "Kang Tao EMP Cannon",
  category: 100,
  rarity: 300,
  imageUrl: null,
  startingPrice: 185000,
  quantity: 1,
  acquiredAt: "2026-01-05T10:00:00Z",
};

describe("ProfileInventory", () => {
  it("never shows fabricated win/loss numbers — always zero until Lobby.API can report them", () => {
    render(<ProfileInventory />);
    // TOTAL WINS and TOTAL LOSSES both read "0"; WIN RATE reads "0%".
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("0%")).toBeTruthy();
  });

  it("shows an honest empty state, not fake items, when the inventory is empty", () => {
    render(<ProfileInventory inventory={[]} />);
    expect(screen.getByText("EQUIPPED SALVAGE (0 ITEMS)")).toBeTruthy();
    expect(screen.getByText(/NO ITEMS IN INVENTORY YET/)).toBeTruthy();
  });

  it("shows a loading state instead of empty or fake content while the fetch is in flight", () => {
    render(<ProfileInventory inventory={[]} isInventoryLoading />);
    expect(screen.getByText(/LOADING INVENTORY/)).toBeTruthy();
  });

  it("renders a real inventory item — exactly the case of a freshly granted welcome gift", () => {
    render(<ProfileInventory inventory={[GIFT_ITEM]} />);
    expect(screen.getByText("EQUIPPED SALVAGE (1 ITEM)")).toBeTruthy();
    expect(screen.getByText("Kang Tao EMP Cannon")).toBeTruthy();
    expect(screen.getByText("EPIC")).toBeTruthy();
    expect(screen.getByText("185K ₵")).toBeTruthy();
    expect(screen.getByText("ACQUIRED")).toBeTruthy();
    expect(screen.getByText("01.05")).toBeTruthy();
  });

  it("shows quantity for stacked items", () => {
    render(<ProfileInventory inventory={[{ ...GIFT_ITEM, quantity: 3 }]} />);
    expect(screen.getByText("Kang Tao EMP Cannon ×3")).toBeTruthy();
  });

  it("shows an honest placeholder for auction history — no such endpoint exists yet", () => {
    render(<ProfileInventory />);
    expect(screen.getByText("AUCTION HISTORY")).toBeTruthy();
    expect(screen.getByText(/NO AUCTION ACTIVITY YET/)).toBeTruthy();
  });
});
