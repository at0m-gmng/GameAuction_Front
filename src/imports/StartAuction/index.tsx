import { useEffect } from "react";
import { ItemShowcase } from "@/components/ItemShowcase";
import { formatBalance, formatRarityLabel, rarityColors } from "@/lib/format";

export interface StartAuctionItem {
  itemName: string;
  itemImageUrl: string | null;
  itemRarity: number;
  startingPrice: number;
  blockRef: string;
}

/**
 * Модальный экран запуска аукциона по лоту из каталога — витрина предмета без ввода цены, кнопка «Начать аукцион».
 */
export default function StartAuction({
  item,
  onStart,
  onClose,
  isSubmitting = false,
  errorMessage,
}: {
  item: StartAuctionItem;
  onStart?: () => void;
  onClose?: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}) {
  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-[24px] py-[24px] z-50"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
      data-name="start-auction-overlay"
    >
      <div
        className="bg-[#0a0a0a] border border-[#2a2a2a] border-solid content-stretch flex flex-col gap-[20px] items-center px-[40px] py-[32px] relative max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-name="start-auction-panel"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[20px] top-[20px] text-[#888] text-[20px] leading-none cursor-pointer hover:text-[#e0e0e0]"
        >
          ×
        </button>

        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="system-status-indicator">
          <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] whitespace-nowrap">
            [LOT_READY: AUCTION_UPLINK_OPEN]
          </p>
          <div className="bg-[#ffb000] relative shrink-0 size-[4px]" />
          <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[12px] whitespace-nowrap">
            {item.blockRef}
          </p>
        </div>

        <ItemShowcase
          tone="positive"
          size="compact"
          itemName={item.itemName}
          itemImageUrl={item.itemImageUrl}
          badgeLabel={`★ ${formatRarityLabel(item.itemRarity)} ★`}
          accentColor={rarityColors(item.itemRarity).color}
        />

        <div
          className="bg-[#121212] border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex items-center justify-between p-[16px] relative shrink-0 w-[480px]"
          data-name="starting-price-panel"
        >
          <span className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px] uppercase">
            STARTING BID
          </span>
          <span className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#ffb000] text-[20px]">
            {formatBalance(item.startingPrice)}
          </span>
        </div>

        {errorMessage && (
          <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#f33] text-[12px] text-center w-[480px] -mt-[10px]">
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          onClick={onStart}
          disabled={isSubmitting}
          className="bg-[#ffb000] content-stretch flex items-center justify-center py-[14px] relative shrink-0 w-[480px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[14px] uppercase whitespace-nowrap">
            {isSubmitting ? "STARTING..." : "START AUCTION"}
          </p>
        </button>
      </div>
    </div>
  );
}
