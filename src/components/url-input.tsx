"use client";

import { useState } from "react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
}

export function UrlInput({ onSubmit }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateVideoUrl = (url: string) => {
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
    const hasVideoExtension = videoExtensions.some((ext) =>
      url.toLowerCase().endsWith(ext)
    );

    try {
      new URL(url);
      return hasVideoExtension;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateVideoUrl(url)) {
      setError("Please enter a valid video URL (mp4, webm, ogg, or mov)");
      setIsLoading(false);
      return;
    }

    onSubmit(url);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="video-url"
            className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Video URL
          </label>
          <div className="relative">
            <input
              id="video-url"
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="https://example.com/video.mp4"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-fuchsia-500 hover:bg-fushsia-600 hover:-translate-y-1.5 duration-300 text-white font-medium px-6 py-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load Video"}
        </button>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
