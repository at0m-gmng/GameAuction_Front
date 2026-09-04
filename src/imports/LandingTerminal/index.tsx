import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/auth";
import TriangleMeshBackground from "@/components/TriangleMeshBackground";
import imgAvatar from "./2737e4614601b8c4372249e7a0e7ee82af9b8606.png";

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
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] uppercase whitespace-nowrap">CATALOG</p>
      <div className="bg-[#ffb000] h-[2px] relative shrink-0 w-[24px]" data-name="active-indicator" />
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
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#888] text-[12px] uppercase whitespace-nowrap">PROFILE</p>
    </div>
  );
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

function CreditDisplay() {
  return (
    <div className="bg-black content-stretch flex gap-[8px] items-start px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="credit-display">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#888] text-[11px] uppercase whitespace-nowrap">{`BAL //`}</p>
      <p className="[word-break:break-word] font-['Geist_Mono:Bold','Noto_Sans:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffb000] text-[13px] whitespace-nowrap">842,500 ₵</p>
    </div>
  );
}

function AvatarContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="avatar-container">
      <div className="pointer-events-none relative rounded-[4px] shrink-0 size-[32px]" data-name="avatar">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgAvatar} />
        <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 rounded-[4px]" />
      </div>
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#e0e0e0] text-[12px] whitespace-nowrap">OPERATOR_X</p>
    </div>
  );
}

function UserStatus() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="user-status">
      <CreditDisplay />
      <AvatarContainer />
    </div>
  );
}

function TopNav() {
  const auth = useAuth();
  return (
    <div className="bg-[#121212] content-stretch flex h-[80px] items-center justify-between px-[48px] relative shrink-0 w-full" data-name="top-nav">
      <div aria-hidden className="absolute border-[#ffb000] border-b border-solid inset-0 pointer-events-none" />
      <Logo />
      {auth.token && <UserStatus />}
    </div>
  );
}

function TerminalHeader() {
  const auth = useAuth();
  const isLoggedIn = Boolean(auth.token);
  const statusWord = isLoggedIn ? "ACTIVE" : "STANDBY";
  const statusWordColor = isLoggedIn ? "#ffb000" : "#666";
  const [locLabel, setLocLabel] = useState("SEC_GRID_7");

  useEffect(() => {
    let cancelled = false;
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data: { success?: boolean; city?: string }) => {
        if (cancelled || !data.success || !data.city) return;
        setLocLabel(data.city.toUpperCase().replace(/\s+/g, "_"));
      })
      .catch(() => {
        // Keep the SEC_GRID_7 fallback — this is decorative, not critical.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="terminal-header">
      <p
        className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] whitespace-nowrap"
      >
        [SYS_STATUS: <span style={{ color: statusWordColor }}>{statusWord}</span>]
      </p>
      <div
        className="nx-status-pulse bg-[#ffb000] relative shrink-0 size-[4px]"
        style={{ color: "#ffb000" }}
        data-name="Rectangle"
      />
      <p className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#ffb000] text-[12px] whitespace-nowrap">{`LOC // ${locLabel}`}</p>
    </div>
  );
}

function GlowAccentLine() {
  return <div className="bg-[#ffb000] h-[2px] relative shrink-0 w-[480px]" data-name="glow-accent-line" />;
}

function HeroTextBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[800px]" data-name="hero-text-block">
      <p className="[word-break:break-word] font-['Unbounded:Black',sans-serif] font-black leading-[1.05] min-w-full relative shrink-0 text-[#ffb000] text-[72px] text-center w-[min-content]">NEXUS EXCHANGE</p>
      <GlowAccentLine />
      <p className="[word-break:break-word] font-['Unbounded:SemiBold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[#e0e0e0] text-[16px] text-center w-[min-content]">ENTER THE GRID. BID. CONQUER.</p>
    </div>
  );
}

function ButtonTerminal({ label }: { label: string }) {
  return (
    <div className="bg-[#ffb000] content-stretch flex items-center justify-center px-[28px] py-[14px] relative shrink-0" data-name="button-terminal">
      <div aria-hidden className="absolute border border-[#ffb000] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0a0a0a] text-[12px] uppercase whitespace-nowrap">{label}</p>
    </div>
  );
}

