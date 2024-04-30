"use client";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useExpense } from "@/hooks/useExpenses";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SettingsPanel = () => {
  const [active, setActive] = useState<boolean | null>();
  useEffect(() => {
    if (typeof window == "undefined") return;
    const sideBar = window.localStorage.getItem("sideBar");
    if (sideBar) {
      setActive(JSON.parse(sideBar).active);
    } else {
      setActive(true);
    }
  }, []);

  return (
    <>
      <motion.section className="border bg-secondary/10 ml-2 rounded-2xl  p-4 min-h-60 overflow-y-auto relative flex flex-col gap-3 ">
        <h1 className="text-xl text-center font-bold">Settings</h1>
        <Separator />

        <SettingsOptions />
      </motion.section>
    </>
  );
};

export const SettingsOptions = () => {
  const { settings, setCurrencyPrefix } = useExpense();

  return (
    <div>
      <label>
        <span className="ml-1 text-foreground/50">Currency Prefix</span>
        <Input
          value={settings.currency_prefix}
          onChange={(e) => setCurrencyPrefix(e.target.value)}
          className="w-full"
        />
      </label>
    </div>
  );
};

export const SummaryPanel = () => {
  const { data, settings } = useExpense();
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <motion.section className="border bg-secondary/10 ml-2 rounded-2xl  p-4 min-h-60 overflow-y-auto relative flex flex-col gap-3 ">
      <h1 className="text-xl text-center font-bold">Report</h1>
      <Separator />
      <p>
        Total Expenses: {settings.currency_prefix}
        {total.toLocaleString()}
      </p>
    </motion.section>
  );
};
