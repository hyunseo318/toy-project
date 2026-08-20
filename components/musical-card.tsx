import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import type { Performance } from "@/lib/musical-data";
import { cn } from "@/lib/utils";

type MusicalCardProps = {
  performance: Performance;
};

/**
 * 예매처 잔여석은 실제 플랫폼과 실시간으로 맞춰줄 방법이 없어 아예 보여주지
 * 않는다. 대신 예매처를 누르면 그 예매처의 실제 예매 페이지로 바로 연결한다.
 */
export function MusicalCard({ performance }: MusicalCardProps) {
  return (
    <article className="flex gap-4 rounded-lg border border-border p-4">
      <Image
        src={performance.posterSrc}
        alt={performance.posterAlt}
        width={120}
        height={180}
        className="h-[180px] w-[120px] shrink-0 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-semibold">{performance.title}</h3>

        <ul className="flex flex-col gap-0.5">
          {performance.showtimes.map((showtime) => (
            <li key={showtime.time} className="text-sm text-muted-foreground">
              {showtime.time} {showtime.casting.join(", ")}
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground">극장: {performance.venueName}</p>

        <div className="mt-1 flex flex-wrap gap-2" role="group" aria-label={`${performance.title} 예매처`}>
          {performance.vendors.map((vendor) => (
            <a
              key={vendor.name}
              href={vendor.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              {vendor.name}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
