import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
