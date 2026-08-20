import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MusicalFinder, buildEmptyMessage, filterByVenueSize } from "@/components/musical-finder";
import type { Performance } from "@/lib/musical-data";

afterEach(() => {
  vi.useRealTimers();
});

const 대극장공연: Performance = {
  id: "sample-large",
  title: "샘플 대극장 공연",
  posterSrc: "/sample-poster.gif",
  posterAlt: "샘플 대극장 공연 포스터",
  showtimes: [{ time: "19:30", casting: ["배우 A"] }],
  venueName: "샘플 대극장",
  venueSize: "대극장",
  vendors: [],
};

describe("filterByVenueSize", () => {
  it("null이면 전체를 그대로 반환한다", () => {
    expect(filterByVenueSize([대극장공연], null)).toEqual([대극장공연]);
  });

  it("선택한 규모와 일치하는 공연만 남긴다", () => {
    expect(filterByVenueSize([대극장공연], "소극장")).toEqual([]);
    expect(filterByVenueSize([대극장공연], "대극장")).toEqual([대극장공연]);
  });
});

describe("buildEmptyMessage", () => {
  it("그 날짜에 공연이 아예 없으면 일반 안내 문구를 만든다", () => {
    expect(buildEmptyMessage("2026년 8월 31일", false, null)).toBe(
      "2026년 8월 31일에는 예정된 뮤지컬 공연이 없습니다."
    );
  });

  it("공연은 있지만 선택한 규모만 없으면 규모를 언급하는 문구를 만든다", () => {
    expect(buildEmptyMessage("2026년 8월 20일", true, "소극장")).toBe(
      "2026년 8월 20일에는 소극장 공연이 없습니다."
    );
  });
});

describe("MusicalFinder 극장 규모 필터 (통합)", () => {
  it("기본값(전체)에서는 선택한 날짜에 공연 중인 모든 뮤지컬이 보인다", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 20));

    render(<MusicalFinder />);

    expect(screen.getByText("겨울왕국 한국초연")).toBeInTheDocument();
    expect(screen.getByText("파가니니")).toBeInTheDocument();
  });

  it("소극장을 선택하면 소극장 공연만 남는다", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 20));

    render(<MusicalFinder />);
    fireEvent.click(screen.getByRole("button", { name: "소극장" }));

    expect(screen.getByText("파가니니")).toBeInTheDocument();
    expect(screen.queryByText("겨울왕국 한국초연")).not.toBeInTheDocument();
  });
});
