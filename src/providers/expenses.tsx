"use client";
import { ExpenseProviderContext } from "@/contexts/expenses";
import { Expense, Settings } from "@/types/costs";
import { useEffect, useState } from "react";

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>({ currency_prefix: "$" });
  const [data, setData] = useState<Expense[]>([
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
      const expenses = window.localStorage.getItem("expenses");
      if (expenses) {
        setData(JSON.parse(expenses));
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

  const addExpense = (expense: Expense) => {
    window.localStorage.setItem("expenses", JSON.stringify([...data, expense]));
    setData([...data, expense]);
  };
  const removeExpense = (id: string) => {
    const updatedExpenses = data.filter((expense) => expense.id !== id);
    window.localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setData(updatedExpenses);
  };
  const setCurrencyPrefix = (prefix: string) => {
    window.localStorage.setItem(
      "settings",
      JSON.stringify({ currency_prefix: prefix })
    );
    setSettings({ currency_prefix: prefix });
  };

  return (
    <ExpenseProviderContext.Provider
      value={{
        data,
        setData,
        addExpense,
        removeExpense,
        settings,
        setCurrencyPrefix,
      }}
    >
      {children}
    </ExpenseProviderContext.Provider>
  );
};
