import { Caption } from "@/app/types";

export function exportCaptions(captions: Caption[]) {
    const srtContent = captions
      .sort((a, b) => a.startTime - b.startTime)
      .map((caption, index) => {
        const formatTime = (seconds: number) => {
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = Math.floor(seconds % 60);
          const ms = Math.floor((seconds % 1) * 1000);
          return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
        };
  
        return `${index + 1}\n${formatTime(caption.startTime)} --> ${formatTime(caption.endTime)}\n${caption.text}\n`;
      })
      .join('\n');
  
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }