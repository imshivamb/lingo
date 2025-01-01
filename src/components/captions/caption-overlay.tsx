"use client";

import { Caption } from "@/app/types";

interface CaptionOverlayProps {
  captions: Caption[];
  currentTime: number;
}

export function CaptionOverlay({ captions, currentTime }: CaptionOverlayProps) {
  const activeCaptions = captions.filter(
    (caption) =>
      currentTime >= caption.startTime && currentTime <= caption.endTime
  );

  if (activeCaptions.length === 0) return null;

  return (
    <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center z-10">
      {activeCaptions.map((caption) => (
        <div
          key={caption.id}
          className="bg-black/85 dark:bg-gray-900/95 text-white px-4 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-lg max-w-[85%] text-center mb-3 shadow-lg backdrop-blur-sm animate-fade-in"
          style={{
            textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {caption.text}
        </div>
      ))}
    </div>
  );
}
