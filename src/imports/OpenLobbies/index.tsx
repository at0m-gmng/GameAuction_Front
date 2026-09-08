import { useState } from "react";
import { formatBalance, formatLobbyStatusLabel, formatTimeLeft, lobbyStatusColors } from "@/lib/format";

export interface LobbyListItem {
  id: string;
  itemId: string;
  itemName: string;
  itemImageUrl: string | null;
  startingPrice: number;
  status: number;
  slotsTaken: number;
  maxSlots: number;
  currentBid: number;
  endsAt: string | null;
}

function TitleHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="title-header">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 font-['Geist_Mono:Regular',sans-serif] text-[11px] whitespace-nowrap">
        <span className="text-[#888]">NEXUS</span>
        <span className="text-[#888]">{">"}</span>
        <span className="text-[#ffb000]">LOBBIES</span>
      </div>
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[28px] whitespace-nowrap">ACTIVE LOBBIES</p>
      <p className="[word-break:break-word] font-['Geist:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#e0e0e0] text-[14px] whitespace-nowrap">Join players in real time and bid for high-grade cybernetic salvage.</p>
    </div>
  );
}

type StatusFilter = number | "all";

function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0"
      style={{ background: active ? "#ffb000" : "#121212", border: active ? "none" : "1px solid rgba(212,175,55,0.25)", cursor: "pointer", outline: "none" }}
      data-name="Frame"
    >
      <p
        className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[11px] whitespace-nowrap"
        style={{ color: active ? "#0a0a0a" : "#e0e0e0" }}
      >
        {label}
      </p>
    </button>
  );
}

// Backend LobbyStatus: Gathering=100, Bidding=200, Completed=300.
function TabsRow({ active, onSelect }: { active: StatusFilter; onSelect: (f: StatusFilter) => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="tabs-row">
      <FilterTab label="ALL" active={active === "all"} onClick={() => onSelect("all")} />
      <FilterTab label="COLLECTING" active={active === 100} onClick={() => onSelect(100)} />
      <FilterTab label="LIVE" active={active === 200} onClick={() => onSelect(200)} />
      <FilterTab label="COMPLETED" active={active === 300} onClick={() => onSelect(300)} />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-[#181818] content-stretch flex gap-[24px] items-start p-[16px] relative shrink-0 w-full" data-name="table-header">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] w-[320px]">ITEM NAME</p>
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] w-[140px]">PARTICIPANTS</p>
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] w-[160px]">STATUS</p>
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] w-[180px]">CURRENT VALUE</p>
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] w-[180px]">TIMER</p>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px relative text-[#888] text-[11px] text-right">ACTION</p>
    </div>
  );
}

function ColItem({ name, imageUrl }: { name: string; imageUrl: string | null }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[320px]" data-name="col-item">
      <div className="relative rounded-[4px] shrink-0 size-[64px] bg-[#181818] flex items-center justify-center" data-name="thumb">
        {imageUrl ? (
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imageUrl} />
        ) : (
          <span style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 8, color: "#444" }}>NO IMAGE</span>
        )}
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

function PipsRow({ slotsTaken, maxSlots }: { slotsTaken: number; maxSlots: number }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="pips-row">
      {Array.from({ length: maxSlots }, (_, i) => (
        <div
          key={i}
          className="border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]"
          style={{ background: i < slotsTaken ? "#ffb000" : "rgba(0,0,0,0)" }}
          data-name="Rectangle"
        />
      ))}
    </div>
  );
}

function ColSlots({ slotsTaken, maxSlots }: { slotsTaken: number; maxSlots: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="col-slots">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">
        {`SLOTS: ${slotsTaken}/${maxSlots}`}
      </p>
      <PipsRow slotsTaken={slotsTaken} maxSlots={maxSlots} />
    </div>
  );
}

function ColStatus({ status }: { status: number }) {
  const { color, background } = lobbyStatusColors(status);
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[160px]" data-name="col-status">
      <div className="content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" style={{ background }} data-name="status-badge">
        <div aria-hidden className="absolute border border-solid inset-0 pointer-events-none rounded-[2px]" style={{ borderColor: color }} />
        <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[11px] whitespace-nowrap" style={{ color }}>
          {formatLobbyStatusLabel(status)}
        </p>
      </div>
    </div>
  );
}

