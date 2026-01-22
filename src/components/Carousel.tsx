"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Play, Pause, CaretLeft, CaretRight } from "@phosphor-icons/react";

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  ]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    { src: "/images/MISSION.png", alt: "Notre mission - Impact Tech" },
    { src: "/images/VALEURS.png", alt: "Nos valeurs - Impact Tech" },
    { src: "/images/VISION.png", alt: "Notre vision - Impact Tech" },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = isPlaying ? autoplay.stop : autoplay.play;
    playOrStop();
    setIsPlaying(!isPlaying);
  }, [emblaApi, isPlaying]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="wrapper max-w-7xl mx-auto">
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative h-64 rounded-lg overflow-hidden"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-fill"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous slide"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next slide"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>

        <button
          onClick={toggleAutoplay}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={20} weight="duotone" />
          ) : (
            <Play size={20} weight="duotone" />
          )}
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-primary w-8"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
