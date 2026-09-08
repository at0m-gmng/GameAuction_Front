import { formatBalance, formatCategoryLabel, formatRarityLabel, rarityColors } from "@/lib/format";
import imgAvatarPlaceholder from "./avatar-placeholder.png";
import imgItemPreview from "./item-preview.png";
import imgPulseDot from "./pulse-dot.svg";

export interface AuctionPlayerSlot {
  playerId: string;
  displayName: string;
  bidAmount: number;
  isYou?: boolean;
}

export interface AuctionLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  message: string;
}

export interface LobbyAuctionData {
  lobbyCode: string;
  itemName: string;
  itemImageUrl: string | null;
  itemDescription: string;
  itemRarity: number;
  itemCategory: number;
  currentBid: number;
  currentBidderName: string | null;
  timeRemainingLabel: string;
  warningLabel: string | null;
  transactionLog: AuctionLogEntry[];
  players: AuctionPlayerSlot[];
  maxParticipants: number;
}

function HudCorner() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#ffb000] border-l-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner1() {
  return (
    <div className="absolute content-stretch flex items-start overflow-clip right-0 size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#ffb000] border-r-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner2() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start left-0 overflow-clip size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#ffb000] border-b-2 border-l-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner3() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start overflow-clip right-0 size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#ffb000] border-b-2 border-r-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function AllHudCorners() {
  return (
    <>
      <HudCorner />
      <HudCorner1 />
      <HudCorner2 />
      <HudCorner3 />
    </>
  );
}

function StatusBanner({ data }: { data: LobbyAuctionData }) {
  return (
    <div className="bg-[#181818] border-[#2a2a2a] border-b border-solid content-stretch flex h-[56px] items-center justify-between px-[48px] relative shrink-0 w-full" data-name="lobby-status-banner">
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="lobby-id-group">
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] whitespace-nowrap">{`LOBBY ID: // ${data.lobbyCode}`}</p>
        <div className="bg-[#2a2a2a] h-[16px] relative shrink-0 w-px" />
        <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">
          {`ITEM: ${data.itemName.toUpperCase()}`}
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="status-pulse">
        <img alt="" className="relative shrink-0 size-[8px]" src={imgPulseDot} />
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] whitespace-nowrap">
          AUCTION LIVE
        </p>
      </div>
    </div>
  );
}

function ShowcasePanel({ data }: { data: LobbyAuctionData }) {
  const { color: rarityColor, background: rarityBackground } = rarityColors(data.itemRarity);

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[400px]" data-name="showcase-panel">
      <div className="bg-[#121212] border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex flex-col h-[360px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="image-wrap">
        <AllHudCorners />
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <img alt={data.itemName} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={data.itemImageUrl ?? imgItemPreview} />
        </div>
      </div>
      <div className="bg-[#121212] border border-[#2a2a2a] border-solid content-stretch flex flex-col gap-[16px] items-start p-[24px] relative shrink-0 w-full" data-name="item-info-card">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <div
            className="content-stretch flex items-start px-[8px] py-[4px] relative rounded-[2px] shrink-0"
            style={{ background: rarityBackground, border: `1px solid ${rarityColor}` }}
            data-name="rarity-badge"
          >
            <p
              className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[10px] uppercase whitespace-nowrap"
              style={{ color: rarityColor }}
            >
              {formatRarityLabel(data.itemRarity)}
            </p>
          </div>
          <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">
            {`CLASS: ${formatCategoryLabel(data.itemCategory)}`}
          </p>
        </div>
        <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[20px] w-full">
          {data.itemName}
        </p>
        <p className="[word-break:break-word] font-['Geist:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#e0e0e0] text-[13px] w-full">
          {data.itemDescription}
        </p>
      </div>
    </div>
  );
}

function HudValues({ data }: { data: LobbyAuctionData }) {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="hud-values">
      <div className="bg-[#121212] border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px p-[24px] relative" data-name="highest-bid-hud">
        <HudCorner />
        <HudCorner3 />
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[12px] whitespace-nowrap">
          CURRENT HIGHEST BID
        </p>
        <p className="[word-break:break-word] font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[32px] whitespace-nowrap">
          {formatBalance(data.currentBid)}
        </p>
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[11px] whitespace-nowrap">
          {data.currentBidderName ? `HELD BY // ${data.currentBidderName}` : "NO BIDS YET"}
        </p>
      </div>
      <div className="bg-[#121212] border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px p-[24px] relative" data-name="timer-hud">
        <HudCorner1 />
        <HudCorner2 />
        <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[12px] whitespace-nowrap">
          ROUND TIME REMAINING
        </p>
        <p className="[word-break:break-word] font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[32px] text-white whitespace-nowrap">
          {data.timeRemainingLabel}
        </p>
        {data.warningLabel && (
          <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ef4444] text-[11px] whitespace-nowrap">
            {data.warningLabel}
          </p>
        )}
      </div>
    </div>
  );
}

function TransactionLogRow({ entry }: { entry: AuctionLogEntry }) {
  return (
    <p className="relative shrink-0 text-[#e0e0e0] w-full text-[12px]" data-name="log-row">
      <span className="leading-[normal] text-[#888] font-['Geist_Mono:Regular',sans-serif]">{`${entry.timestamp} // `}</span>
      <span className="font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal]">{`${entry.actor} `}</span>
      <span className="leading-[normal] font-['Geist_Mono:Regular',sans-serif]">{entry.message}</span>
    </p>
  );
}

