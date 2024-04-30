import { ExpenseProviderContext } from "@/contexts/expenses";
import { useContext } from "react";

export const useExpense = () => {
  const context = useContext(ExpenseProviderContext);
  if (context === null) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
