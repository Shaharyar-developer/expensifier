"use client";
import { MoneyTracker, Settings } from "@/types/costs";
import React from "react";
import { DateRange } from "react-day-picker";

export type MoneyTrackerProviderProps = {
  data: MoneyTracker[];
  setData: React.Dispatch<React.SetStateAction<MoneyTracker[]>>;
  addMoneyTracker: (MoneyTracker: MoneyTracker) => void;
  removeMoneyTracker: (id: string) => void;
  settings: Settings;
  setCurrencyPrefix: (prefix: string) => void;
  setDateRange: (dateRange: DateRange | undefined) => void;
};

export const MoneyTrackerProviderContext =
  React.createContext<MoneyTrackerProviderProps | null>(null);