function CtaBlock() {
  const auth = useAuth();
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0" data-name="cta-block">
      {auth.token ? <ButtonTerminal label="BROWSE CATALOG" /> : <ButtonTerminal label="LOGIN / REGISTER" />}
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

const SYSTEM_LOG_LINES: { text: string; color: string }[] = [
  { text: ">> CONNECTING TO MATRIX DEPLOYMENT SITE...", color: "#ffb000" },
  { text: ">> HANDSHAKE COMPLETED. 48 LOBBIES ACTIVE.", color: "#e0e0e0" },
  { text: ">> ENCRYPTION SCHEME: DEUS-EX-CHIPHER-7000", color: "#888" },
  { text: ">> AUTHENTICATING NODE... OK", color: "#e0e0e0" },
  { text: ">> SYNCING PRICE FEED WITH GLOBAL MARKET", color: "#888" },
  { text: ">> LOADING ITEM REGISTRY: 12,480 ENTRIES", color: "#e0e0e0" },
  { text: ">> SCANNING FOR ACTIVE BIDDERS...", color: "#888" },
  { text: ">> FIREWALL STATUS: NOMINAL", color: "#ffb000" },
  { text: ">> LATENCY: 12MS // UPLINK STABLE", color: "#e0e0e0" },
  { text: ">> WELCOME, OPERATOR. THE GRID AWAITS.", color: "#ffb000" },
];

const LOG_LINE_DURATION_MS = 1000;
const LOG_VISIBLE_LINES = 3;

function SystemLogs() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex >= SYSTEM_LOG_LINES.length) return;

    const fullText = SYSTEM_LOG_LINES[lineIndex].text;
    const tickMs = LOG_LINE_DURATION_MS / fullText.length;

    if (charCount >= fullText.length) {
      const next = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharCount(0);
      }, tickMs);
      return () => clearTimeout(next);
    }

    const tick = setTimeout(() => setCharCount((c) => c + 1), tickMs);
    return () => clearTimeout(tick);
  }, [lineIndex, charCount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lineIndex, charCount]);

  const completedLines = SYSTEM_LOG_LINES.slice(0, lineIndex);
  const typingLine = SYSTEM_LOG_LINES[lineIndex];

  return (
    <div className="bg-[#121212] content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[600px]" data-name="system-logs">
      <div aria-hidden className="absolute border border-[rgba(212,175,55,0.25)] border-solid inset-0 pointer-events-none" />
      <HudCorner />
      <HudCorner1 />
      <HudCorner2 />
      <HudCorner3 />
      <div
        ref={scrollRef}
        className="flex flex-col gap-[8px] w-full overflow-y-hidden"
        style={{ maxHeight: `${LOG_VISIBLE_LINES * 21}px` }}
      >
        {completedLines.map((line, i) => (
          <p
            key={i}
            className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] min-w-full shrink-0 text-[11px] w-[min-content]"
            style={{ color: line.color }}
          >
            {line.text}
          </p>
        ))}
        {typingLine && (
          <p
            className="[word-break:break-word] font-['Geist_Mono:Regular',sans-serif] font-normal leading-[normal] min-w-full shrink-0 text-[11px] w-[min-content]"
            style={{ color: typingLine.color }}
          >
            {typingLine.text.slice(0, charCount)}
            <span className="nx-log-cursor">▍</span>
          </p>
        )}
      </div>
    </div>
  );
}

function TerminalBody() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center justify-center min-h-[820px] px-[48px] py-[120px] relative shrink-0 w-full" data-name="terminal-body">
      <div aria-hidden className="absolute bg-[#0a0a0a] inset-0 pointer-events-none">
        <TriangleMeshBackground />
      </div>
      <TerminalHeader />
      <HeroTextBlock />
      <CtaBlock />
      <SystemLogs />
    </div>
  );
}

export default function LandingTerminal() {
  return (
    <div className="bg-[#0a0a0a] content-stretch flex flex-col items-start relative size-full" data-name="landing-terminal">
      <TopNav />
      <TerminalBody />
    </div>
  );
}