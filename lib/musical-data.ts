/**
 * 2026년 8월 20일~30일 사이에 실제로 공연 중인 뮤지컬을 인터파크(NOL 티켓)의
 * "캐스팅 일정 조회" 화면에서 날짜·회차별로 확정된 실제 캐스팅과 시간을 그대로
 * 옮겨 반영한 데이터다(자동으로 계속 도는 크롤러가 아니라, 이번에 한 번 조사해
 * 넣은 값). 예스24 자체 페이지는 자동 접속이 차단되어 있어 그 경로로는
 * 조사하지 않았고, 그 플랫폼에만 있는 몇몇 공연은 이번에 포함하지 못했다.
 * 포스터도 각 플랫폼이 이미 공개해 둔 이미지 주소를 그대로 참조(하드링크)하며,
 * 우리 서버에 복사본을 두지 않는다.
 *
 * 각 플랫폼이 캐스팅을 공개해 둔 마지막 날짜까지만 데이터가 있다(조사 시점으로
 * 부터 열흘 안팎). 그 뒤 날짜나 월요일(대부분 공연이 쉬는 날)에는 그 공연을
 * 리스트에 넣지 않는다. 잔여석 숫자만큼은 실시간으로 가져올 방법이 없어 예시
 * 값으로 남아 있다. docs/specs/musical-list-by-date/spec.md의 "남은 위험" 참고.
 */

export type Vendor = {
  name: string;
  remainingSeats: number;
  bookingUrl: string;
};

export type VenueSize = "대극장" | "중극장" | "소극장";

export const VENUE_SIZES: VenueSize[] = ["대극장", "중극장", "소극장"];

export type Showtime = {
  time: string;
  casting: string[];
};

export type Performance = {
  id: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
  showtimes: Showtime[];
  venueName: string;
  venueSize: VenueSize;
  vendors: Vendor[];
};

type ShowId =
  | "frozen"
  | "dear-evan-hansen"
  | "elisabeth"
  | "dracula"
  | "hells-kitchen"
  | "yumis-cells"
  | "paganini"
  | "the-days";

type ShowMeta = Omit<Performance, "id" | "showtimes">;

const SHOW_IDS: ShowId[] = [
  "frozen",
  "dear-evan-hansen",
  "elisabeth",
  "dracula",
  "hells-kitchen",
  "yumis-cells",
  "paganini",
  "the-days",
];

