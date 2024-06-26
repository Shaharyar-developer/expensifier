import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Navbar = () => {
  return (
    <nav className="min-h-12 border-b sticky top-0 dark:bg-black/40 bg-white/40 z-50 backdrop-blur-xl flex md:flex-row justify-between items-center md:px-8 py-4 gap-2">
      <h1 className="lg:text-3xl font-bold tracking-wide text-clip bg-clip-text text-transparent bg-gradient-to-br dark:from-white from-black from-20% dark:via-neutral-400 via-neutral-600 via-70% dark:to-white to-black">
        EXPENSIFIER
      </h1>

      <div className="flex md:gap-4">
        <div className="flex">
          <Dialog>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-none rounded-l-2xl border-r"
                    variant={"default"}
                    size={"sm"}
                  >
                    <Plus /> Revenue
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>
                <span className="text-foreground/50">I Just Got Paid</span>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogTitle>Add Revenue</DialogTitle>
              <DialogDescription>
                <p>How much did you make?</p>
              </DialogDescription>
              <DialogFooter>
                <Button variant={"default"}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-none rounded-r-2xl"
                    variant={"default"}
                    size={"sm"}
                  >
                    <Plus /> Expense
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent>
                <span className="text-foreground/50">
                  I Have No Self Control
                </span>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogTitle>Add MoneyTracker</DialogTitle>
              <DialogDescription>
                <p>What did you spend your money on?</p>
              </DialogDescription>
              <DialogFooter>
                <Button variant={"default"}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};
