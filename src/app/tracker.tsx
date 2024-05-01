"use client";
import { useMoneyTracker } from "@/hooks/useMoneyTracker";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MoneyTracker, Settings } from "@/types/costs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const MoneyTrackerPanel = () => {
  const { data, settings } = useMoneyTracker();
  const [filter, setFilter] = useState<string>();
  return (
    <motion.section className="rounded-2xl p-0.5 relative w-full">
      <div className="bg-background rounded-2xl h-full w-full flex flex-col gap-3 p-4 border-2 max-h-[85dvh] overflow-y-auto">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          className="rounded-md"
        />
        {data.map((MoneyTracker, idx) => (
          <MoneyTrackerCard
            filterRange={settings.filterDate}
            filter={filter}
            key={idx + MoneyTracker.id}
            MoneyTracker={MoneyTracker}
            prefix={settings.currency_prefix}
          />
        ))}
        {data.length != 0 ? null : (
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-neutral-400">
            Status Indicator for Empty State
          </span>
        )}
      </div>
      {/* <motion.div
        initial={{
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
        }}
        animate={{
          backgroundSize: "200% 200%",
          backgroundPosition: "200% 100%",
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r  from-background dark:via-white/50 via-black to-background/70   -z-10 !overflow-hidden rounded-2xl"
      /> */}
    </motion.section>
  );
};

const MoneyTrackerCard = ({
  MoneyTracker,
  prefix,
  filter,
  filterRange,
}: {
  MoneyTracker: MoneyTracker;
  prefix: string;
  filter: string | undefined;
  filterRange: DateRange | undefined;
}) => {
  if (
    filter &&
    !MoneyTracker.title.toLowerCase().includes(filter.toLowerCase()) &&
    !MoneyTracker.description.toLowerCase().includes(filter.toLowerCase()) &&
    !MoneyTracker.amount.toString().includes(filter.toLowerCase()) &&
    !MoneyTracker.category.toLowerCase().includes(filter.toLowerCase())
  )
    return null;
  if (
    filterRange &&
    filterRange.from &&
    filterRange.to &&
    !(
      filterRange.from.getTime() <= MoneyTracker.date.getTime() &&
      filterRange.to.getTime() >= MoneyTracker.date.getTime()
    )
  )
    return null;

  return (
    <Card className="">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle className="capitalize">{MoneyTracker.title}</CardTitle>
          <CardDescription>{MoneyTracker.description}</CardDescription>
        </div>
        <CardDescription>{format(MoneyTracker.date, "PPP")}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="text-foreground/50">
          {prefix}
          {MoneyTracker.amount}
        </p>
        <Badge variant={"default"} className="text-sm">
          {MoneyTracker.category}
        </Badge>
      </CardContent>
    </Card>
  );
};
