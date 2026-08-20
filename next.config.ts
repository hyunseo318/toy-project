import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 모드에서 화면 좌측 아래에 뜨는 "현재 라우트" 표시 배지가 리스트
  // 카드 위에 겹쳐 보여서 껐다. 실제 배포(production build)에는 원래도
  // 나타나지 않는 개발용 오버레이라, 꺼도 실제 화면에는 영향이 없다.
  devIndicators: false,
  images: {
    // 포스터 이미지를 우리 서버에 복사하지 않고, 예매처가 이미 공개해 둔
    // 이미지 주소를 그대로 참조(하드링크)하기 위한 허용 목록.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ticketimage.interpark.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
