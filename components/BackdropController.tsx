"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/motion";

/** Cross-fades the fixed page backdrop as each themed section enters view. */
export function BackdropController() {
  useEffect(() => {
    const backdrop = document.querySelector<HTMLElement>(".page-backdrop");
    if (!backdrop) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]"),
    );

    const setBackground = (color?: string) => {
      if (color) backdrop.style.backgroundColor = color;
    };

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setBackground(section.dataset.bg),
        onEnterBack: () => setBackground(section.dataset.bg),
      }),
    );

    const first = sections[0];
    if (first) setBackground(first.dataset.bg);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
