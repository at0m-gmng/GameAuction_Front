import { SharedTopNav } from "@/components/SharedTopNav";
import OpenLobbies from "@/imports/OpenLobbies/index";
import type { Page } from "@/lib/navigation";

// NOTE: "ENTER LOBBY" cards are static Figma-imported content — no lobby
// backend is wired in yet, so clicking one intentionally does nothing.
export function InteractiveLobbies({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="lobbies" onNavigate={onNavigate} />
      <OpenLobbies />
    </div>
  );
}
