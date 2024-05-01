"use client";
import { MoneyTrackerItem, Settings } from "@/types/costs";
import React from "react";
import { DateRange } from "react-day-picker";

export type MoneyTrackerProviderProps = {
  data: MoneyTrackerItem[];
  setData: React.Dispatch<React.SetStateAction<MoneyTrackerItem[]>>;
  addMoneyTrackerItem: (MoneyTracker: MoneyTrackerItem) => void;
  removeMoneyTrackerItem: (id: string) => void;
  settings: Settings;
  setCurrencyPrefix: (prefix: string) => void;
  setDateRange: (dateRange: DateRange | undefined) => void;
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const MoneyTrackerProviderContext =
  React.createContext<MoneyTrackerProviderProps | null>(null);


