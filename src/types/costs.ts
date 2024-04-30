export type Expense = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
};
export type Revenue = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
};
export type Settings = {
  currency_prefix: string;
};