const SHOW_META: Record<ShowId, ShowMeta> = {
  frozen: {
    title: "겨울왕국 한국초연",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2605/260527030105_26007416.gif",
    posterAlt: "겨울왕국 한국초연 포스터",
    venueName: "샤롯데씨어터",
    venueSize: "대극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 24,
        bookingUrl: "https://tickets.interpark.com/contents/bridge/26007416",
      },
      {
        name: "예스24",
        remainingSeats: 9,
        bookingUrl: "https://m.ticket.yes24.com/Perf/58563",
      },
    ],
  },
  "dear-evan-hansen": {
    title: "디어 에반 핸슨",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2605/260527014922_26007442.gif",
    posterAlt: "디어 에반 핸슨 포스터",
    venueName: "충무아트센터 대극장",
    venueSize: "대극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 0,
        bookingUrl: "https://tickets.interpark.com/goods/26007442",
      },
      {
        name: "예스24",
        remainingSeats: 17,
        bookingUrl: "https://m.ticket.yes24.com/Perf/58543",
      },
    ],
  },
  elisabeth: {
    title: "엘리자벳",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2606/260626080854_26009314.gif",
    posterAlt: "엘리자벳 포스터",
    venueName: "블루스퀘어 우리은행홀",
    venueSize: "대극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 31,
        bookingUrl: "https://tickets.interpark.com/contents/bridge/26009314",
      },
    ],
  },
  dracula: {
    title: "드라큘라",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2605/260513091908_L0000142.gif",
    posterAlt: "드라큘라 포스터",
    venueName: "LG아트센터 서울 LG SIGNATURE 홀",
    venueSize: "대극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 14,
        bookingUrl: "https://tickets.interpark.com/goods/L0000142",
      },
    ],
  },
  "hells-kitchen": {
    title: "헬스키친",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2605/260515032756_26007169.gif",
    posterAlt: "헬스키친 포스터",
    venueName: "GS아트센터",
    venueSize: "중극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 6,
        bookingUrl: "https://tickets.interpark.com/goods/26007169",
      },
      {
        name: "예스24",
        remainingSeats: 12,
        bookingUrl: "https://ticket.yes24.com/Perf/58477?Gcode=009_403",
      },
    ],
  },
  "yumis-cells": {
    title: "유미의 세포들",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260428095648_26006325.gif",
    posterAlt: "유미의 세포들 포스터",
    venueName: "예술의전당 CJ 토월극장",
    venueSize: "중극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 4,
        bookingUrl: "https://tickets.interpark.com/goods/26006325",
      },
      {
        name: "예스24",
        remainingSeats: 8,
        bookingUrl: "https://ticket.yes24.com/Perf/58289",
      },
    ],
  },
  paganini: {
    title: "파가니니",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260424113641_26006228.gif",
    posterAlt: "파가니니 포스터",
    venueName: "홍익대 대학로 아트센터 소극장",
    venueSize: "소극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 3,
        bookingUrl: "https://tickets.interpark.com/goods/26006228",
      },
    ],
  },
  "the-days": {
    title: "그날들",
    posterSrc:
      "https://ticketimage.interpark.com/TCMS3.0/GMain/Musc/2604/260428050128_26005310.gif",
    posterAlt: "그날들 포스터",
    venueName: "디큐브 링크아트센터",
    venueSize: "중극장",
    vendors: [
      {
        name: "인터파크",
        remainingSeats: 10,
        bookingUrl: "https://tickets.interpark.com/goods/26005310",
      },
    ],
  },
};

