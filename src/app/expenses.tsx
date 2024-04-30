"use client";
import { useExpense } from "@/hooks/useExpenses";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Expense } from "@/types/costs";
import { Badge } from "@/components/ui/badge";

export const ExpensePanel = () => {
  const { data, settings } = useExpense();
  return (
    <motion.section className="md:w-5/5 mx-auto w-[95%] rounded-2xl p-0.5 relative max-h-[86.5dvh]">
      <div className="bg-background rounded-2xl h-full w-full flex flex-col gap-3 p-4 max-h-[86.5dvh] overflow-y-auto">
        {data.map((expense) => (
          <ExpenseCard expense={expense} prefix={settings.currency_prefix} />
        ))}
        {data.length != 0 ? null : (
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-neutral-400">
            Status Indicator for Empty State
          </span>
        )}
      </div>
      <motion.div
        initial={{
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
        }}
        animate={{
          backgroundSize: "200% 200%",
          backgroundPosition: "200% 100%",
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r  from-background dark:via-white/50 via-black to-background/70   -z-10 !overflow-hidden rounded-2xl"
      />
    </motion.section>
  );
};

const ExpenseCard = ({
  expense,
  prefix,
}: {
  expense: Expense;
  prefix: string;
}) => {
  return (
    <Card className="">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle className="capitalize">{expense.title}</CardTitle>
          <CardDescription>{expense.description}</CardDescription>
        </div>
        <CardDescription>{format(expense.date, "PPP")}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="text-foreground/50">
          {prefix}
          {expense.amount}
        </p>
        <Badge variant={"default"} className="text-sm">
          {expense.category}
        </Badge>
      </CardContent>
    </Card>
  );
};