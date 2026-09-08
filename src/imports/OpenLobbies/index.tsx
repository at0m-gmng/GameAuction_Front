import imgThumb from "./492a36d693a9b0c3bd7546ee265678018f3ef48b.png";
import imgThumb1 from "./8ac53f856ca61df443d3fdc23615e1ec9dc6b8b4.png";
import imgThumb2 from "./66f949338538c454d5b8a509557171d2352f5a73.png";
import imgThumb3 from "./8cc6f3d116dd1e247a21215d47fac482d47cb248.png";
import imgThumb4 from "./9230743b4b1b2306e372dfa3967c2a5751e3ab20.png";

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

function Frame3() {
  return (
    <div className="bg-[#ffb000] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[11px] whitespace-nowrap">ALL</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#121212] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e0e0e0] text-[11px] whitespace-nowrap">COLLECTING</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#121212] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e0e0e0] text-[11px] whitespace-nowrap">LIVE</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#121212] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e0e0e0] text-[11px] whitespace-nowrap">COMPLETED</p>
    </div>
  );
}

function TabsRow() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="tabs-row">
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
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

function ColItem() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[320px]" data-name="col-item">
      <div className="relative rounded-[4px] shrink-0 size-[64px]" data-name="thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgThumb} />
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">Satori Neural Link</p>
    </div>
  );
}

function PipsRow() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="pips-row">
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[rgba(0,0,0,0)] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[rgba(0,0,0,0)] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
    </div>
  );
}

function ColSlots() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="col-slots">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">SLOTS: 4/6</p>
      <PipsRow />
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="bg-[rgba(251,191,36,0.08)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="status-badge">
      <div aria-hidden className="absolute border border-[#fbbf24] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#fbbf24] text-[11px] whitespace-nowrap">COLLECTING</p>
    </div>
  );
}

function ColStatus() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[160px]" data-name="col-status">
      <StatusBadge />
    </div>
  );
}

function ColBid() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-bid">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">CURRENT BID</p>
      <p className="font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">250,000 ₵</p>
    </div>
  );
}

function ColTimer() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-timer">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">TIME LEFT</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[15px] text-white">STARTING SOON</p>
    </div>
  );
}

function ButtonTerminal() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0" data-name="button-terminal">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] uppercase whitespace-nowrap">ENTER LOBBY</p>
    </div>
  );
}

function ColAction() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="col-action">
      <ButtonTerminal />
    </div>
  );
}

function LobbyRow() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[24px] items-center p-[16px] relative shrink-0 w-full" data-name="lobby-row">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <ColItem />
      <ColSlots />
      <ColStatus />
      <ColBid />
      <ColTimer />
      <ColAction />
    </div>
  );
}

function ColItem1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[320px]" data-name="col-item">
      <div className="relative rounded-[4px] shrink-0 size-[64px]" data-name="thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgThumb1} />
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">Kusanagi Nanoblade</p>
    </div>
  );
}

function PipsRow1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="pips-row">
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
    </div>
  );
}

function ColSlots1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="col-slots">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">SLOTS: 6/6</p>
      <PipsRow1 />
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="bg-[rgba(255,176,0,0.08)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="status-badge">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[11px] whitespace-nowrap">AUCTION LIVE</p>
    </div>
  );
}

function ColStatus1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[160px]" data-name="col-status">
      <StatusBadge1 />
    </div>
  );
}

function ColBid1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-bid">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">CURRENT BID</p>
      <p className="font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">520,000 ₵</p>
    </div>
  );
}

function ColTimer1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-timer">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">TIME LEFT</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">00:42 SEC</p>
    </div>
  );
}

function ButtonTerminal1() {
  return (
    <div className="bg-[#ffb000] content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0" data-name="button-terminal">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[12px] uppercase whitespace-nowrap">ENTER LOBBY</p>
    </div>
  );
}

function ColAction1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="col-action">
      <ButtonTerminal1 />
    </div>
  );
}

function LobbyRow1() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[24px] items-center p-[16px] relative shrink-0 w-full" data-name="lobby-row">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <ColItem1 />
      <ColSlots1 />
      <ColStatus1 />
      <ColBid1 />
      <ColTimer1 />
      <ColAction1 />
    </div>
  );
}

function ColItem2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[320px]" data-name="col-item">
      <div className="relative rounded-[4px] shrink-0 size-[64px]" data-name="thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgThumb2} />
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">Arasaka Oni Mask v4</p>
    </div>
  );
}

function PipsRow2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="pips-row">
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
    </div>
  );
}

function ColSlots2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="col-slots">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">SLOTS: 6/6</p>
      <PipsRow2 />
    </div>
  );
}

function StatusBadge2() {
  return (
    <div className="bg-[rgba(255,176,0,0.08)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="status-badge">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[11px] whitespace-nowrap">AUCTION LIVE</p>
    </div>
  );
}

function ColStatus2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[160px]" data-name="col-status">
      <StatusBadge2 />
    </div>
  );
}

function ColBid2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-bid">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">CURRENT BID</p>
      <p className="font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">115,000 ₵</p>
    </div>
  );
}

function ColTimer2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-timer">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">TIME LEFT</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">01:15 MIN</p>
    </div>
  );
}

