"use client";
import { Expense } from "@/types/costs";
import React from "react";

export type ExpenseProviderProps = {
  data: Expense[];
  setData: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
};

export const ExpenseProviderContext =
  React.createContext<ExpenseProviderProps | null>(null);
