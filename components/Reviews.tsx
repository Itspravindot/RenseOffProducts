"use client";

import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { gsap, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/motion";
import { brandInfo } from "@/lib/site";

/** Customer feedback supplied by the business. */
const reviews = [
  {
    text: "The products are really good and smells good too not like some of the product in the market",
    name: "Abideen Bilgi",
    detail: "Customer review",
    rating: 5,
  },
  {
    text: "the dishwash and handwash doesnt make my hand feel rough after use",
    name: "Zainab",
    detail: "Customer review",
    rating: 4,
  },
  {
    text: "the floor cleaner is actually good it cleans every though stains on the floor",
    name: "Ayush",
    detail: "Customer review",
    rating: 4.5,
  },
];

export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !root.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".review-card, .trust-stat",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      id="reviews"
      ref={root}
      data-bg="#FBF8F3"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Customer Stories</p>
          <h2 className="mt-6 font-display text-[clamp(2.7rem,6vw,4.9rem)] font-light leading-none tracking-[-0.02em] text-forest">
            Words from Our Customers
          </h2>
          <p className="section-intro mt-6">
            Real experiences from people who choose Renseoff.
          </p>
        </div>

        <div className="trust-stat mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          {brandInfo.stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden h-10 w-px bg-forest/10 sm:block"
                />
              )}
              <div className="text-center">
                <p className="font-display text-3xl font-light text-forest sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-editorial text-muted">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="-mx-6 mt-16 flex snap-x gap-5 overflow-x-auto px-6 pb-8 no-scrollbar lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="review-card group flex min-h-[300px] min-w-[280px] snap-center flex-col justify-between rounded-[28px] border border-forest/10 bg-white/55 p-8 backdrop-blur-sm transition-all duration-700 ease-premium hover:-translate-y-1.5 hover:border-forest/25 hover:shadow-card lg:min-w-0"
            >
              <div>
                <Quote
                  className="h-8 w-8 text-forest/20 transition-colors duration-500 group-hover:text-forest/40"
                  strokeWidth={1.2}
                />
                <p className="mt-6 font-display text-[1.45rem] font-light leading-relaxed text-forest/90">
                  {review.text}
                </p>
                {review.rating && (
                  <div
                    className="mt-5 flex gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, star) => {
                      const fill = Math.max(
                        0,
                        Math.min(1, (review.rating ?? 0) - star),
                      );
                      return (
                        <span
                          key={star}
                          className="relative inline-block h-4 w-4"
                        >
                          <Star
                            className="absolute inset-0 h-4 w-4 text-forest/20"
                            strokeWidth={1.2}
                          />
                          <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fill * 100}%` }}
                          >
                            <Star
                              className="h-4 w-4 fill-[#C79A3C] text-[#C79A3C]"
                              strokeWidth={1.2}
                            />
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-forest/10 pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 font-display text-sm text-forest/70">
                  {review.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="text-xs font-semibold text-forest">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-muted">
                    {review.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
