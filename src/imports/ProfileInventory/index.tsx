import imgAvatar from "./2737e4614601b8c4372249e7a0e7ee82af9b8606.png";
import imgItemThumb from "./ab63c4449a5f71f870f6dc70653f918e549f30af.png";
import imgItemThumb1 from "./73513a2b072469961baf7a661f88e955fb066408.png";
import imgItemThumb2 from "./8ef904f465f6741a1c054ae3f10b42320d46049b.png";
import imgHistoryThumb from "./16f854ba5653d2677ff12511e9722692957cf225.png";

function Logo() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="logo">
      <div className="bg-[#ffb000] border border-[#d4af37] border-solid relative rounded-[2px] shrink-0 size-[24px]" data-name="logo-icon" />
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[16px] whitespace-nowrap">NEXUS EXCHANGE</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[12px] uppercase whitespace-nowrap">CATALOG</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[12px] uppercase whitespace-nowrap">LOBBIES</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] uppercase whitespace-nowrap">PROFILE</p>
      <div className="bg-[#ffb000] h-[2px] relative shrink-0 w-[24px]" data-name="active-indicator" />
    </div>
  );
}

interface ProfileData {
  nickname: string;
  balanceLabel: string;
  memberSinceLabel: string;
}

function NavLinks() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0" data-name="nav-links">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function CreditDisplay({ balanceLabel }: { balanceLabel: string }) {
  return (
    <div className="bg-black content-stretch flex gap-[8px] items-start px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="credit-display">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] uppercase whitespace-nowrap">{`BAL //`}</p>
      <p className="[word-break:break-word] font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[13px] whitespace-nowrap">{balanceLabel}</p>
    </div>
  );
}

function AvatarContainer({ nickname }: { nickname: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="avatar-container">
      <div className="pointer-events-none relative rounded-[4px] shrink-0 size-[32px]" data-name="avatar">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgAvatar} />
        <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 rounded-[4px]" />
      </div>
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#e0e0e0] text-[12px] whitespace-nowrap">{nickname}</p>
    </div>
  );
}

function UserStatus({ data }: { data: ProfileData }) {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="user-status">
      <CreditDisplay balanceLabel={data.balanceLabel} />
      <AvatarContainer nickname={data.nickname} />
    </div>
  );
}

function TopNav({ data }: { data: ProfileData }) {
  return (
    <div className="bg-[#121212] content-stretch flex h-[80px] items-center justify-between px-[48px] relative shrink-0 w-full" data-name="top-nav">
      <div aria-hidden className="absolute border-[#ffb000] border-b border-solid inset-0 pointer-events-none" />
      <Logo />
      <NavLinks />
      <UserStatus data={data} />
    </div>
  );
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

function Stat() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="stat">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">TOTAL WINS</p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#ffb000] text-[24px]">14</p>
    </div>
  );
}

function Stat1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="stat">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">TOTAL LOSSES</p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#e0e0e0] text-[24px]">8</p>
    </div>
  );
}

function Stat2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="stat">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">WIN RATE</p>
      <p className="font-['Geist_Mono:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#ffb000] text-[24px]">63.6 %</p>
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

function OperatorDetails({ data }: { data: ProfileData }) {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="operator-details">
      <AvatarHexFrame />
      <IdentityBlock data={data} />
      <StatBlockContainer />
    </div>
  );
}

function ProfileSummary({ data }: { data: ProfileData }) {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col gap-[24px] items-start p-[32px] relative shrink-0 w-full" data-name="profile-summary">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none" />
      <HudCorner />
      <HudCorner1 />
      <HudCorner2 />
      <HudCorner3 />
      <OperatorDetails data={data} />
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

function FilterHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="filter-header">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[16px] whitespace-nowrap">EQUIPPED SALVAGE (5 ITEMS)</p>
      <SortingTabs />
    </div>
  );
}

