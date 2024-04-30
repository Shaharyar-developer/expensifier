"use client";
import { ExpenseProviderContext } from "@/contexts/expenses";
import { Expense } from "@/types/costs";
import { useEffect, useState } from "react";

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const expenses = window.localStorage.getItem("expenses");
      if (expenses) {
        setData(JSON.parse(expenses));
      }
    }
  }, []);

  const addExpense = (expense: Expense) => {
    window.localStorage.setItem("expenses", JSON.stringify([...data, expense]));
    setData([...data, expense]);
  };
  const removeExpense = (id: string) => {
    const updatedExpenses = data.filter((expense) => expense.id !== id);
    window.localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setData(updatedExpenses);
  };

  return (
    <ExpenseProviderContext.Provider
      value={{ data, setData, addExpense, removeExpense }}
    >
      {children}
    </ExpenseProviderContext.Provider>
  );
};
