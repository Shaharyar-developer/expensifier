import { MoneyTrackerPanel } from "./tracker";
import { Navbar } from "./navbar";
import { SettingsPanel, SummaryPanel } from "./sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="min-h-[90dvh] flex gap-4 p-4">
        <div className="grid grid-rows-2 gap-8 sticky w-[90%] max-h-[85dvh]">
          <SummaryPanel />
          <SettingsPanel />
        </div>
        <MoneyTrackerPanel />
      </main>
    </div>
  );
}