function ColBid({ currentBid }: { currentBid: number }) {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-bid">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">CURRENT BID</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">{formatBalance(currentBid)}</p>
    </div>
  );
}

function ColTimer({ status, endsAt }: { status: number; endsAt: string | null }) {
  const label = status === 300 ? "COMPLETED" : formatTimeLeft(endsAt);
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-timer">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">TIME LEFT</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[15px] text-white">{label}</p>
    </div>
  );
}

function ColAction({ status, onEnter }: { status: number; onEnter?: () => void }) {
  const isLive = status === 200;
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="col-action">
      <button
        type="button"
        onClick={onEnter}
        className="content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0 cursor-pointer"
        style={{ background: isLive ? "#ffb000" : "rgba(0,0,0,0)" }}
        data-name="button-terminal"
      >
        <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
        <p
          className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[12px] uppercase whitespace-nowrap"
          style={{ color: isLive ? "#0a0a0a" : "#ffb000" }}
        >
          ENTER LOBBY
        </p>
      </button>
    </div>
  );
}

function LobbyRow({ lobby, onEnterLobby }: { lobby: LobbyListItem; onEnterLobby?: (lobbyId: string) => void }) {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[24px] items-center p-[16px] relative shrink-0 w-full" data-name="lobby-row">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <ColItem name={lobby.itemName} imageUrl={lobby.itemImageUrl} />
      <ColSlots slotsTaken={lobby.slotsTaken} maxSlots={lobby.maxSlots} />
      <ColStatus status={lobby.status} />
      <ColBid currentBid={lobby.currentBid} />
      <ColTimer status={lobby.status} endsAt={lobby.endsAt} />
      <ColAction status={lobby.status} onEnter={() => onEnterLobby?.(lobby.id)} />
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{ padding: "48px 0", width: "100%", textAlign: "center" }}>
      <p style={{ fontFamily: "'Geist Mono:Regular', sans-serif", fontSize: 12, color: "#555" }}>{`>> ${label}`}</p>
    </div>
  );
}

function TableBody({ lobbies, onEnterLobby }: { lobbies: LobbyListItem[]; onEnterLobby?: (lobbyId: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="table-body">
      {lobbies.map((lobby) => (
        <LobbyRow key={lobby.id} lobby={lobby} onEnterLobby={onEnterLobby} />
      ))}
    </div>
  );
}

function LobbiesTable({
  lobbies,
  isLoading,
  allEmpty,
  onEnterLobby,
}: {
  lobbies: LobbyListItem[];
  isLoading: boolean;
  allEmpty: boolean;
  onEnterLobby?: (lobbyId: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="lobbies-table">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <TableHeader />
      {isLoading ? (
        <EmptyState label="LOADING LOBBIES..." />
      ) : allEmpty ? (
        <EmptyState label="NO ACTIVE LOBBIES YET" />
      ) : lobbies.length === 0 ? (
        <EmptyState label="NO LOBBIES IN THIS STATUS" />
      ) : (
        <TableBody lobbies={lobbies} onEnterLobby={onEnterLobby} />
      )}
    </div>
  );
}

export default function OpenLobbies({
  lobbies = [],
  isLoading = false,
  onEnterLobby,
}: {
  lobbies?: LobbyListItem[];
  isLoading?: boolean;
  onEnterLobby?: (lobbyId: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  const visible = activeFilter === "all" ? lobbies : lobbies.filter((l) => l.status === activeFilter);

  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative size-full" data-name="open-lobbies">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[48px] relative shrink-0 w-full" data-name="lobbies-body">
        <TitleHeader />
        <TabsRow active={activeFilter} onSelect={setActiveFilter} />
        <LobbiesTable lobbies={visible} isLoading={isLoading} allEmpty={lobbies.length === 0} onEnterLobby={onEnterLobby} />
      </div>
    </div>
  );
}
