import { useState } from "react";
import { TimeInput } from "./time-input";
import { Caption } from "@/app/types";
import { Save, X } from "lucide-react";

interface CaptionEditFormProps {
  caption: Caption;
  onSave: (caption: Caption) => void;
  onCancel: () => void;
}

export function CaptionEditForm({
  caption,
  onSave,
  onCancel,
}: CaptionEditFormProps) {
  const [text, setText] = useState(caption.text);
  const [startTime, setStartTime] = useState(caption.startTime);
  const [endTime, setEndTime] = useState(caption.endTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...caption,
      text,
      startTime,
      endTime,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <div className="grid grid-cols-2 gap-4">
        <TimeInput
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
        />
        <TimeInput label="End Time" value={endTime} onChange={setEndTime} />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  );
}
