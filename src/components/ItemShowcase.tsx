import imgItemPlaceholder from "./item-showcase-placeholder.png";

export type ShowcaseTone = "positive" | "muted";

interface ToneStyle {
  glowColor: string;
  doubleGlow: boolean;
  frameBorder: string;
  badgeBackground: string;
  badgeBorder: string;
  badgeColor: string;
  headingColor: string;
  dimmed: boolean;
}

const TONE_STYLES: Record<ShowcaseTone, ToneStyle> = {
  positive: {
    glowColor: "#ffb000",
    doubleGlow: true,
    frameBorder: "#d4af37",
    badgeBackground: "rgba(255,176,0,0.13)",
    badgeBorder: "#ffb000",
    badgeColor: "#ffb000",
    headingColor: "#ffb000",
    dimmed: false,
  },
  muted: {
    glowColor: "#8a0f0f",
    doubleGlow: false,
    frameBorder: "#2a2a2a",
    badgeBackground: "rgba(138,15,15,0.19)",
    badgeBorder: "#8a0f0f",
    badgeColor: "#f33",
    headingColor: "#888",
    dimmed: true,
  },
};

/**
 * Витрина предмета (свечение, рамка, рарити-бейдж, название) — общий блок,
 * переиспользуемый экраном результата аукциона и экраном выставления на продажу.
 */
export function ItemShowcase({
  tone,
  itemName,
  itemImageUrl,
  badgeLabel,
  subheading,
}: {
  tone: ShowcaseTone;
  itemName: string;
  itemImageUrl: string | null;
  badgeLabel: string;
  subheading?: { text: string; color: string };
}) {
  const s = TONE_STYLES[tone];

  return (
    <>
      <div
        className="content-stretch flex flex-col h-[320px] items-center justify-center relative shrink-0 w-[680px]"
        style={s.dimmed ? { opacity: 0.6 } : undefined}
        data-name="result-showcase"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: s.doubleGlow ? 480 : 450,
            height: s.doubleGlow ? 480 : 450,
            background: `radial-gradient(circle, ${s.glowColor}33 0%, transparent 70%)`,
          }}
        />
        {s.doubleGlow && (
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 rounded-full"
            style={{ width: 400, height: 400, background: `radial-gradient(circle, ${s.glowColor}22 0%, transparent 70%)` }}
          />
        )}
        <div
          className="bg-[#121212] border-solid content-stretch flex h-[200px] items-center justify-center p-[12px] relative rounded-[4px] shrink-0 w-[260px]"
          style={{ borderWidth: 1, borderColor: s.frameBorder }}
          data-name="result-item-frame"
        >
          <div className="flex-[1_0_0] h-full min-w-px relative" style={s.dimmed ? { opacity: 0.3 } : undefined}>
            <img
              alt={itemName}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={itemImageUrl ?? imgItemPlaceholder}
            />
          </div>
        </div>
      </div>

      <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-[800px]" data-name="result-header">
        <div
          className="content-stretch flex items-start px-[12px] py-[4px] relative rounded-[2px] shrink-0 border-solid"
          style={{ background: s.badgeBackground, borderWidth: 1, borderColor: s.badgeBorder }}
          data-name="rarity-badge"
        >
          <p
            className="[word-break:break-word] font-['Geist_Mono:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[12px] uppercase whitespace-nowrap"
            style={{ color: s.badgeColor }}
          >
            {badgeLabel}
          </p>
        </div>
        <p
          className="[word-break:break-word] font-['Unbounded:Black',sans-serif] font-black leading-[normal] min-w-full relative shrink-0 text-[40px] text-center w-[min-content]"
          style={{ color: s.headingColor }}
        >
          {itemName.toUpperCase()}
        </p>
        {subheading && (
          <p
            className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] min-w-full relative shrink-0 text-[20px] text-center w-[min-content]"
            style={{ color: subheading.color }}
          >
            {subheading.text}
          </p>
        )}
      </div>
    </>
  );
}
