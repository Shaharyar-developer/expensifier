import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  return (
    <nav className="min-h-12 border-b sticky top-0 dark:bg-black/5 bg-white/5  backdrop-blur-xl flex justify-between items-center px-8 py-4">
      <h1 className="text-3xl font-bold tracking-wide text-clip bg-clip-text text-transparent bg-gradient-to-br dark:from-white from-black from-20% dark:via-neutral-400 via-neutral-600 via-70% dark:to-white to-black">
        EXPENSIFIER
      </h1>
      <Button variant={"outline"} size={"lg"} className="font-normal">
        Generate Report
      </Button>
      <div className="flex gap-4">
        <div className="flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-none rounded-l-2xl border-r"
                variant={"default"}
              >
                <Plus /> Revenue
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-foreground/50">I Just Got Paid</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-none rounded-r-2xl"
                variant={"default"}
              >
                <Plus /> Expense
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-foreground/50">I Have No Self Control</span>
            </TooltipContent>
          </Tooltip>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};
