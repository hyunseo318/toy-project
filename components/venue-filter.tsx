"use client";

import { Button } from "@/components/ui/button";
import { VENUE_SIZES, type VenueSize } from "@/lib/musical-data";

type VenueFilterProps = {
  selectedVenueSize: VenueSize | null;
  onSelectVenueSize: (venueSize: VenueSize | null) => void;
};

/**
 * null은 "전체"(필터 없음)를 뜻한다. 선택한 날짜의 리스트를 극장 규모로 좁혀 보는
 * 용도이므로, 날짜를 바꿔도 선택된 필터는 그대로 유지된다.
 */
export function VenueFilter({ selectedVenueSize, onSelectVenueSize }: VenueFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="극장 규모 필터">
      <Button
        type="button"
        variant={selectedVenueSize === null ? "default" : "outline"}
        size="sm"
        aria-pressed={selectedVenueSize === null}
        onClick={() => onSelectVenueSize(null)}
      >
        전체
      </Button>
      {VENUE_SIZES.map((venueSize) => (
        <Button
          key={venueSize}
          type="button"
          variant={selectedVenueSize === venueSize ? "default" : "outline"}
          size="sm"
          aria-pressed={selectedVenueSize === venueSize}
          onClick={() => onSelectVenueSize(venueSize)}
        >
          {venueSize}
        </Button>
      ))}
    </div>
  );
}
