import { MusicalCard } from "@/components/musical-card";
import type { Performance } from "@/lib/musical-data";

type MusicalListProps = {
  performances: Performance[];
  emptyMessage: string;
};

export function MusicalList({ performances, emptyMessage }: MusicalListProps) {
  if (performances.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted-foreground" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="mt-6 flex w-full flex-col gap-4">
      {performances.map((performance) => (
        <li key={performance.id}>
          <MusicalCard performance={performance} />
        </li>
      ))}
    </ul>
  );
}
