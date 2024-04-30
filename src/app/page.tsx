import { ExpensePanel } from "./expenses";
import { Navbar } from "./navbar";
import { SettingsPanel, SummaryPanel } from "./sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className=" min-h-[90dvh] grid grid-cols-[0.9fr_1.1fr] gap-4 p-4">
        <div className="grid grid-rows-2 gap-8">
          <SummaryPanel />
          <SettingsPanel />
        </div>
        <ExpensePanel />
      </main>
    </div>
  );
}
