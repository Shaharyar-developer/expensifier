import { ExpensePanel } from "./expenses";
import { Navbar } from "./navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 h-full flex justify-center items-center">
        <ExpensePanel />
      </main>
    </div>
  );
}
