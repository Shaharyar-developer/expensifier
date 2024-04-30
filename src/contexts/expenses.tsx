"use client";
import { Expense, Settings } from "@/types/costs";
import React from "react";

export type ExpenseProviderProps = {
  data: Expense[];
  setData: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  settings: Settings;
  setCurrencyPrefix: (prefix: string) => void;
};

export const ExpenseProviderContext =
  React.createContext<ExpenseProviderProps | null>(null);
