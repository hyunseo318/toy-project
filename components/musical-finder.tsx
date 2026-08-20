"use client";

import { useState, useSyncExternalStore } from "react";

import { CalendarPicker } from "@/components/calendar-picker";
import { MusicalList } from "@/components/musical-list";
import { VenueFilter } from "@/components/venue-filter";
import { parseDateKey, toDateKey } from "@/lib/date";
import {
  getDateKeysWithPerformances,
  getPerformancesByDate,
  type Performance,
  type VenueSize,
} from "@/lib/musical-data";

function formatDateLabel(dateKey: string): string {
  const date = parseDateKey(dateKey);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function filterByVenueSize(
  performances: Performance[],
  venueSize: VenueSize | null
): Performance[] {
  if (venueSize === null) {
    return performances;
  }
  return performances.filter((performance) => performance.venueSize === venueSize);
}

export function buildEmptyMessage(
  dateLabel: string,
  hasAnyPerformance: boolean,
  venueSize: VenueSize | null
): string {
  if (!hasAnyPerformance) {
    return `${dateLabel}에는 예정된 뮤지컬 공연이 없습니다.`;
  }
  return `${dateLabel}에는 ${venueSize} 공연이 없습니다.`;
}

// "오늘"은 브라우저의 현재 시각에 따라 달라진다. 서버 렌더링 시점의 시각과
// 어긋나 하이드레이션 오류를 일으키지 않도록, 서버에서는 null을 스냅샷으로
// 두고 클라이언트에서 마운트된 뒤에만 실제 날짜를 읽는다.
function subscribeToNothing() {
  return () => {};
}

function getTodayDateKeySnapshot() {
  return toDateKey(new Date());
}

function getServerDateKeySnapshot() {
  return null;
}

export function MusicalFinder() {
  const todayDateKey = useSyncExternalStore(
    subscribeToNothing,
    getTodayDateKeySnapshot,
    getServerDateKeySnapshot
  );
  const [pickedDateKey, setPickedDateKey] = useState<string | null>(null);
  const selectedDateKey = pickedDateKey ?? todayDateKey;
  // 극장 규모 필터는 날짜를 선택한 리스트 위에 적용하는 보기 방식이라,
  // 날짜를 바꿔도 초기화하지 않고 그대로 유지한다.
  const [selectedVenueSize, setSelectedVenueSize] = useState<VenueSize | null>(null);

  const highlightedDateKeys = getDateKeysWithPerformances();

  const header = (
    <div>
      <h1 className="text-2xl font-semibold">날짜로 뮤지컬 찾기</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        날짜를 선택하면 그날 볼 수 있는 뮤지컬을 예매처와 함께 모아 보여줍니다.
      </p>
    </div>
  );

  if (selectedDateKey === null) {
    return (
      <div className="flex w-full flex-col items-center gap-6 px-4 py-10 sm:items-start sm:px-8">
        {header}
        <p className="text-sm text-muted-foreground" role="status">
          달력을 불러오는 중입니다…
        </p>
      </div>
    );
  }

  const allPerformances = getPerformancesByDate(selectedDateKey);
  const performances = filterByVenueSize(allPerformances, selectedVenueSize);
  const emptyMessage = buildEmptyMessage(
    formatDateLabel(selectedDateKey),
    allPerformances.length > 0,
    selectedVenueSize
  );

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 py-10 sm:items-start sm:px-8">
      {header}

      <CalendarPicker
        selectedDateKey={selectedDateKey}
        onSelectDateKey={setPickedDateKey}
        highlightedDateKeys={highlightedDateKeys}
      />

      <VenueFilter selectedVenueSize={selectedVenueSize} onSelectVenueSize={setSelectedVenueSize} />

      <div className="w-full max-w-2xl">
        <MusicalList performances={performances} emptyMessage={emptyMessage} />
      </div>
    </div>
  );
}