// 각 플랫폼의 "캐스팅 일정 조회" 화면에서 그대로 옮긴, 날짜·회차별 실제 시간과 캐스팅.
const SHOWTIMES_BY_DATE: Partial<Record<string, Partial<Record<ShowId, Showtime[]>>>> = {
  "2026-08-20": {
    frozen: [{ time: "19:30", casting: ["민경아", "박진주", "신재범", "황건하", "이창호", "정열"] }],
    "dear-evan-hansen": [
      {
        time: "19:30",
        casting: ["나현우", "신영숙", "조민호", "강지혜", "장현성", "안시하", "김강진", "염희진"],
      },
    ],
    elisabeth: [{ time: "19:30", casting: ["린아", "서경수", "강홍석", "박민성", "서지영", "장윤석"] }],
    dracula: [{ time: "19:30", casting: ["김준수", "김환희", "강태을", "임현준", "이예은", "조성린"] }],
    "hells-kitchen": [{ time: "19:30", casting: ["손승연", "박혜나", "정영주", "케이윌", "박광선"] }],
    "yumis-cells": [{ time: "19:30", casting: ["김예원", "정택운", "유리아", "유소리", "임기홍"] }],
    paganini: [{ time: "19:30", casting: ["홍주찬", "김경수", "황민수", "박주혁", "유주연"] }],
    "the-days": [{ time: "19:30", casting: ["엄기준", "산들", "이지수", "서현철"] }],
  },
  "2026-08-21": {
    frozen: [
      { time: "14:30", casting: ["정유지", "최지혜", "차윤해", "김원빈", "정원영", "임진웅"] },
      { time: "19:30", casting: ["민경아", "홍금비", "차윤해", "김원빈", "한규정", "임진웅"] },
    ],
    "dear-evan-hansen": [
      {
        time: "14:30",
        casting: ["박강현", "김선영", "김수호", "장민제", "정동근", "임민영", "윤현선", "강은세"],
      },
      {
        time: "19:30",
        casting: ["임규형", "김선영", "김수호", "장민제", "정동근", "임민영", "윤현선", "강은세"],
      },
    ],
    elisabeth: [
      { time: "14:30", casting: ["이지혜", "고은성", "박은태", "민영기", "주아", "김우성"] },
      { time: "19:30", casting: ["이지수", "카이", "노윤", "민영기", "주아", "김우성"] },
    ],
    dracula: [{ time: "19:30", casting: ["신성록", "조정은", "강태을", "임현준", "이예은", "조성린"] }],
    "hells-kitchen": [
      { time: "14:30", casting: ["박지원", "최현선", "김영주", "테이", "한승윤"] },
      { time: "19:30", casting: ["김수하", "최현선", "김영주", "테이", "한승윤"] },
    ],
    "yumis-cells": [
      { time: "14:30", casting: ["김예원", "최재림", "김소향", "유소리", "육현욱"] },
      { time: "19:30", casting: ["티파니 영", "정택운", "김소향", "유소리", "육현욱"] },
    ],
    paganini: [{ time: "19:30", casting: ["홍주찬", "김종구", "황민수", "신수빈", "안리나"] }],
    "the-days": [
      { time: "14:30", casting: ["유준상", "오종혁", "박새힘", "이정열"] },
      { time: "19:30", casting: ["김정현", "유선호", "박새힘", "이정열"] },
    ],
  },
  "2026-08-22": {
    "dear-evan-hansen": [
      {
        time: "14:00",
        casting: ["나현우", "신영숙", "조민호", "강지혜", "장현성", "안시하", "김강진", "염희진"],
      },
      {
        time: "19:00",
        casting: ["박강현", "신영숙", "조민호", "강지혜", "장현성", "안시하", "김강진", "염희진"],
      },
    ],
    elisabeth: [
      { time: "14:00", casting: ["린아", "서경수", "강홍석", "박민성", "서지영", "장윤석"] },
      { time: "19:00", casting: ["이지혜", "고은성", "박은태", "박민성", "서지영", "장윤석"] },
    ],
    dracula: [
      { time: "14:00", casting: ["김준수", "박지연", "임정모", "진태화", "이아름솔", "지원선"] },
      { time: "19:00", casting: ["전동석", "김환희", "임정모", "진태화", "이아름솔", "지원선"] },
    ],
    "hells-kitchen": [
      { time: "14:00", casting: ["손승연", "박혜나", "정영주", "케이윌", "박광선"] },
      { time: "19:00", casting: ["김수하", "박혜나", "정영주", "케이윌", "박광선"] },
    ],
    "yumis-cells": [
      { time: "14:00", casting: ["티파니 영", "최재림", "유리아", "박시인", "임기홍"] },
      { time: "19:00", casting: ["티파니 영", "최재림", "유리아", "박시인", "임기홍"] },
    ],
    paganini: [
      { time: "14:00", casting: ["KoN", "윤형렬", "이준혁", "박주혁", "유주연"] },
      { time: "18:30", casting: ["KoN", "김경수", "황민수", "박주혁", "유주연"] },
    ],
    "the-days": [
      { time: "14:00", casting: ["최진혁", "산들", "이지수", "고창석"] },
      { time: "19:00", casting: ["엄기준", "윤시윤", "이지수", "고창석"] },
    ],
  },
  "2026-08-23": {
    "dear-evan-hansen": [
      {
        time: "15:00",
        casting: ["임규형", "김선영", "김수호", "장민제", "정동근", "임민영", "윤현선", "강은세"],
      },
    ],
    elisabeth: [{ time: "15:00", casting: ["린아", "카이", "노윤", "민영기", "주아", "김우성"] }],
    dracula: [
      { time: "13:00", casting: ["신성록", "박지연", "강태을", "임현준", "이예은", "조성린"] },
      { time: "18:00", casting: ["김준수", "조정은", "강태을", "임현준", "이예은", "조성린"] },
    ],
    "hells-kitchen": [{ time: "15:00", casting: ["손승연", "최현선", "김영주", "테이", "한승윤"] }],
    "yumis-cells": [{ time: "14:00", casting: ["김예원", "정택운", "김소향", "유소리", "육현욱"] }],
    paganini: [
      { time: "14:00", casting: ["홍주찬", "윤형렬", "이승준", "신수빈", "안리나"] },
      { time: "18:30", casting: ["KoN", "김종구", "조훈", "신수빈", "유주연"] },
    ],
    "the-days": [{ time: "14:00", casting: ["류수영", "박규원", "박새힘", "서현철"] }],
  },
  "2026-08-25": {
    frozen: [{ time: "19:30", casting: ["정유지", "최지혜", "차윤해", "김원빈", "정원영", "임진웅"] }],
    "dear-evan-hansen": [
      {
        time: "19:30",
        casting: ["임규형", "김선영", "조민호", "장민제", "장현성", "안시하", "김강진", "강은세"],
      },
    ],
    elisabeth: [{ time: "19:30", casting: ["이지수", "서경수", "강홍석", "박민성", "주아", "김우성"] }],
    dracula: [{ time: "19:30", casting: ["전동석", "박지연", "강태을", "임현준", "이아름솔", "조성린"] }],
    "hells-kitchen": [{ time: "19:30", casting: ["김수하", "최현선", "정영주", "케이윌", "박광선"] }],
    paganini: [{ time: "19:30", casting: ["KoN", "김경수", "이준혁", "박규원", "안리나"] }],
  },
  "2026-08-26": {
    frozen: [{ time: "19:30", casting: ["민경아", "박진주", "신재범", "황건하", "이창호", "정열"] }],
    "dear-evan-hansen": [
      {
        time: "14:30",
        casting: ["박강현", "신영숙", "김수호", "강지혜", "정동근", "임민영", "윤현선", "염희진"],
      },
      {
        time: "19:30",
        casting: ["나현우", "신영숙", "김수호", "강지혜", "정동근", "임민영", "윤현선", "염희진"],
      },
    ],
    elisabeth: [
      { time: "14:30", casting: ["린아", "카이", "박은태", "박민성", "서지영", "장윤석"] },
      { time: "19:30", casting: ["이지수", "고은성", "노윤", "박민성", "서지영", "장윤석"] },
    ],
    dracula: [
      { time: "14:30", casting: ["김준수", "김환희", "임정모", "진태화", "이예은", "지원선"] },
      { time: "19:30", casting: ["신성록", "조정은", "임정모", "진태화", "이예은", "지원선"] },
    ],
    "hells-kitchen": [
      { time: "14:30", casting: ["박지원", "박혜나", "김영주", "테이", "한승윤"] },
      { time: "19:30", casting: ["손승연", "최현선", "김영주", "테이", "한승윤"] },
    ],
    paganini: [{ time: "19:30", casting: ["홍주찬", "김종구", "조훈", "이세헌", "유주연"] }],
  },
  "2026-08-27": {
    frozen: [{ time: "19:30", casting: ["정유지", "홍금비", "신재범", "김원빈", "한규정", "임진웅"] }],
    "dear-evan-hansen": [
      {
        time: "19:30",
        casting: ["임규형", "김선영", "조민호", "장민제", "장현성", "안시하", "김강진", "강은세"],
      },
    ],
    elisabeth: [{ time: "19:30", casting: ["이지혜", "서경수", "강홍석", "민영기", "주아", "김우성"] }],
    dracula: [{ time: "19:30", casting: ["전동석", "김환희", "강태을", "임현준", "이아름솔", "조성린"] }],
    "hells-kitchen": [{ time: "19:30", casting: ["박지원", "최현선", "정영주", "케이윌", "박광선"] }],
    paganini: [{ time: "19:30", casting: ["KoN", "김경수", "이준혁", "박규원", "안리나"] }],
  },
  "2026-08-28": {
    frozen: [
      { time: "14:30", casting: ["민경아", "최지혜", "차윤해", "황건하", "정원영", "정열"] },
      { time: "19:30", casting: ["정선아", "박진주", "차윤해", "황건하", "한규정", "정열"] },
    ],
    "dear-evan-hansen": [
      {
        time: "14:30",
        casting: ["나현우", "신영숙", "김수호", "강지혜", "정동근", "안시하", "윤현선", "염희진"],
      },
      {
        time: "19:30",
        casting: ["박강현", "신영숙", "김수호", "강지혜", "정동근", "안시하", "윤현선", "염희진"],
      },
    ],
    elisabeth: [
      { time: "14:30", casting: ["이지수", "고은성", "노윤", "민영기", "서지영", "장윤석"] },
      { time: "19:30", casting: ["린아", "카이", "박은태", "민영기", "서지영", "장윤석"] },
    ],
    dracula: [{ time: "19:30", casting: ["신성록", "박지연", "임정모", "임현준", "이예은", "조성린"] }],
    "hells-kitchen": [
      { time: "14:30", casting: ["김수하", "박혜나", "김영주", "테이", "한승윤"] },
      { time: "19:30", casting: ["손승연", "박혜나", "김영주", "테이", "한승윤"] },
    ],
    paganini: [{ time: "19:30", casting: ["KoN", "윤형렬", "이승준", "박주혁", "유주연"] }],
  },
  "2026-08-29": {
    frozen: [
      { time: "14:00", casting: ["정유지", "최지혜", "신재범", "김원빈", "이창호", "임진웅"] },
      { time: "19:00", casting: ["정선아", "홍금비", "신재범", "김원빈", "정원영", "임진웅"] },
    ],
    "dear-evan-hansen": [
      {
        time: "14:00",
        casting: ["임규형", "김선영", "조민호", "장민제", "장현성", "임민영", "김강진", "강은세"],
      },
      {
        time: "19:00",
        casting: ["박강현", "김선영", "조민호", "장민제", "장현성", "임민영", "김강진", "강은세"],
      },
    ],
    elisabeth: [
      { time: "14:00", casting: ["이지혜", "서경수", "노윤", "박민성", "주아", "김우성"] },
      { time: "19:00", casting: ["린아", "카이", "강홍석", "박민성", "주아", "김우성"] },
    ],
    dracula: [
      { time: "14:00", casting: ["김준수", "김환희", "강태을", "진태화", "이아름솔", "지원선"] },
      { time: "19:00", casting: ["전동석", "조정은", "강태을", "진태화", "이아름솔", "지원선"] },
    ],
    "hells-kitchen": [
      { time: "14:00", casting: ["김수하", "최현선", "정영주", "케이윌", "박광선"] },
      { time: "19:00", casting: ["박지원", "최현선", "정영주", "케이윌", "한승윤"] },
    ],
    paganini: [
      { time: "14:00", casting: ["KoN", "김경수", "이준혁", "박규원", "안리나"] },
      { time: "18:30", casting: ["홍석기", "윤형렬", "조훈", "이세헌", "유주연"] },
    ],
  },
  "2026-08-30": {
    frozen: [{ time: "15:00", casting: ["민경아", "박진주", "차윤해", "황건하", "한규정", "정열"] }],
    "dear-evan-hansen": [
      {
        time: "15:00",
        casting: ["나현우", "신영숙", "김수호", "강지혜", "정동근", "임민영", "윤현선", "염희진"],
      },
    ],
    elisabeth: [{ time: "15:00", casting: ["이지수", "고은성", "박은태", "민영기", "서지영", "장윤석"] }],
    dracula: [
      { time: "13:00", casting: ["신성록", "박지연", "임정모", "임현준", "이예은", "조성린"] },
      { time: "18:00", casting: ["김준수", "조정은", "임정모", "진태화", "이예은", "조성린"] },
    ],
    "hells-kitchen": [{ time: "15:00", casting: ["손승연", "박혜나", "김영주", "테이", "박광선"] }],
    paganini: [
      { time: "14:00", casting: ["홍주찬", "김종구", "이승준", "신수빈", "안리나"] },
      { time: "18:30", casting: ["KoN", "김경수", "황민수", "박주혁", "유주연"] },
    ],
  },
};

export function getPerformancesByDate(dateKey: string): Performance[] {
  const showtimesByShow = SHOWTIMES_BY_DATE[dateKey];
  if (!showtimesByShow) {
    return [];
  }

  return SHOW_IDS.flatMap((showId) => {
    const showtimes = showtimesByShow[showId];
    if (!showtimes) {
      return [];
    }
    return [{ id: `${showId}-${dateKey}`, showtimes, ...SHOW_META[showId] }];
  });
}

export function getDateKeysWithPerformances(): Set<string> {
  return new Set(Object.keys(SHOWTIMES_BY_DATE));
}
