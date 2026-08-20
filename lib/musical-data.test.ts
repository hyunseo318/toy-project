import { describe, expect, it } from "vitest";

import {
  getAllShowPosters,
  getDateKeysWithPerformances,
  getPerformancesByDate,
} from "@/lib/musical-data";

describe("getPerformancesByDate", () => {
  it("여러 공연이 겹치는 날짜에는 그날 공연 중인 뮤지컬을 모두 반환한다", () => {
    const performances = getPerformancesByDate("2026-08-20");

    expect(performances.map((performance) => performance.title)).toEqual([
      "겨울왕국 한국초연",
      "디어 에반 핸슨",
      "엘리자벳",
      "드라큘라",
      "헬스키친",
      "유미의 세포들",
      "파가니니",
      "그날들",
    ]);
  });

  it("하루에 회차가 두 번이면 회차별로 시간과 캐스팅이 따로 담긴다", () => {
    const frozen = getPerformancesByDate("2026-08-21").find(
      (performance) => performance.title === "겨울왕국 한국초연"
    );

    expect(frozen?.showtimes).toEqual([
      { time: "14:30", casting: ["정유지", "최지혜", "차윤해", "김원빈", "정원영", "임진웅"] },
      { time: "19:30", casting: ["민경아", "홍금비", "차윤해", "김원빈", "한규정", "임진웅"] },
    ]);
  });

  it("같은 공연이라도 날짜가 다르면 그날 실제로 무대에 오른 캐스팅이 나온다", () => {
    const showtimesOn20th = getPerformancesByDate("2026-08-20").find(
      (performance) => performance.title === "겨울왕국 한국초연"
    )?.showtimes;

    expect(showtimesOn20th).toEqual([
      { time: "19:30", casting: ["민경아", "박진주", "신재범", "황건하", "이창호", "정열"] },
    ]);
  });

  it("월요일처럼 공연이 쉬는 날은 빈 배열을 반환한다", () => {
    expect(getPerformancesByDate("2026-08-24")).toEqual([]);
    expect(getPerformancesByDate("2026-08-31")).toEqual([]);
  });

  it("그 날짜에 캐스팅이 확정되지 않은 공연은 목록에서 빠진다", () => {
    // 유미의 세포들과 그날들은 8월 23일까지만 공연해서 8월 29일에는 나오지 않는다.
    const titlesOn29th = getPerformancesByDate("2026-08-29").map((p) => p.title);
    expect(titlesOn29th).not.toContain("유미의 세포들");
    expect(titlesOn29th).not.toContain("그날들");
    expect(titlesOn29th).toContain("겨울왕국 한국초연");
  });

  it("공연이 하나뿐인 예매처도 그대로 포함한다", () => {
    const elisabeth = getPerformancesByDate("2026-08-20").find(
      (performance) => performance.title === "엘리자벳"
    );

    expect(elisabeth?.vendors.map((vendor) => vendor.name)).toEqual(["인터파크"]);
  });

  it("공연이 없는 날짜는 빈 배열을 반환한다", () => {
    expect(getPerformancesByDate("2099-01-01")).toEqual([]);
  });
});

describe("getAllShowPosters", () => {
  it("날짜와 무관하게 상영 중인 모든 뮤지컬의 포스터 정보를 반환한다", () => {
    const posters = getAllShowPosters();

    expect(posters).toHaveLength(8);
    expect(posters.map((poster) => poster.title)).toContain("겨울왕국 한국초연");
    for (const poster of posters) {
      expect(poster.posterSrc).toMatch(/^https:\/\/ticketimage\.interpark\.com\//);
    }
  });
});

describe("getDateKeysWithPerformances", () => {
  it("캐스팅이 확정된 날짜만 포함하고, 쉬는 날과 무관한 날짜는 제외한다", () => {
    const keys = getDateKeysWithPerformances();

    expect(keys.has("2026-08-20")).toBe(true);
    expect(keys.has("2026-08-30")).toBe(true);
    expect(keys.has("2026-08-24")).toBe(false);
    expect(keys.has("2026-08-31")).toBe(false);
    expect(keys.has("2099-01-01")).toBe(false);
  });
});
