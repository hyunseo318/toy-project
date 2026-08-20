"use client";

import { useState } from "react";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import type { Performance } from "@/lib/musical-data";
import { cn } from "@/lib/utils";

type MusicalCardProps = {
  performance: Performance;
};

/**
 * 예매처는 한 번에 하나만 선택할 수 있다. 잔여석은 선택한 예매처의 값만 보여주고,
 * 다른 예매처를 선택하기 전까지는 나타나지 않는다(스펙의 관찰 가능한 수용 기준).
 */
export function MusicalCard({ performance }: MusicalCardProps) {
  const [selectedVendorName, setSelectedVendorName] = useState<string | null>(null);
  const selectedVendor =
    performance.vendors.find((vendor) => vendor.name === selectedVendorName) ?? null;

  function toggleVendor(vendorName: string) {
    setSelectedVendorName((current) => (current === vendorName ? null : vendorName));
  }

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
            <Button
              key={vendor.name}
              type="button"
              variant={vendor.name === selectedVendorName ? "default" : "outline"}
              size="sm"
              aria-pressed={vendor.name === selectedVendorName}
              onClick={() => toggleVendor(vendor.name)}
            >
              {vendor.name}
            </Button>
          ))}
        </div>

        {selectedVendor && (
          <div className="mt-1 flex items-center justify-between gap-3 rounded-md bg-muted px-3 py-2">
            <p className="text-sm">
              <span>{selectedVendor.name} 잔여석</span>{" "}
              <strong>
                {selectedVendor.remainingSeats > 0 ? `${selectedVendor.remainingSeats}석` : "매진"}
              </strong>
            </p>
            <a
              href={selectedVendor.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              예매하기
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
