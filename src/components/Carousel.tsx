"use client";

import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { Play, Pause } from "@phosphor-icons/react";
import "@splidejs/react-splide/css/skyblue";
import Image from "next/image";

export function Carousel() {
  const options = {
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    resetProgress: false,
    interval: 8000,
    height: "258px",
  };

  const slides = [
    {
      src: "/images/COMPIL.png",
      alt: "Notre équipe - Impact Tech",
    },
    {
      src: "/images/G.C.png",
      alt: "Projets de construction",
    },
    {
      src: "/images/G.I.png",
      alt: "Solutions technologiques",
    },
    {
      src: "/images/G.E.png",
      alt: "Installations électriques",
    },
  ];

  return (
    <div className="wrapper max-w-7xl mx-auto px-4">
      <Splide options={options} aria-label="autoplay" hasTrack={false}>
        <div className="relative">
          <SplideTrack>
            {slides.map((slide, index) => (
              <SplideSlide key={index}>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-fill"
                    priority={index === 0}
                  />
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>

        <button
          className="splide__toggle mt-4 border rounded-4xl p-2"
          type="button"
        >
          <span className="splide__toggle__play">
            <Play weight="duotone" />
          </span>
          <span className="splide__toggle__pause">
            <Pause weight="duotone" />
          </span>
        </button>
        <div className="splide__progress mt-4">
          <div className="splide__progress__bar bg-primary" />
        </div>
      </Splide>
    </div>
  );
}
