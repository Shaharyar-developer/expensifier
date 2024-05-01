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
import { MoneyTrackerItem, Settings } from "@/types/costs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Edit3, Trash } from "lucide-react";

export const MoneyTrackerPanel = () => {
  const { data, settings, search } = useMoneyTracker();
  const filteredData = data.filter((item) => {
    if (
      settings.filterDate &&
      settings.filterDate.from &&
      settings.filterDate.to
    ) {
      return (
        item.date.getTime() >= new Date(settings.filterDate.from).getTime() &&
        item.date.getTime() <= new Date(settings.filterDate.to).getTime()
      );
    }
    return true;
  });
  return (
    <motion.section className="p-2 relative w-full">
      <div className="bg-background rounded-2xl h-full w-full flex flex-col gap-3 p-4 border overflow-y-auto">
        {filteredData.map((item, idx) => (
          <MoneyTrackerCard
            filterRange={settings.filterDate}
            filter={search}
            key={idx + item.id}
            MoneyTrackerItem={item}
            prefix={settings.currency_prefix}
          />
        ))}
        {data.length != 0 ? null : (
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-neutral-400">
            Status Indicator for Empty State
          </span>
        )}
      </div>
    </motion.section>
  );
};

const MoneyTrackerCard = ({
  MoneyTrackerItem,
  prefix,
  filter,
  filterRange,
}: {
  MoneyTrackerItem: MoneyTrackerItem;
  prefix: string;
  filter: string | undefined;
  filterRange: DateRange | undefined;
}) => {
  if (
    filter &&
    !MoneyTrackerItem.title.toLowerCase().includes(filter.toLowerCase()) &&
    !MoneyTrackerItem.description
      .toLowerCase()
      .includes(filter.toLowerCase()) &&
    !MoneyTrackerItem.amount.toString().includes(filter.toLowerCase()) &&
    !MoneyTrackerItem.category.toLowerCase().includes(filter.toLowerCase())
  )
    return null;
  if (
    filterRange &&
    filterRange.from &&
    filterRange.to &&
    !(
      new Date(filterRange.from).getTime() <= MoneyTrackerItem.date.getTime() &&
      new Date(filterRange.to).getTime() >= MoneyTrackerItem.date.getTime()
    )
  )
    return null;

  return (
    <Card
      className={`${
        MoneyTrackerItem.type === "expense"
          ? "border-red-700/30"
          : "border-emerald-700/30"
      } relative backdrop-blur-0 border-2 border-dashed rounded-2xl`}
    >
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle className="capitalize">{MoneyTrackerItem.title}</CardTitle>
          <CardDescription>{MoneyTrackerItem.description}</CardDescription>
        </div>
        <CardDescription>
          {format(MoneyTrackerItem.date, "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between py-2">
        <div className="flex flex-col gap-4">
          <p className="text-foreground/70">
            {prefix}
            {MoneyTrackerItem.amount.toLocaleString()}
          </p>
          <Badge variant={"default"} className="text-sm flex justify-center">
            {MoneyTrackerItem.category}
          </Badge>
        </div>
        <div className="flex gap-3">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="dark:text-emerald-300 text-emerald-600"
          >
            <Edit3 strokeWidth={1.5} />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="dark:text-red-400 text-red-700"
          >
            <Trash strokeWidth={1.5} />
          </Button>
        </div>
      </CardContent>
      <div className="absolute top-0 left-0 h-full w-full bg-black/70 backdrop-blur-3xl rounded-2xl -z-10 " />
      <motion.div
        initial={{
          backgroundPosition: "100% 0%",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: "0% 100%",
          backgroundSize: "200% 200%",
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={`absolute top-0 left-0 h-full w-full  ${
          MoneyTrackerItem.type === "expense"
            ? "from-red-700/40 bg-gradient-to-r"
            : " from-emerald-700/40 bg-gradient-to-l"
        } rounded-2xl -z-20`}
      />
    </Card>
  );
};
