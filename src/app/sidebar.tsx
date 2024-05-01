"use client";
import { Button } from "@/components/ui/button";
import { DatePicker, DatePickerWithRange } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMoneyTracker } from "@/hooks/useMoneyTracker";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

export const SettingsPanel = () => {
  return (
    <>
      <motion.section className=" bg-accent/10 ml-2 rounded-2xl p-4 overflow-y-auto relative flex flex-col gap-3 ">
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
  const [filteredData, setFilteredData] = useState(data);
  const dateRange = settings.filterDate;

  useEffect(() => {
    if (dateRange && dateRange.from && dateRange.to) {
      const { from, to } = dateRange;
      setFilteredData(
        data.filter((curr) => curr.date >= from && curr.date <= to)
      );
    } else {
      setFilteredData(data);
    }
  }, [data, settings.filterDate]);

  const totalExpenses = filteredData
    .filter((curr) => curr.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const highestExpense = filteredData
    .filter((curr) => curr.type === "expense")
    .reduce((acc, curr) => Math.max(acc, curr.amount), 0);
  const lowestExpense = filteredData
    .filter((curr) => curr.type === "expense")
    .reduce(
      (acc, curr) => (acc === 0 ? curr.amount : Math.min(acc, curr.amount)),
      0
    );
  const highestExpenseItem = filteredData.filter(
    (curr) => curr.type === "expense" && curr.amount === highestExpense
  );
  const lowestExpenseItem = filteredData.filter(
    (curr) => curr.type === "expense" && curr.amount === lowestExpense
  );

  const totalRevenue = filteredData
    .filter((curr) => curr.type === "revenue")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const highestRevenue = filteredData
    .filter((curr) => curr.type === "revenue")
    .reduce((acc, curr) => Math.max(acc, curr.amount), 0);
  const lowestRevenue = filteredData
    .filter((curr) => curr.type === "revenue")
    .reduce(
      (acc, curr) => (acc === 0 ? curr.amount : Math.min(acc, curr.amount)),
      0
    );
  const highestRevenueItem = filteredData.filter(
    (curr) => curr.type === "revenue" && curr.amount === highestRevenue
  );
  const lowestRevenueItem = filteredData.filter(
    (curr) => curr.type === "revenue" && curr.amount === lowestRevenue
  );
  return (
    <motion.section className="bg-accent/10 ml-2 rounded-2xl  p-2 overflow-y-auto relative flex flex-col gap-3 ">
      <h1 className="text-xl text-center font-semibold flex justify-center">
        Report&nbsp;
        {dateRange && dateRange.from && dateRange.to && (
          <div className="flex">
            For {format(dateRange?.from, "LLL dd, y")}
            <Dot />
            {format(dateRange?.to, "LLL dd, y")}
          </div>
        )}
      </h1>
      <Separator />
      <div className="flex flex-col justify-center h-full gap-3">
        <div className="border p-2 rounded-2xl flex flex-col gap-2">
          <p className="flex ">
            Total Expenses: {settings.currency_prefix}
            {totalExpenses.toLocaleString()}
          </p>
          <p className="flex ">
            Highest Expense: {settings.currency_prefix}
            {highestExpense.toLocaleString()} <Dot />
            {highestExpenseItem[0]?.title}
            <Dot />
            {highestExpenseItem[0]
              ? format(highestExpenseItem[0]?.date, "LLL dd, y")
              : "No Expense"}
          </p>
          <p className="flex ">
            Lowest Expense: {settings.currency_prefix}
            {lowestExpense.toLocaleString()}
            <Dot />
            {lowestExpenseItem[0]?.title}
            <Dot />
            {lowestExpenseItem[0]
              ? format(lowestExpenseItem[0]?.date, "LLL dd, y")
              : "No Expense"}
          </p>
        </div>

        <div className="border p-2 rounded-2xl flex flex-col gap-2">
          <p className="flex">
            Total Revenue: {settings.currency_prefix}
            {totalRevenue.toLocaleString()}
          </p>
          <p className="flex">
            Highest Revenue: {settings.currency_prefix}
            {highestRevenue.toLocaleString()} <Dot />
            {highestRevenueItem[0]?.title}
            <Dot />
            {highestExpenseItem[0]
              ? format(highestRevenueItem[0]?.date, "LLL dd, y")
              : "No Revenue"}
          </p>
          <p className="flex">
            Lowest Revenue: {settings.currency_prefix}
            {lowestRevenue.toLocaleString()}
            <Dot />
            {lowestRevenueItem[0]?.title}
            <Dot />
            {lowestRevenueItem[0]
              ? format(lowestRevenueItem[0]?.date, "LLL dd, y")
              : "No Revenue"}
          </p>
        </div>
      </div>
    </motion.section>
  );
};
export const Search = () => {
  const { search, setSearch } = useMoneyTracker();
  return (
    <div className="p-4 flex flex-col gap-3">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="rounded-md"
      />
    </div>
  );
};