import { describe, expect, it } from "vitest";

import { buildMonthGrid, parseDateKey, toDateKey } from "@/lib/date";

describe("toDateKey", () => {
  it("한 자리 월과 일을 0으로 채운 'YYYY-MM-DD' 형식으로 만든다", () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("두 자리 월과 일도 그대로 유지한다", () => {
    expect(toDateKey(new Date(2026, 10, 23))).toBe("2026-11-23");
  });
});

describe("parseDateKey", () => {
  it("toDateKey로 만든 키를 같은 날짜로 되돌린다", () => {
    const original = new Date(2026, 7, 20);
    const roundTripped = parseDateKey(toDateKey(original));

    expect(roundTripped.getFullYear()).toBe(2026);
    expect(roundTripped.getMonth()).toBe(7);
    expect(roundTripped.getDate()).toBe(20);
  });
});

describe("buildMonthGrid", () => {
  it("모든 주가 7칸이 되도록 이전/다음 달 날짜로 채운다", () => {
    const weeks = buildMonthGrid(2026, 7); // 2026년 8월

    for (const week of weeks) {
      expect(week).toHaveLength(7);
    }
  });

  it("해당 월의 날짜 수만큼 inCurrentMonth가 true인 칸을 만든다", () => {
    const weeks = buildMonthGrid(2026, 7); // 2026년 8월 = 31일
    const daysInMonth = weeks.flat().filter((day) => day.inCurrentMonth);

    expect(daysInMonth).toHaveLength(31);
    expect(daysInMonth[0].dateKey).toBe("2026-08-01");
    expect(daysInMonth[daysInMonth.length - 1].dateKey).toBe("2026-08-31");
  });
});
