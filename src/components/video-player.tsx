"use client";

import { useState, useRef, useEffect } from "react";
import { Caption } from "@/app/types";
import { CaptionOverlay } from "@/components/captions/caption-overlay";
import { Play, Pause } from "lucide-react";
import { VideoError } from "@/app/types/errors";
import { useNetworkState } from "@/hooks/useNetworkState";
import { OfflineError } from "./errors/error-container";

interface VideoPlayerProps {
  url: string;
  captions: Caption[];
  onTimeUpdate?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
}

export function VideoPlayer({
  url,
  captions,
  onTimeUpdate,
  onDuration,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isOnline = useNetworkState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<VideoError | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && onDuration) {
      onDuration(videoRef.current.duration);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;

    switch (video.error?.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        setError({ type: "LOAD", message: "Video loading was aborted" });
        break;
      case MediaError.MEDIA_ERR_NETWORK:
        setError({
          type: "NETWORK",
          message: "Network error occurred while loading video",
        });
        break;
      case MediaError.MEDIA_ERR_DECODE:
        setError({ type: "FORMAT", message: "Video format is not supported" });
        break;
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        setError({
          type: "FORMAT",
          message: "Video source or type is not supported",
        });
        break;
      default:
        setError({
          type: "LOAD",
          message: "Error loading video. Please check the URL and try again.",
        });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handlePlay();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isOnline) {
    return <OfflineError />;
  }

  return (
    <div className="w-full">
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
        >
          <source src={url} />
          Your browser does not support the video tag.
        </video>

        <CaptionOverlay captions={captions} currentTime={currentTime} />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12">
          <div className="p-4">
            {/* Progress bar */}
            <div
              className="relative h-1 mb-4 bg-gray-600/50 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) {
                  videoRef.current.currentTime =
                    pos * videoRef.current.duration;
                }
              }}
            >
              <div
                className="absolute h-full bg-fuchsia-500 rounded-full"
                style={{
                  width: `${
                    (currentTime / (videoRef.current?.duration || 1)) * 100
                  }%`,
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePlay}
                className="bg-white/90 dark:bg-white/80 text-black p-2 rounded-full hover:bg-white transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <span className="text-white text-sm font-medium">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
}
