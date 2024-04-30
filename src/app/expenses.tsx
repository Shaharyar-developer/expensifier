"use client";
import { motion } from "framer-motion";

export const ExpensePanel = () => {
  return (
    <motion.section className="border-2 md:w-2/5 w-[95%] rounded-2xl min-h-60 relative">
      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-neutral-400">
        Status Indicator for Empty State
      </span>
    </motion.section>
  );
};
