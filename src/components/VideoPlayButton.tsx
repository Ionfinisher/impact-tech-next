"use client";

import { Play, Pause } from "@phosphor-icons/react";
import { useState } from "react";

export function VideoPlayButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <button
      onClick={function HandlePlay() {
        const video = document.getElementById("video") as HTMLVideoElement;
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }}
      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300"
    >
      {isPlaying ? (
        <Pause size={24} weight="duotone" />
      ) : (
        <Play size={24} weight="duotone" />
      )}
    </button>
  );
}
