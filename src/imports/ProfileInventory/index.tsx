import { formatAcquiredDate, formatBalance, formatRarityLabel, rarityColors } from "@/lib/format";
import imgAvatar from "./2737e4614601b8c4372249e7a0e7ee82af9b8606.png";

export interface ProfileData {
  nickname: string;
  balanceLabel: string;
  memberSinceLabel: string;
}

export interface ProfileInventoryItem {
  itemId: string;
  name: string;
  category: number;
  rarity: number;
  imageUrl: string | null;
  startingPrice: number;
  quantity: number;
  acquiredAt: string;
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

function AvatarHexFrame() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[80px]" data-name="avatar-hex-frame">
      <div aria-hidden className="absolute border-2 border-[#ffb000] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="relative rounded-[8px] shrink-0 size-[72px]" data-name="operator-avatar">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function Tagline({ memberSinceLabel }: { memberSinceLabel: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="tagline">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[11px] whitespace-nowrap">{`NODE_STATUS // VERIFIED`}</p>
      <div className="bg-[#ffb000] relative shrink-0 size-[3px]" data-name="Rectangle" />
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">{memberSinceLabel}</p>
    </div>
  );
}

function IdentityBlock({ data }: { data: ProfileData }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="identity-block">
      <Tagline memberSinceLabel={data.memberSinceLabel} />
      <p className="[word-break:break-word] font-['Unbounded:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[24px] text-white whitespace-nowrap">{data.nickname}</p>
    </div>
  );
}

// NOTE: zeroed out, not faked — Lobby.API has no query that returns a
// player's win/loss record yet. Wire these up for real once it does.
function Stat() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="stat">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">TOTAL WINS</p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#ffb000] text-[24px]">0</p>
    </div>
  );
}

function Stat1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="stat">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">TOTAL LOSSES</p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#e0e0e0] text-[24px]">0</p>
    </div>
  );
}

function Stat2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="stat">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">WIN RATE</p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#ffb000] text-[24px]">0%</p>
    </div>
  );
}

function StatBlockContainer() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[48px] items-start leading-[normal] relative shrink-0 whitespace-nowrap" data-name="stat-block-container">
      <Stat />
      <Stat1 />
      <Stat2 />
    </div>
  );
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      onClick={onLogout}
      style={{
        background: "none",
        border: "1px solid rgba(255,60,60,0.4)",
        borderRadius: 2,
        padding: "8px 14px",
        cursor: "pointer",
        outline: "none",
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: "'Geist Mono:Bold', sans-serif", fontWeight: 700, fontSize: 10, color: "#ff6060", letterSpacing: 1 }}>
        LOG OUT
      </span>
    </button>
  );
}

function OperatorDetails({ data, onLogout }: { data: ProfileData; onLogout: () => void }) {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="operator-details">
      <AvatarHexFrame />
      <IdentityBlock data={data} />
      <StatBlockContainer />
      <LogoutButton onLogout={onLogout} />
    </div>
  );
}

function ProfileSummary({ data, onLogout }: { data: ProfileData; onLogout: () => void }) {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col gap-[24px] items-start p-[32px] relative shrink-0 w-full" data-name="profile-summary">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none" />
      <HudCorner />
      <HudCorner1 />
      <HudCorner2 />
      <HudCorner3 />
      <OperatorDetails data={data} onLogout={onLogout} />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#ffb000] content-stretch flex items-start px-[12px] py-[6px] relative rounded-[2px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[10px] whitespace-nowrap">ALL Rarity</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#121212] content-stretch flex items-start px-[12px] py-[6px] relative rounded-[2px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e0e0e0] text-[10px] whitespace-nowrap">Weapons</p>
    </div>
  );
}

function SortingTabs() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="sorting-tabs">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function FilterHeader({ itemCount }: { itemCount: number }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="filter-header">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[16px] whitespace-nowrap">
        {`EQUIPPED SALVAGE (${itemCount} ${itemCount === 1 ? "ITEM" : "ITEMS"})`}
      </p>
      <SortingTabs />
    </div>
  );
}

function ItemCardHudCorners() {
  return (
    <>
      <div className="absolute content-stretch flex items-start left-0 overflow-clip size-[12px] top-0" data-name="hud-corner">
        <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-l-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
      </div>
      <div className="absolute content-stretch flex items-start overflow-clip right-0 size-[12px] top-0" data-name="hud-corner">
        <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-r-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
      </div>
      <div className="absolute bottom-0 content-stretch flex items-start left-0 overflow-clip size-[12px]" data-name="hud-corner">
        <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-l-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
      </div>
      <div className="absolute bottom-0 content-stretch flex items-start overflow-clip right-0 size-[12px]" data-name="hud-corner">
        <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-r-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
      </div>
    </>
  );
}

