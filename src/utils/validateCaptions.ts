import { Caption } from "@/app/types";

export function validateCaption(caption: Caption, duration: number): string[] {
    const errors: string[] = [];
  
    if (!caption.text.trim()) {
      errors.push('Caption text cannot be empty');
    }
  
    if (caption.startTime < 0) {
      errors.push('Start time cannot be negative');
    }
  
    if (caption.endTime > duration) {
      errors.push('End time cannot exceed video duration');
    }
  
    if (caption.startTime >= caption.endTime) {
      errors.push('Start time must be before end time');
    }
  
    return errors;
  }