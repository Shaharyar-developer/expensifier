"use client";
import { MoneyTrackerProviderContext } from "@/contexts/money-tracker";
import { MoneyTracker, Settings } from "@/types/costs";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export const MoneyTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>({ currency_prefix: "$" });
  const [data, setData] = useState<MoneyTracker[]>([
    {
      id: "1",
      title: "Groceries",
      description: "Bought some groceries",
      date: new Date(),
      amount: 100,
      category: "Food",
    },
    {
      id: "2",
      title: "Gas",
      description: "Filled up the tank",
      date: new Date(),
      amount: 50,
      category: "Travel",
    },
    {
      id: "3",
      title: "Utilities",
      description: "Paid the bills",
      date: new Date(),
      amount: 200,
      category: "Bills",
    },
    {
      id: "4",
      title: "Rent",
      description: "Paid the rent",
      date: new Date(),
      amount: 1000,
      category: "Housing",
    },
    {
      id: "5",
      title: "Internet",
      description: "Paid the internet bill",
      date: new Date(),
      amount: 50,
      category: "Bills",
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

  const addMoneyTracker = (MoneyTracker: MoneyTracker) => {
    window.localStorage.setItem(
      "MoneyTrackers",
      JSON.stringify([...data, MoneyTracker])
    );
    setData([...data, MoneyTracker]);
  };
  const removeMoneyTracker = (id: string) => {
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
    window.localStorage.setItem(
      "settings",
      JSON.stringify({ ...settings, dateRange })
    );
    setSettings({ ...settings, filterDate: dateRange });
  };
  return (
    <MoneyTrackerProviderContext.Provider
      value={{
        data,
        setData,
        addMoneyTracker,
        removeMoneyTracker,
        settings,
        setCurrencyPrefix,
        setDateRange,
      }}
    >
      {children}
    </MoneyTrackerProviderContext.Provider>
  );
};
