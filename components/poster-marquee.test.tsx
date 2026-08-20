import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PosterMarquee } from "@/components/poster-marquee";
import { getAllShowPosters } from "@/lib/musical-data";

describe("PosterMarquee", () => {
  it("끊기지 않게 흐르도록 포스터를 두 벌 이어 붙여 그린다", () => {
    const { container } = render(<PosterMarquee />);

    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(getAllShowPosters().length * 2);
  });

  it("목록과 내용이 겹쳐 스크린 리더에는 노출하지 않는다", () => {
    const { container } = render(<PosterMarquee />);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