function HudCorner4() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-l-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner5() {
  return (
    <div className="absolute content-stretch flex items-start overflow-clip right-0 size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-r-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner6() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start left-0 overflow-clip size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-l-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner7() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start overflow-clip right-0 size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-r-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function RarityBadge() {
  return (
    <div className="bg-[rgba(255,176,0,0.08)] content-stretch flex items-start px-[6px] py-[2px] relative rounded-[2px] shrink-0" data-name="rarity-badge">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[9px] whitespace-nowrap">LEGENDARY</p>
    </div>
  );
}

function MetaMarket() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-normal items-start justify-between leading-[normal] relative shrink-0 text-[10px] w-full whitespace-nowrap" data-name="meta-market">
      <p className="flex-[1_0_0] font-['Geist_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#888] text-ellipsis">{`VAL // 250k ₵`}</p>
      <p className="flex-[1_0_0] font-['Geist_Mono:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#ffb000] text-ellipsis">{`ACQUIRED // 01.12`}</p>
    </div>
  );
}

function ItemDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="item-details">
      <RarityBadge />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-full overflow-hidden relative shrink-0 text-[13px] text-ellipsis text-white w-[min-content] whitespace-nowrap">Satori Neural Link</p>
      <MetaMarket />
    </div>
  );
}

function ItemCard() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col gap-[12px] items-start p-[12px] relative shrink-0 w-[76px]" data-name="item-card">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <HudCorner4 />
      <HudCorner5 />
      <HudCorner6 />
      <HudCorner7 />
      <div className="h-[140px] relative shrink-0 w-full" data-name="item-thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgItemThumb} />
      </div>
      <ItemDetails />
    </div>
  );
}

function HudCorner8() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-l-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner9() {
  return (
    <div className="absolute content-stretch flex items-start overflow-clip right-0 size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-r-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner10() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start left-0 overflow-clip size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-l-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner11() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start overflow-clip right-0 size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-r-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function RarityBadge1() {
  return (
    <div className="bg-[rgba(168,85,247,0.08)] content-stretch flex items-start px-[6px] py-[2px] relative rounded-[2px] shrink-0" data-name="rarity-badge">
      <div aria-hidden className="absolute border border-[#a855f7] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#a855f7] text-[9px] whitespace-nowrap">EPIC</p>
    </div>
  );
}

function MetaMarket1() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-normal items-start justify-between leading-[normal] relative shrink-0 text-[10px] w-full whitespace-nowrap" data-name="meta-market">
      <p className="flex-[1_0_0] font-['Geist_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#888] text-ellipsis">{`VAL // 95k ₵`}</p>
      <p className="flex-[1_0_0] font-['Geist_Mono:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#ffb000] text-ellipsis">{`ACQUIRED // 12.28`}</p>
    </div>
  );
}

function ItemDetails1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="item-details">
      <RarityBadge1 />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-full overflow-hidden relative shrink-0 text-[13px] text-ellipsis text-white w-[min-content] whitespace-nowrap">Arasaka Oni Mask</p>
      <MetaMarket1 />
    </div>
  );
}

function ItemCard1() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col gap-[12px] items-start p-[12px] relative shrink-0 w-[76px]" data-name="item-card">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <HudCorner8 />
      <HudCorner9 />
      <HudCorner10 />
      <HudCorner11 />
      <div className="h-[140px] relative shrink-0 w-full" data-name="item-thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgItemThumb1} />
      </div>
      <ItemDetails1 />
    </div>
  );
}

function HudCorner12() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-l-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner13() {
  return (
    <div className="absolute content-stretch flex items-start overflow-clip right-0 size-[12px] top-0" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-r-2 border-solid border-t-2 relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner14() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start left-0 overflow-clip size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-l-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function HudCorner15() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-start overflow-clip right-0 size-[12px]" data-name="hud-corner">
      <div className="bg-[rgba(0,0,0,0)] border-[#2a2a2a] border-b-2 border-r-2 border-solid relative shrink-0 size-[12px]" data-name="Rectangle" />
    </div>
  );
}

function RarityBadge2() {
  return (
    <div className="bg-[rgba(255,176,0,0.08)] content-stretch flex items-start px-[6px] py-[2px] relative rounded-[2px] shrink-0" data-name="rarity-badge">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[9px] whitespace-nowrap">LEGENDARY</p>
    </div>
  );
}

function MetaMarket2() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-normal items-start justify-between leading-[normal] relative shrink-0 text-[10px] w-full whitespace-nowrap" data-name="meta-market">
      <p className="flex-[1_0_0] font-['Geist_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#888] text-ellipsis">{`VAL // 600k ₵`}</p>
      <p className="flex-[1_0_0] font-['Geist_Mono:Regular',sans-serif] h-[13px] min-w-px overflow-hidden relative text-[#ffb000] text-ellipsis">{`ACQUIRED // 12.15`}</p>
    </div>
  );
}