function InventoryItemCard({ item }: { item: ProfileInventoryItem }) {
  const { color, background } = rarityColors(item.rarity);

  return (
    <div className="bg-[#121212] content-stretch flex flex-col gap-[12px] items-start p-[12px] relative shrink-0 w-[76px]" data-name="item-card">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <ItemCardHudCorners />
      <div className="h-[140px] relative shrink-0 w-full flex items-center justify-center" data-name="item-thumb">
        {item.imageUrl ? (
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={item.imageUrl} />
        ) : (
          <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 9, color: "#444" }}>NO IMAGE</p>
        )}
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="item-details">
        <div
          className="content-stretch flex items-start px-[6px] py-[2px] relative rounded-[2px] shrink-0"
          style={{ background, border: `1px solid ${color}` }}
          data-name="rarity-badge"
        >
          <p
            className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[9px] whitespace-nowrap"
            style={{ color }}
          >
            {formatRarityLabel(item.rarity)}
          </p>
        </div>
        <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-full overflow-hidden relative shrink-0 text-[13px] text-ellipsis text-white w-[min-content] whitespace-nowrap">
          {item.quantity > 1 ? `${item.name} ×${item.quantity}` : item.name}
        </p>
        <div className="[word-break:break-word] content-stretch flex font-normal items-start justify-between leading-[normal] relative shrink-0 text-[10px] w-full whitespace-nowrap" data-name="meta-market">
          <p className="flex-[1_0_0] font-['Geist_Mono:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#888] text-ellipsis">
            {`VAL // ${formatBalance(item.startingPrice)}`}
          </p>
          <p className="flex-[1_0_0] font-['Geist_Mono:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#ffb000] text-ellipsis">
            {formatAcquiredDate(item.acquiredAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

function InventoryEmptyState({ label }: { label: string }) {
  return (
    <div style={{ padding: "48px 0", width: "100%", textAlign: "center" }}>
      <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>{`>> ${label}`}</p>
    </div>
  );
}

function InventoryColumn({ items, isLoading }: { items: ProfileInventoryItem[]; isLoading: boolean }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="inventory-column">
      <FilterHeader itemCount={items.length} />
      {isLoading ? (
        <InventoryEmptyState label="LOADING INVENTORY..." />
      ) : items.length === 0 ? (
        <InventoryEmptyState label="NO ITEMS IN INVENTORY YET" />
      ) : (
        <div className="content-start flex flex-wrap gap-[24px] items-start relative shrink-0 w-full" data-name="Frame">
          {items.map((item) => (
            <InventoryItemCard key={item.itemId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

// NOTE: honest placeholder — no backend endpoint returns a player's auction
// history yet. Replace with a real list once one exists.
function HistoryColumn() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[420px]" data-name="history-column">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[16px] whitespace-nowrap">AUCTION HISTORY</p>
      <div className="bg-[#121212] border border-[#2a2a2a] border-solid flex items-center justify-center w-full" style={{ minHeight: 120, padding: 32 }}>
        <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 11, color: "#555", textAlign: "center" }}>
          {">> NO AUCTION ACTIVITY YET"}
        </p>
      </div>
    </div>
  );
}

function SplitLayoutRow({ inventory, isInventoryLoading }: { inventory: ProfileInventoryItem[]; isInventoryLoading: boolean }) {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="split-layout-row">
      <InventoryColumn items={inventory} isLoading={isInventoryLoading} />
      <HistoryColumn />
    </div>
  );
}

function ProfileBody({
  data,
  inventory,
  isInventoryLoading,
  onLogout,
}: {
  data: ProfileData;
  inventory: ProfileInventoryItem[];
  isInventoryLoading: boolean;
  onLogout: () => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start p-[48px] relative shrink-0 w-full" data-name="profile-body">
      <ProfileSummary data={data} onLogout={onLogout} />
      <SplitLayoutRow inventory={inventory} isInventoryLoading={isInventoryLoading} />
    </div>
  );
}

const DEFAULT_PROFILE_DATA: ProfileData = {
  nickname: "OPERATOR_X",
  balanceLabel: "842,500 ₵",
  memberSinceLabel: "MEMBER SINCE // DEC_2025",
};

export default function ProfileInventory({
  data = DEFAULT_PROFILE_DATA,
  inventory = [],
  isInventoryLoading = false,
  onLogout = () => {},
}: {
  data?: ProfileData;
  inventory?: ProfileInventoryItem[];
  isInventoryLoading?: boolean;
  onLogout?: () => void;
}) {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative size-full" data-name="profile-inventory">
      <ProfileBody data={data} inventory={inventory} isInventoryLoading={isInventoryLoading} onLogout={onLogout} />
    </div>
  );
}
