import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

afterEach(() => {
  vi.useRealTimers();
});

describe("Home", () => {
  it("제목과 달력을 보여준다", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "날짜로 뮤지컬 찾기" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이전 달" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음 달" })).toBeInTheDocument();
  });

  it("공연이 겹치는 날짜를 선택한 상태로 열리면 그날의 모든 뮤지컬이 리스트에 나타난다", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 20));

    render(<Home />);

    expect(screen.getByText("겨울왕국 한국초연")).toBeInTheDocument();
    expect(screen.getByText("디어 에반 핸슨")).toBeInTheDocument();
  });

  it("공연이 없는 날짜를 선택한 상태로 열리면 안내 문구가 나타난다", () => {
    // 데이터에는 2026년 8월 20~30일의 캐스팅만 확정돼 있어, 그 이전 날짜에는
    // 공연이 없다.
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 1));

    render(<Home />);

    expect(
      screen.getByText("2026년 5월 1일에는 예정된 뮤지컬 공연이 없습니다.")
    ).toBeInTheDocument();
  });
});
