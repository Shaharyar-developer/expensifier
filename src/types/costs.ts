import { DateRange } from "react-day-picker";

export type MoneyTrackerItem = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  type: "revenue" | "expense";
};

export type Settings = {
  currency_prefix: string;
  filterDate?: DateRange | undefined;
};