function BidFeedPanel({ entries }: { entries: AuctionLogEntry[] }) {
  return (
    <div className="bg-[#121212] border border-[#2a2a2a] border-solid content-stretch flex flex-col gap-[12px] h-[200px] items-start p-[20px] relative shrink-0 w-full overflow-y-auto" data-name="bid-feed-panel">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] w-full">
        REAL-TIME TRANSACTION LOG
      </p>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="feed-list">
        {entries.length === 0 ? (
          <p className="text-[#888] text-[12px] font-['Geist_Mono:Regular',sans-serif]">Лог пуст — ставок ещё не было.</p>
        ) : (
          entries.map((entry) => <TransactionLogRow key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
}

function BidController({
  bidValue,
  onBidValueChange,
  onQuickBid,
  onSubmitBid,
  quickBidAmounts,
}: {
  bidValue: string;
  onBidValueChange?: (value: string) => void;
  onQuickBid?: (amount: number) => void;
  onSubmitBid?: () => void;
  quickBidAmounts: number[];
}) {
  return (
    <div className="bg-[#121212] border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex flex-col gap-[20px] items-start p-[24px] relative shrink-0 w-full" data-name="bid-controller">
      <AllHudCorners />
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="control-inputs">
        <div
          className="bg-black border border-[rgba(212,175,55,0.25)] border-solid content-stretch flex flex-[1_0_0] items-center justify-between min-w-px px-[16px] py-[12px] relative"
          data-name="bid-input"
        >
          <input
            type="number"
            value={bidValue}
            onChange={(e) => onBidValueChange?.(e.target.value)}
            placeholder="0"
            className="bg-transparent border-none outline-none w-full font-['Geist_Mono:Regular',sans-serif] text-[#e0e0e0] text-[14px]"
          />
          <p className="relative shrink-0 text-[#888] text-[12px]">₵</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="fast-keys">
          {quickBidAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onQuickBid?.(amount)}
              className="bg-[#181818] border border-[#2a2a2a] border-solid content-stretch flex items-start px-[16px] py-[12px] relative shrink-0 cursor-pointer"
            >
              <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] whitespace-nowrap">
                {`+${amount >= 1000 ? `${amount / 1000}k` : amount}`}
              </p>
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmitBid}
        className="bg-[#ffb000] content-stretch flex items-center justify-center py-[16px] relative shrink-0 w-full cursor-pointer"
      >
        <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          PLACE AUTHORIZED BID
        </p>
      </button>
    </div>
  );
}

function RightSlotsPanel({ players, maxParticipants }: { players: AuctionPlayerSlot[]; maxParticipants: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[320px]" data-name="right-slots-panel">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[12px] whitespace-nowrap">
        {`CONNECTED OPERATORS (${players.length}/${maxParticipants})`}
      </p>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="slots-grid">
        {players.map((slot) => (
          <div
            key={slot.playerId}
            className="bg-[#121212] border border-[#2a2a2a] border-solid content-stretch flex gap-[12px] items-center min-h-[64px] p-[12px] relative shrink-0 w-full"
            data-name="player-slot"
          >
            <div className="border border-[#ffb000] border-solid relative rounded-[2px] shrink-0 size-[32px]" data-name="avatar">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgAvatarPlaceholder} />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative whitespace-nowrap" data-name="slot-text">
              <p className="font-['Unbounded:Bold',sans-serif] font-bold relative shrink-0 text-[11px] text-white">
                {slot.displayName}
                {slot.isYou ? " (YOU)" : ""}
              </p>
              <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#ffb000] text-[12px]">
                {formatBalance(slot.bidAmount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Экран живого аукциона внутри лобби. Чисто презентационный — данные приходят
 * через пропсы, поле ставки и кнопки быстрой ставки принимают опциональные
 * обработчики, чтобы экран-обёртка мог подключить их позже без правок здесь.
 */
export default function LobbyAuction({
  data,
  bidValue,
  onBidValueChange,
  onQuickBid,
  onSubmitBid,
  quickBidAmounts = [10_000, 50_000, 100_000],
}: {
  data: LobbyAuctionData;
  bidValue: string;
  onBidValueChange?: (value: string) => void;
  onQuickBid?: (amount: number) => void;
  onSubmitBid?: () => void;
  quickBidAmounts?: number[];
}) {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative w-full" data-name="lobby-auction">
      <StatusBanner data={data} />
      <div className="content-stretch flex gap-[24px] items-start p-[48px] relative shrink-0 w-full" data-name="live-grid">
        <ShowcasePanel data={data} />
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="center-bid-console">
          <HudValues data={data} />
          <BidFeedPanel entries={data.transactionLog} />
          <BidController
            bidValue={bidValue}
            onBidValueChange={onBidValueChange}
            onQuickBid={onQuickBid}
            onSubmitBid={onSubmitBid}
            quickBidAmounts={quickBidAmounts}
          />
        </div>
        <RightSlotsPanel players={data.players} maxParticipants={data.maxParticipants} />
      </div>
    </div>
  );
}
