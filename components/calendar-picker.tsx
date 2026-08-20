"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { buildMonthGrid, parseDateKey } from "@/lib/date";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

type CalendarPickerProps = {
  selectedDateKey: string;
  onSelectDateKey: (dateKey: string) => void;
  highlightedDateKeys?: Set<string>;
};

export function CalendarPicker({
  selectedDateKey,
  onSelectDateKey,
  highlightedDateKeys,
}: CalendarPickerProps) {
  const selectedDate = parseDateKey(selectedDateKey);
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const weeks = buildMonthGrid(viewYear, viewMonth);

  function goToPreviousMonth() {
    const previous = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(previous.getFullYear());
    setViewMonth(previous.getMonth());
  }

  function goToNextMonth() {
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-3 flex items-center justify-between">
        <Button type="button" variant="outline" size="sm" onClick={goToPreviousMonth}>
          이전 달
        </Button>
        <p className="text-sm font-medium" aria-live="polite">
          {viewYear}년 {viewMonth + 1}월
        </p>
        <Button type="button" variant="outline" size="sm" onClick={goToNextMonth}>
          다음 달
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flatMap((week) =>
          week.map((day) => {
            const isSelected = day.dateKey === selectedDateKey;
            const hasPerformances = highlightedDateKeys?.has(day.dateKey) ?? false;

            return (
              <button
                key={day.dateKey}
                type="button"
                onClick={() => onSelectDateKey(day.dateKey)}
                aria-pressed={isSelected}
                aria-label={`${day.date.getFullYear()}년 ${day.date.getMonth() + 1}월 ${day.date.getDate()}일`}
                className={cn(
                  "relative flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors",
                  day.inCurrentMonth ? "text-foreground" : "text-muted-foreground/50",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                {day.date.getDate()}
                {hasPerformances && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-1 h-1 w-1 rounded-full",
                      isSelected ? "bg-primary-foreground" : "bg-primary"
                    )}
                  />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
