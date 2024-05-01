"use client";
import { Button } from "@/components/ui/button";
import { DatePicker, DatePickerWithRange } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMoneyTracker } from "@/hooks/useMoneyTracker";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SettingsPanel = () => {
  return (
    <>
      <motion.section className="border-2 bg-secondary/10 ml-2 rounded-2xl  p-4 min-h-60 overflow-y-auto relative flex flex-col gap-3 ">
        <h1 className="text-xl text-center font-bold">Settings</h1>
        <Separator />
        <SettingsOptions />
      </motion.section>
    </>
  );
};

export const SettingsOptions = () => {
  const { settings, setCurrencyPrefix, setDateRange } = useMoneyTracker();

  return (
    <div className="flex flex-col gap-3">
      <label>
        <span className="ml-1 dark:text-foreground/50">Currency Prefix</span>
        <Input
          maxLength={4}
          value={settings.currency_prefix}
          onChange={(e) => setCurrencyPrefix(e.target.value)}
          className="w-full"
        />
      </label>
      <div>
        <span className="ml-1 dark:text-foreground/50">Filter Date</span>
        <div className="">
          <DatePickerWithRange
            onSelect={(dateRange) => setDateRange(dateRange)}
            onClear={() => setDateRange(undefined)}
            className={"w-full"}
          />
        </div>
      </div>
    </div>
  );
};

export const SummaryPanel = () => {
  const { data, settings } = useMoneyTracker();
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);
  const highest = data.reduce((acc, curr) => Math.max(acc, curr.amount), 0);
  const lowest = data.reduce(
    (acc, curr) => (acc === 0 ? curr.amount : Math.min(acc, curr.amount)),
    0
  );
  return (
    <motion.section className="border-2 bg-secondary/10 ml-2 rounded-2xl  p-4 min-h-60 overflow-y-auto relative flex flex-col gap-3 ">
      <h1 className="text-xl text-center font-bold">Report</h1>
      <Separator />
      <p>
        Total Expenses: {settings.currency_prefix}
        {total.toLocaleString()}
      </p>
      <p>
        Highest Expense: {settings.currency_prefix}
        {highest.toLocaleString()}
      </p>
      <p>
        Lowest Expense: {settings.currency_prefix}
        {lowest.toLocaleString()}
      </p>
    </motion.section>
  );
};
