"use client";
import { MoneyTrackerProviderContext } from "@/contexts/money-tracker";
import { MoneyTrackerItem, Settings } from "@/types/costs";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export const MoneyTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>({ currency_prefix: "$" });
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<MoneyTrackerItem[]>([
    {
      id: "1",
      title: "Groceries",
      description: "Bought some groceries",
      date: new Date(),
      amount: 100,
      category: "Food",
      type: "expense",
    },
    {
      id: "2",
      title: "Gas",
      description: "Filled up the tank",
      date: new Date(),
      amount: 50,
      category: "Travel",
      type: "expense",
    },
    {
      id: "3",
      title: "Paycheck",
      description: "Received paycheck",
      date: new Date(),
      amount: 2000,
      category: "Salary",
      type: "revenue",
    },
    {
      id: "4",
      title: "Rent",
      description: "Paid the rent",
      date: new Date(),
      amount: 1000,
      category: "Housing",
      type: "expense",
    },
    {
      id: "5",
      title: "Internet",
      description: "Paid the internet bill",
      date: new Date(),
      amount: 50,
      category: "Bills",
      type: "expense",
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const MoneyTrackers = window.localStorage.getItem("MoneyTrackers");
      if (MoneyTrackers) {
        setData(JSON.parse(MoneyTrackers));
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const settings = window.localStorage.getItem("settings");
      if (settings) {
        setSettings(JSON.parse(settings));
      }
    }
  }, []);

  const addMoneyTrackerItem = (MoneyTracker: MoneyTrackerItem) => {
    window.localStorage.setItem(
      "MoneyTrackers",
      JSON.stringify([...data, MoneyTracker])
    );
    setData([...data, MoneyTracker]);
  };
  const removeMoneyTrackerItem = (id: string) => {
    const updatedMoneyTrackers = data.filter(
      (MoneyTracker) => MoneyTracker.id !== id
    );
    window.localStorage.setItem(
      "MoneyTrackers",
      JSON.stringify(updatedMoneyTrackers)
    );
    setData(updatedMoneyTrackers);
  };
  const setCurrencyPrefix = (prefix: string) => {
    window.localStorage.setItem(
      "settings",
      JSON.stringify({ currency_prefix: prefix })
    );
    setSettings({ currency_prefix: prefix });
  };
  const setDateRange = (dateRange: DateRange | undefined) => {
    setSettings({ ...settings, filterDate: dateRange });
  };
  return (
    <MoneyTrackerProviderContext.Provider
      value={{
        data,
        setData,
        addMoneyTrackerItem,
        removeMoneyTrackerItem,
        settings,
        setCurrencyPrefix,
        setDateRange,
        search,
        setSearch,
      }}
    >
      {children}
    </MoneyTrackerProviderContext.Provider>
  );
};
