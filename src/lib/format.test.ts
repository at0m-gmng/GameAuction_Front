import { describe, it, expect } from "vitest";
import { formatBalance, formatMemberSince } from "./format";

describe("formatBalance", () => {
  it("formats a whole number with thousands separators and the credit symbol", () => {
    expect(formatBalance(842500)).toBe("842,500 ₵");
  });

  it("formats zero", () => {
    expect(formatBalance(0)).toBe("0 ₵");
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
