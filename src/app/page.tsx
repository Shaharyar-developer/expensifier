import { MoneyTrackerPanel } from "./tracker";
import { Navbar } from "./navbar";
import { Search, SettingsPanel, SummaryPanel } from "./sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="min-h-[80dvh] flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 border m-1 sticky top-20 w-[95%] mx-auto  h-max rounded-2xl">
          <Search />
          <SettingsPanel />
          <div className="hidden md:block">
            <SummaryPanel />
          </div>
        </div>
        <MoneyTrackerPanel />
      </main>
    </div>
  );
}