function ItemDetails2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="item-details">
      <RarityBadge2 />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] min-w-full overflow-hidden relative shrink-0 text-[13px] text-ellipsis text-white w-[min-content] whitespace-nowrap">{`Cyberdeck 'Deus-X'`}</p>
      <MetaMarket2 />
    </div>
  );
}

function ItemCard2() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col gap-[12px] items-start p-[12px] relative shrink-0 w-[76px]" data-name="item-card">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <HudCorner12 />
      <HudCorner13 />
      <HudCorner14 />
      <HudCorner15 />
      <div className="h-[140px] relative shrink-0 w-full" data-name="item-thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgItemThumb2} />
      </div>
      <ItemDetails2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start relative shrink-0 w-full" data-name="Frame">
      <ItemCard />
      <ItemCard1 />
      <ItemCard2 />
    </div>
  );
}

function InventoryColumn() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="inventory-column">
      <FilterHeader />
      <Frame5 />
    </div>
  );
}

function HistoryDetails() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative whitespace-nowrap" data-name="history-details">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold relative shrink-0 text-[11px] text-white">Satori Neural Link</p>
      <p className="font-['Geist_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">BID: 250,000 ₵</p>
    </div>
  );
}

function OutcomeBadge() {
  return (
    <div className="bg-[rgba(255,176,0,0.08)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="outcome-badge">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[10px] whitespace-nowrap">WON</p>
    </div>
  );
}

function HistoryRow() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[12px] items-center p-[16px] relative shrink-0 w-full" data-name="history-row">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <div className="relative rounded-[2px] shrink-0 size-[40px]" data-name="history-thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgItemThumb} />
      </div>
      <HistoryDetails />
      <OutcomeBadge />
    </div>
  );
}

function HistoryDetails1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative whitespace-nowrap" data-name="history-details">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold relative shrink-0 text-[11px] text-white">Kang Tao EMP Cannon</p>
      <p className="font-['Geist_Mono:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal relative shrink-0 text-[#888] text-[10px]">LOST AT: 185,000 ₵</p>
    </div>
  );
}

function OutcomeBadge1() {
  return (
    <div className="bg-[rgba(138,15,15,0.19)] content-stretch flex items-start px-[10px] py-[4px] relative rounded-[2px] shrink-0" data-name="outcome-badge">
      <div aria-hidden className="absolute border border-[#8a0f0f] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#f33] text-[10px] whitespace-nowrap">LOST</p>
    </div>
  );
}

function HistoryRow1() {
  return (
    <div className="bg-[#121212] content-stretch flex gap-[12px] items-center p-[16px] relative shrink-0 w-full" data-name="history-row">
      <div aria-hidden className="absolute border border-[#2a2a2a] border-solid inset-0 pointer-events-none" />
      <div className="relative rounded-[2px] shrink-0 size-[40px]" data-name="history-thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[2px] size-full" src={imgHistoryThumb} />
      </div>
      <HistoryDetails1 />
      <OutcomeBadge1 />
    </div>
  );
}

function HistoryList() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="history-list">
      <HistoryRow />
      <HistoryRow1 />
    </div>
  );
}

function HistoryColumn() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[420px]" data-name="history-column">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#ffb000] text-[16px] whitespace-nowrap">AUCTION HISTORY</p>
      <HistoryList />
    </div>
  );
}

function SplitLayoutRow() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="split-layout-row">
      <InventoryColumn />
      <HistoryColumn />
    </div>
  );
}

function ProfileBody({ data }: { data: ProfileData }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start p-[48px] relative shrink-0 w-full" data-name="profile-body">
      <ProfileSummary data={data} />
      <SplitLayoutRow />
    </div>
  );
}

const DEFAULT_PROFILE_DATA: ProfileData = {
  nickname: "OPERATOR_X",
  balanceLabel: "842,500 ₵",
  memberSinceLabel: "MEMBER SINCE // DEC_2025",
};

export default function ProfileInventory({ data = DEFAULT_PROFILE_DATA }: { data?: ProfileData }) {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative size-full" data-name="profile-inventory">
      <TopNav data={data} />
      <ProfileBody data={data} />
    </div>
  );
}