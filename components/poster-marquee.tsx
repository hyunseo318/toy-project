import Image from "next/image";

import { getAllShowPosters } from "@/lib/musical-data";

/**
 * 현재 상영 중인 뮤지컬 포스터를 한 줄로 늘어놓고 계속 흘러가게 보여주는
 * 장식용 띠다. 목록과 내용이 겹치므로 스크린 리더에는 노출하지 않는다.
 */
export function PosterMarquee() {
  const posters = getAllShowPosters();
  // 두 벌을 이어 붙여서, 첫 벌의 폭만큼 이동했을 때 끊기지 않고 처음과
  // 이어지는 것처럼 보이게 한다.
  const track = [...posters, ...posters];

  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <div className="animate-poster-marquee flex w-max gap-4">
        {track.map((poster, index) => (
          <Image
            key={`${poster.title}-${index}`}
            src={poster.posterSrc}
            alt={poster.posterAlt}
            width={96}
            height={144}
            className="h-[144px] w-[96px] shrink-0 rounded-md object-cover"
          />
        ))}
      </div>
    </div>
  );
}
