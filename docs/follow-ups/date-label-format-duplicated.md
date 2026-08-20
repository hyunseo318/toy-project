# 날짜 포맷 로직이 두 파일에 중복 구현됨

`components/musical-finder.tsx`의 `formatDateLabel`과 `components/calendar-picker.tsx`의 날짜 버튼 `aria-label` 계산이 같은 "YYYY년 M월 D일" 포맷을 각각 따로 구현하고 있다. `lib/date.ts`에 공용 포맷 함수로 합치면 좋다.
