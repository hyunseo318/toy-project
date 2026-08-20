import { render, screen } from "@testing-library/react";
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
    { name: "인터파크", bookingUrl: "https://tickets.interpark.com/" },
    { name: "티켓링크", bookingUrl: "https://www.ticketlink.co.kr/" },
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

  it("잔여석은 어디에도 보여주지 않는다", () => {
    render(<MusicalCard performance={performance} />);

    expect(screen.queryByText(/잔여석/)).not.toBeInTheDocument();
  });

  it("예매처는 그 예매처의 실제 예매 페이지로 바로 연결되는 링크다", () => {
    render(<MusicalCard performance={performance} />);

    const interparkLink = screen.getByRole("link", { name: "인터파크" });
    expect(interparkLink).toHaveAttribute("href", "https://tickets.interpark.com/");
    expect(interparkLink).toHaveAttribute("target", "_blank");
    expect(interparkLink).toHaveAttribute("rel", "noopener noreferrer");

    const ticketlinkLink = screen.getByRole("link", { name: "티켓링크" });
    expect(ticketlinkLink).toHaveAttribute("href", "https://www.ticketlink.co.kr/");
  });
});
