import { expect, test } from "@playwright/test";

test("홈 화면이 열리고 제목과 안내가 보인다", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("날짜로 뮤지컬 찾기");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "날짜로 뮤지컬 찾기"
  );
});

test("날짜를 선택하면 그날 공연 중인 뮤지컬 리스트가 나타나고, 예매처를 고르면 잔여석과 예매하기 링크가 보인다", async ({
  page,
}) => {
  // 여러 공연이 겹치는 날짜(2026-08-20)로 시각을 고정해, 실제 실행 시점과
  // 무관하게 리스트 노출 여부를 검증할 수 있도록 한다.
  await page.clock.setFixedTime(new Date(2026, 7, 20));
  await page.goto("/");

  await expect(page.getByText("겨울왕국 한국초연")).toBeVisible();
  await expect(page.getByText("파가니니")).toBeVisible();

  const frozenCard = page.getByRole("article").filter({ hasText: "겨울왕국 한국초연" });

  // 회차 시간과 그 회차의 캐스팅, 극장 이름이 나온다.
  await expect(
    frozenCard.getByText("19:30 민경아, 박진주, 신재범, 황건하, 이창호, 정열")
  ).toBeVisible();
  await expect(frozenCard.getByText("극장: 샤롯데씨어터")).toBeVisible();

  // 예매처를 선택하기 전에는 잔여석 정보가 보이지 않는다.
  await expect(frozenCard.getByText("잔여석")).toHaveCount(0);

  await frozenCard.getByRole("button", { name: "인터파크" }).click();
  await expect(frozenCard.getByText("인터파크 잔여석")).toBeVisible();
  await expect(frozenCard.getByText("24석")).toBeVisible();

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    frozenCard.getByRole("link", { name: "예매하기" }).click(),
  ]);
  // interpark.com이 자체적으로 하위 경로를 리다이렉트할 수 있으므로, 도메인
  // 이동 자체(실제 예매처로 새 탭이 열리는지)를 확인한다.
  await popup.waitForLoadState();
  expect(new URL(popup.url()).hostname).toContain("interpark.com");
  await popup.close();
});

test("날짜가 다르면 같은 공연도 그날 실제 회차의 캐스팅으로 바뀐다", async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 7, 21));
  await page.goto("/");

  const frozenCard = page.getByRole("article").filter({ hasText: "겨울왕국 한국초연" });

  // 8월 21일은 낮/저녁 두 회차가 있고, 회차마다 캐스팅이 다르다.
  await expect(
    frozenCard.getByText("14:30 정유지, 최지혜, 차윤해, 김원빈, 정원영, 임진웅")
  ).toBeVisible();
  await expect(
    frozenCard.getByText("19:30 민경아, 홍금비, 차윤해, 김원빈, 한규정, 임진웅")
  ).toBeVisible();
});

test("공연이 없는 날짜를 선택하면 안내 문구가 나타난다", async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 4, 1));
  await page.goto("/");

  await expect(
    page.getByText("2026년 5월 1일에는 예정된 뮤지컬 공연이 없습니다.")
  ).toBeVisible();
});

test("극장 규모 필터를 고르면 그 규모의 공연만 남는다", async ({ page }) => {
  await page.clock.setFixedTime(new Date(2026, 7, 20));
  await page.goto("/");

  await page.getByRole("button", { name: "소극장" }).click();
  await expect(page.getByText("파가니니")).toBeVisible();
  await expect(page.getByText("겨울왕국 한국초연")).toHaveCount(0);

  await page.getByRole("button", { name: "전체" }).click();
  await expect(page.getByText("겨울왕국 한국초연")).toBeVisible();
});
