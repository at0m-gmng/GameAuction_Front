import { ItemShowcase } from "@/components/ItemShowcase";
import { formatBalance, formatRarityLabel } from "@/lib/format";
import imgWinnerAvatar from "./winner-avatar.png";

export interface AuctionResultItem {
  itemName: string;
  itemImageUrl: string | null;
  itemRarity: number;
  blockRef: string;
}

export interface WonStats {
  finalBid: number;
  totalBids: number;
  participants: number;
}

export interface LostStats {
  winnerName: string;
  winningBid: number;
  yourFinalBid: number;
}

type AuctionResultProps =
  | {
      status: "won";
      item: AuctionResultItem;
      stats: WonStats;
      onAddToInventory?: () => void;
      onBackToCatalog?: () => void;
    }
  | {
      status: "lost";
      item: AuctionResultItem;
      stats: LostStats;
      onBrowseCatalog?: () => void;
      onTryAgain?: () => void;
    };

function HudCorners({ color }: { color: string }) {
  const base = "absolute content-stretch flex items-start overflow-clip size-[12px]";
  const rect = `bg-[rgba(0,0,0,0)] border-solid relative shrink-0 size-[12px]`;
  return (
    <>
      <div className={`${base} left-[-1px] top-[-1px]`} data-name="hud-corner">
        <div className={`${rect} border-l-2 border-t-2`} style={{ borderColor: color }} />
      </div>
      <div className={`${base} right-[-1px] top-[-1px]`} data-name="hud-corner">
        <div className={`${rect} border-r-2 border-t-2`} style={{ borderColor: color }} />
      </div>
      <div className={`${base} left-[-1px] bottom-[-1px]`} data-name="hud-corner">
        <div className={`${rect} border-b-2 border-l-2`} style={{ borderColor: color }} />
      </div>
      <div className={`${base} right-[-1px] bottom-[-1px]`} data-name="hud-corner">
        <div className={`${rect} border-b-2 border-r-2`} style={{ borderColor: color }} />
      </div>
    </>
  );
}

function StatBox({ label, value, color = "#e0e0e0" }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-[#121212] border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px p-[18px] relative">
      <HudCorners color="#ffb000" />
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[10px] uppercase whitespace-nowrap">
        {label}
      </p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[22px] whitespace-nowrap" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function ResultButton({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: "solid-amber" | "outline-amber" | "outline-red";
  onClick?: () => void;
}) {
  const styles: Record<typeof variant, string> = {
    "solid-amber": "bg-[#ffb000] border border-[#ffb000] border-solid text-[#0a0a0a]",
    "outline-amber": "bg-[rgba(0,0,0,0)] border border-[#ffb000] border-solid text-[#ffb000]",
    "outline-red": "bg-[rgba(0,0,0,0)] border border-[#f33] border-solid text-[#f33]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`content-stretch flex items-start px-[32px] py-[16px] relative shrink-0 cursor-pointer ${styles[variant]}`}
    >
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[12px] uppercase whitespace-nowrap">
        {label}
      </p>
    </button>
  );
}

/**
 * Общий экран результата аукциона — победа и поражение рендерятся одним
 * компонентом, ветвление по `status` меняет и данные, и способ отображения.
 */
export default function AuctionResult(props: AuctionResultProps) {
  const { status, item } = props;
  const isWon = status === "won";

  const statusColor = isWon ? "#ffb000" : "#f33";

  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col gap-[40px] items-center justify-center px-[48px] py-[80px] relative w-full" data-name="auction-result">
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="system-status-indicator">
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] whitespace-nowrap" style={{ color: statusColor }}>
          {isWon ? "[TRANS_SUCCESS: INVENTORY_LINK_SECURED]" : "[TRANS_FAILURE: ACCESS_DENIED // OUTBID]"}
        </p>
        <div className="relative shrink-0 size-[4px]" style={{ background: statusColor }} />
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[12px] whitespace-nowrap">
          {item.blockRef}
        </p>
      </div>

      <ItemShowcase
        tone={isWon ? "positive" : "muted"}
        itemName={item.itemName}
        itemImageUrl={item.itemImageUrl}
        badgeLabel={isWon ? `★ ${formatRarityLabel(item.itemRarity)} SALVAGE ★` : "SALVAGE SECURED BY COMPETING NODE"}
        subheading={{ text: isWon ? "[ ITEM IS YOURS ]" : "[ OUTBID ]", color: isWon ? "#fff" : "#f33" }}
      />

      {props.status === "won" ? (
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[680px]" data-name="stats-panel-row">
          <StatBox label="FINAL WINNING BID" value={formatBalance(props.stats.finalBid)} color="#ffb000" />
          <StatBox label="TRANS_LOG_DEPTH" value={`${props.stats.totalBids} BIDS`} color="#fff" />
          <StatBox label="COMPETING NODES" value={`${props.stats.participants} OPERATORS`} color="#fff" />
        </div>
      ) : (
        <div
          className="bg-[#121212] border-solid content-stretch flex flex-col gap-[16px] items-start p-[24px] relative shrink-0 w-[680px]"
          style={{ borderWidth: 1, borderColor: "rgba(138,15,15,0.19)" }}
          data-name="comparison-panel"
        >
          <HudCorners color="#8a0f0f" />
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="winner-row">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
              <div className="border border-[#8a0f0f] border-solid relative rounded-[2px] shrink-0 size-[28px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgWinnerAvatar} />
              </div>
              <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">
                {`${props.stats.winnerName} (WINNER)`}
              </p>
            </div>
            <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#f33] text-[16px] whitespace-nowrap">
              {formatBalance(props.stats.winningBid)}
            </p>
          </div>
          <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="metrics-grid">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
              <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">YOUR FINAL BID</p>
              <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[#e0e0e0] text-[16px]">
                {formatBalance(props.stats.yourFinalBid)}
              </p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
              <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">MARGIN OF DEFICIT</p>
              <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[#f33] text-[16px]">
                {formatBalance(props.stats.yourFinalBid - props.stats.winningBid)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="cta-row">
        {props.status === "won" ? (
          <>
            <ResultButton label="ADD TO INVENTORY" variant="solid-amber" onClick={props.onAddToInventory} />
            <ResultButton label="BACK TO CATALOG" variant="outline-amber" onClick={props.onBackToCatalog} />
          </>
        ) : (
          <>
            <ResultButton label="BROWSE CATALOG" variant="outline-amber" onClick={props.onBrowseCatalog} />
            <ResultButton label="TRY AGAIN" variant="outline-red" onClick={props.onTryAgain} />
          </>
        )}
      </div>
    </div>
  );
}
