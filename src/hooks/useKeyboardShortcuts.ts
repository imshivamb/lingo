import { useEffect } from "react";

export function useKeyboardShortcuts({
  videoRef,
  currentTime,
  addCaption,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  addCaption: () => void;
}) {
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if the focused element is an input or textarea
      const isInputFocused =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";

      switch (e.key) {
        case " ":
          if (isInputFocused) {
            return;
          }
          e.preventDefault();
          handlePlayPause();
          break;
        case "Enter":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            addCaption();
          }
          break;
        case "ArrowLeft":
          if (videoRef.current) videoRef.current.currentTime -= 5;
          break;
        case "ArrowRight":
          if (videoRef.current) videoRef.current.currentTime += 5;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentTime, addCaption]);
}