function ButtonTerminal2() {
  return (
    <div className="bg-[#ffb000] content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0" data-name="button-terminal">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[12px] uppercase whitespace-nowrap">ENTER LOBBY</p>
    </div>
  );
}

function ColAction2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="col-action">
      <ButtonTerminal2 />
    </div>
  );
}

function LobbyRow2() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[24px] items-center p-[16px] relative shrink-0 w-full" data-name="lobby-row">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <ColItem2 />
      <ColSlots2 />
      <ColStatus2 />
      <ColBid2 />
      <ColTimer2 />
      <ColAction2 />
    </div>
  );
}

function ColItem3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[320px]" data-name="col-item">
      <div className="relative rounded-[4px] shrink-0 size-[64px]" data-name="thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgThumb3} />
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">{`Cyberdeck 'Deus-X'`}</p>
    </div>
  );
}

function PipsRow3() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="pips-row">
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[rgba(0,0,0,0)] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[rgba(0,0,0,0)] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[rgba(0,0,0,0)] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[rgba(0,0,0,0)] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
    </div>
  );
}

function ColSlots3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="col-slots">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">SLOTS: 2/6</p>
      <PipsRow3 />
    </div>
  );
}

function StatusBadge3() {
  return (
    <div className="bg-[rgba(251,191,36,0.08)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="status-badge">
      <div aria-hidden className="absolute border border-[#fbbf24] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#fbbf24] text-[11px] whitespace-nowrap">COLLECTING</p>
    </div>
  );
}

function ColStatus3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[160px]" data-name="col-status">
      <StatusBadge3 />
    </div>
  );
}

function ColBid3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-bid">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">CURRENT BID</p>
      <p className="font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">600,000 ₵</p>
    </div>
  );
}

function ColTimer3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-timer">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">TIME LEFT</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[15px] text-white">05:00 MIN</p>
    </div>
  );
}

function ButtonTerminal3() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0" data-name="button-terminal">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] uppercase whitespace-nowrap">ENTER LOBBY</p>
    </div>
  );
}

function ColAction3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="col-action">
      <ButtonTerminal3 />
    </div>
  );
}

function LobbyRow3() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[24px] items-center p-[16px] relative shrink-0 w-full" data-name="lobby-row">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <ColItem3 />
      <ColSlots3 />
      <ColStatus3 />
      <ColBid3 />
      <ColTimer3 />
      <ColAction3 />
    </div>
  );
}

function ColItem4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-[320px]" data-name="col-item">
      <div className="relative rounded-[4px] shrink-0 size-[64px]" data-name="thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgThumb4} />
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-px overflow-hidden relative text-[14px] text-ellipsis text-white whitespace-nowrap">Militech Tactical Vest</p>
    </div>
  );
}

function PipsRow4() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="pips-row">
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
      <div className="bg-[#ffb000] border border-[rgba(212,175,55,0.25)] border-solid relative rounded-[1px] shrink-0 size-[8px]" data-name="Rectangle" />
    </div>
  );
}

function ColSlots4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[140px]" data-name="col-slots">
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">SLOTS: 6/6</p>
      <PipsRow4 />
    </div>
  );
}

function StatusBadge4() {
  return (
    <div className="bg-[rgba(42,42,42,0.31)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="status-badge">
      <div aria-hidden className="absolute border border-[#888] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[11px] whitespace-nowrap">COMPLETED</p>
    </div>
  );
}

function ColStatus4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[160px]" data-name="col-status">
      <StatusBadge4 />
    </div>
  );
}

function ColBid4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-bid">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">CURRENT BID</p>
      <p className="font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold relative shrink-0 text-[#ffb000] text-[15px]">240,000 ₵</p>
    </div>
  );
}

function ColTimer4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[180px] whitespace-nowrap" data-name="col-timer">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[11px]">TIME LEFT</p>
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold relative shrink-0 text-[15px] text-white">COMPLETED</p>
    </div>
  );
}

function ButtonTerminal4() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0" data-name="button-terminal">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] uppercase whitespace-nowrap">ENTER LOBBY</p>
    </div>
  );
}

function ColAction4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="col-action">
      <ButtonTerminal4 />
    </div>
  );
}

function LobbyRow4() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[24px] items-center p-[16px] relative shrink-0 w-full" data-name="lobby-row">
      <div aria-hidden className="absolute border-[#2a2a2a] border-b border-solid inset-0 pointer-events-none" />
      <ColItem4 />
      <ColSlots4 />
      <ColStatus4 />
      <ColBid4 />
      <ColTimer4 />
      <ColAction4 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="table-body">
      <LobbyRow />
      <LobbyRow1 />
      <LobbyRow2 />
      <LobbyRow3 />
      <LobbyRow4 />
    </div>
  );
}

function LobbiesTable() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="lobbies-table">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <TableHeader />
      <TableBody />
    </div>
  );
}

function LobbiesBody() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start p-[48px] relative shrink-0 w-full" data-name="lobbies-body">
      <TitleHeader />
      <TabsRow />
      <LobbiesTable />
    </div>
  );
}

export default function OpenLobbies() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative size-full" data-name="open-lobbies">
      <LobbiesBody />
    </div>
  );
}