import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MusicalCard } from "@/components/musical-card";
import type { Performance } from "@/lib/musical-data";

const performance: Performance = {
  id: "sample-0101",
  title: "샘플 뮤지컬",
  posterSrc: "/sample-poster.gif",
  posterAlt: "샘플 뮤지컬 포스터",
  showtimes: [
    { time: "14:30", casting: ["배우 A", "배우 B"] },
    { time: "19:30", casting: ["배우 C", "배우 D"] },
  ],
  venueName: "샘플아트센터 대극장",
  venueSize: "대극장",
  vendors: [
    { name: "인터파크", remainingSeats: 12, bookingUrl: "https://tickets.interpark.com/" },
    { name: "티켓링크", remainingSeats: 0, bookingUrl: "https://www.ticketlink.co.kr/" },
  ],
};

describe("MusicalCard", () => {
  it("회차가 여러 개면 회차별 시간과 캐스팅을 각각 보여준다", () => {
    render(<MusicalCard performance={performance} />);

    expect(screen.getByText("14:30 배우 A, 배우 B")).toBeInTheDocument();
    expect(screen.getByText("19:30 배우 C, 배우 D")).toBeInTheDocument();
  });

  it("출연진 아래에 공연장 이름을 보여준다", () => {
    render(<MusicalCard performance={performance} />);

    expect(screen.getByText("극장: 샘플아트센터 대극장")).toBeInTheDocument();
  });

  it("예매처를 선택하기 전에는 잔여석 정보를 보여주지 않는다", () => {
    render(<MusicalCard performance={performance} />);

    expect(screen.queryByText(/잔여석/)).not.toBeInTheDocument();
  });

  it("예매처를 선택하면 그 예매처의 잔여석과 예매하기 링크가 나타난다", () => {
    render(<MusicalCard performance={performance} />);

    fireEvent.click(screen.getByRole("button", { name: "인터파크" }));

    expect(screen.getByText("인터파크 잔여석")).toBeInTheDocument();
    expect(screen.getByText("12석")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "예매하기" })).toHaveAttribute(
      "href",
      "https://tickets.interpark.com/"
    );
  });

  it("다른 예매처를 선택하면 이전 예매처의 잔여석은 사라지고 새 예매처의 잔여석만 보인다", () => {
    render(<MusicalCard performance={performance} />);

    fireEvent.click(screen.getByRole("button", { name: "인터파크" }));
    fireEvent.click(screen.getByRole("button", { name: "티켓링크" }));

    expect(screen.queryByText("인터파크 잔여석")).not.toBeInTheDocument();
    expect(screen.getByText("티켓링크 잔여석")).toBeInTheDocument();
    expect(screen.getByText("매진")).toBeInTheDocument();
  });
});
