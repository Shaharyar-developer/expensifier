"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Dot } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

export function DatePicker(props: {
  onSelect?: (date: Date) => void;
  label?: string;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{props.label ? props.label : "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            props.onSelect && props.onSelect(date ? date : new Date());
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithRange(props: {
  className?: string;
  label?: string;
  onSelect?: (date: DateRange | undefined) => void;
  onClear?: () => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className={cn("grid gap-2", props.className)}>
      <Popover>
        <div className="flex gap-1">
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <div className="flex items-center ">
                    {format(date.from, "LLL dd, y")} <Dot />
                    {format(date.to, "LLL dd, y")}
                  </div>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>{props.label ? props.label : "Pick a date"}</span>
              )}
            </Button>
          </PopoverTrigger>
          <Button
            onClick={() => {
              setDate(undefined);
              props.onClear && props.onClear();
            }}
            variant={"outline"}
          >
            Clear
          </Button>
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => {
              setDate(e);
              props.onSelect && props.onSelect(e);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
