/**
 * 달력 그리드를 만들고 날짜를 "YYYY-MM-DD" 키로 다루기 위한 순수 함수 모음.
 * `Date`를 직접 비교하면 시/분/초나 시간대 차이로 어긋나기 쉬워서,
 * 날짜 단위 비교와 데이터 조회는 항상 이 문자열 키를 기준으로 한다.
 */

export type CalendarDay = {
  date: Date;
  dateKey: string;
  inCurrentMonth: boolean;
};

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * 주어진 연·월(월은 0부터 시작)의 달력 그리드를 7일 단위 주 배열로 만든다.
 * 첫 주와 마지막 주는 이전/다음 달의 날짜로 채워서 항상 7의 배수 칸을 유지한다.
 */
export function buildMonthGrid(year: number, month: number): CalendarDay[][] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: CalendarDay[] = [];

  for (let offset = startWeekday; offset > 0; offset--) {
    const date = new Date(year, month, 1 - offset);
    days.push({ date, dateKey: toDateKey(date), inCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({ date, dateKey: toDateKey(date), inCurrentMonth: true });
  }

  while (days.length % 7 !== 0) {
    const last = days[days.length - 1].date;
    const date = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
    days.push({ date, dateKey: toDateKey(date), inCurrentMonth: false });
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}
