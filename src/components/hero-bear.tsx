import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    n: "01",
    kicker: { en: "01 — The first year", es: "01 — El primer año" },
    title: {
      en: ["Clothes for", "the first year"],
      es: ["Ropa del", "primer año"],
    },
    body: {
      en: "Chosen to keep. Quiet pieces that hold up past the first photograph.",
      es: "Elegida para quedarse. Piezas quietas que duran más allá de la primera foto.",
    },
  },
  {
    n: "02",
    kicker: { en: "02 — Every box", es: "02 — Cada caja" },
    title: {
      en: ["The bear", "goes in every box"],
      es: ["El oso", "va en cada caja"],
    },
    body: {
      en: "Navy box, ribbon, a tag written by hand.",
      es: "Caja navy, listón, una etiqueta escrita a mano.",
    },
  },
  {
    n: "03",
    kicker: { en: "03 — The house", es: "03 — La casa" },
    title: {
      en: ["The house", "ships nationwide"],
      es: ["La casa", "envía a todo el país"],
    },
    body: {
      en: "English and Español from the same counter.",
      es: "Inglés y español desde el mismo mostrador.",
    },
  },
];

export function HeroBear() {
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = SLIDES[index];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      videoRef.current?.pause();
      return;
    }
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % SLIDES.length);
      setTick((n) => n + 1);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1380px] items-center lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
        <div className="order-1 aspect-square w-full lg:order-2 lg:aspect-auto lg:h-[calc(100svh-6.5rem)]">
          <div className="relative h-full w-full overflow-hidden bg-paper">
            <img
              src={asset("/images/hero-teddy-poster.jpg")}
              alt="Shia Baby teddy"
              className="absolute inset-0 h-full w-full object-contain object-center lg:object-cover"
              draggable={false}
              fetchPriority="high"
            />
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain object-center lg:object-cover motion-reduce:hidden"
              src={asset("/videos/hero-teddy.mp4")}
              poster={asset("/images/hero-teddy-poster.jpg")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              aria-label="Shia Baby teddy"
            />
          </div>
        </div>

        <div className="relative order-2 flex flex-col justify-center px-5 py-10 sm:px-10 lg:order-1 lg:px-16 lg:py-16">
          <div className="mb-6 hidden flex-col items-center gap-3 text-[11px] tracking-[0.18em] text-gold lg:absolute lg:top-1/2 lg:left-6 lg:mb-0 lg:flex lg:-translate-y-1/2">
            {SLIDES.map((s, i) => (
              <span key={s.n} className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setTick((n) => n + 1);
                  }}
                  className={cn(
                    "font-semibold",
                    i === index ? "text-gold" : "text-navy/30",
                  )}
                  aria-label={s.kicker.en}
                >
                  {s.n}
                </button>
                {i < SLIDES.length - 1 ? <span className="h-5 w-px bg-navy/15" /> : null}
              </span>
            ))}
          </div>

          <div className="min-h-[13.5rem] sm:min-h-[16rem]">
            <div key={tick} className="hero-copy">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{slide.kicker[locale]}</p>
              <h1 className="mt-3 max-w-md font-display text-[2.45rem] leading-[1.06] font-medium text-navy sm:text-6xl lg:text-[4.1rem]">
                <span className="block">{slide.title[locale][0]}</span>
                <span className="mt-1 block italic">{slide.title[locale][1]}</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-ink-soft">{slide.body[locale]}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/shop"
              className="inline-flex h-14 items-center justify-center rounded-full bg-navy px-8 text-xs font-medium uppercase tracking-[0.12em] text-cream transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              {locale === "es" ? "Ver la colección" : "Explore collection"}
            </Link>
            <Link
              to="/the-house"
              className="group inline-flex items-center gap-2 text-sm text-navy"
            >
              <span className="relative grid size-8 place-items-center rounded-full border border-gold/60">
                <Play className="size-3 fill-navy text-navy" />
              </span>
              {locale === "es" ? "Descubrir la casa" : "Discover the house"}
              <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
