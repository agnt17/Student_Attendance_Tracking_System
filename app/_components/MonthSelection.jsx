"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addMonths } from "date-fns";
import { useState } from "react";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

function MonthSelection({selectedMonth}) {
  const today = new Date();
  const nextMonths = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonths);
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="flex gap-2 items-center text-slate-500"
          >
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMM yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(newMonth) => {selectedMonth(newMonth);setMonth(newMonth)} }
            className="flex flex-1 justify-center "
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;
