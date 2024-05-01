import { MoneyTrackerProviderContext } from "@/contexts/money-tracker";
import { useContext } from "react";

export const useMoneyTracker = () => {
  const context = useContext(MoneyTrackerProviderContext);
  if (context === null) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
