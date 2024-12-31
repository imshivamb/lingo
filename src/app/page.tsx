"use client";

import { useState } from "react";
import { UrlInput } from "@/components/url-input";
import { VideoPlayer } from "@/components/video-player";
import { CaptionEditor } from "@/components/captions/caption-editor";
import { Caption } from "./types";
import { Video, PlaySquare, FileText, ArrowLeft } from "lucide-react";
import { Feature } from "@/components/feature-card";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [captions, setCaptions] = useState<Caption[]>([]);

  const handleUrlSubmit = (url: string) => {
    setVideoUrl(url);
    setCaptions([]);
  };

  const handleCaptionAdd = (caption: Caption) => {
    setCaptions((prev) =>
      [...prev, caption].sort((a, b) => a.startTime - b.startTime)
    );
  };

  const handleCaptionUpdate = (updatedCaption: Caption) => {
    setCaptions((prev) =>
      prev
        .map((caption) =>
          caption.id === updatedCaption.id ? updatedCaption : caption
        )
        .sort((a, b) => a.startTime - b.startTime)
    );
  };

  const handleCaptionDelete = (id: string) => {
    setCaptions((prev) => prev.filter((caption) => caption.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!videoUrl ? (
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  Lingo
                </h1>
                <p className="mt-3 max-w-md mx-auto text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-2xl">
                  Add, edit, and export captions for your videos. Simple, fast,
                  and precise.
                </p>
                <div className="mt-10">
                  <UrlInput onSubmit={handleUrlSubmit} />
                </div>
              </div>
            </div>
          </div>

          <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Feature
                  icon={<Video className="w-8 h-8" />}
                  title="Easy Video Import"
                  description="Import videos from direct URLs and start captioning immediately"
                />
                <Feature
                  icon={<PlaySquare className="w-8 h-8" />}
                  title="Real-time Preview"
                  description="See your captions appear in real-time as you edit them"
                />
                <Feature
                  icon={<FileText className="w-8 h-8" />}
                  title="SRT Export"
                  description="Export your captions in industry-standard SRT format"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setVideoUrl("")}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <VideoPlayer
                url={videoUrl}
                captions={captions}
                onTimeUpdate={setCurrentTime}
                onDuration={setDuration}
              />
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <CaptionEditor
                currentTime={currentTime}
                duration={duration}
                captions={captions}
                onCaptionAdd={handleCaptionAdd}
                onCaptionUpdate={handleCaptionUpdate}
                onCaptionDelete={handleCaptionDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
