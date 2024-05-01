import { MoneyTrackerPanel } from "./tracker";
import { Navbar } from "./navbar";
import { Search, SettingsPanel, SummaryPanel } from "./sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="min-h-[80dvh] flex gap-4">
        <div className="flex flex-col gap-8 border m-1 sticky top-20 w-[90%]  h-max rounded-2xl">
          <Search />
          <SettingsPanel />
          <SummaryPanel />
        </div>
        <MoneyTrackerPanel />
      </main>
    </div>
  );
}
