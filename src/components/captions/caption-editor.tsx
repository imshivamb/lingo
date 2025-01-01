"use client";

import { useState } from "react";
import { Caption } from "@/app/types";
import { Plus, Edit2, Trash2, Download } from "lucide-react";
import { CaptionEditForm } from "./caption-edit-form";
import { exportCaptions } from "@/utils/exportCaptions";

interface CaptionEditorProps {
  currentTime: number;
  duration: number;
  onCaptionAdd: (caption: Caption) => void;
  onCaptionUpdate: (caption: Caption) => void;
  onCaptionDelete: (id: string) => void;
  captions: Caption[];
}

export function CaptionEditor({
  currentTime,
  duration,
  onCaptionAdd,
  onCaptionUpdate,
  onCaptionDelete,
  captions,
}: CaptionEditorProps) {
  const [newCaptionText, setNewCaptionText] = useState("");
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);

  const handleAddCaption = () => {
    if (!newCaptionText.trim()) return;

    const newCaption: Caption = {
      id: crypto.randomUUID(),
      text: newCaptionText,
      startTime: currentTime,
      endTime: Math.min(currentTime + 3, duration),
    };

    onCaptionAdd(newCaption);
    setNewCaptionText("");
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };
  const handleExportCaptions = () => {
    exportCaptions(captions);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add New Caption
        </h2>
        <div className="flex gap-4 md:flex-row flex-col items-center">
          <input
            type="text"
            value={newCaptionText}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.stopPropagation();
              }
            }}
            onChange={(e) => setNewCaptionText(e.target.value)}
            className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter caption text..."
          />
          <button
            onClick={handleAddCaption}
            className="inline-flex items-center text-sm md:text-base gap-2 bg-fuchsia-500 text-white px-6 py-2 rounded-full hover:bg-fuchsia-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add at {formatTime(currentTime)}
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Captions
          </h2>
          {captions.length > 0 && (
            <button
              onClick={handleExportCaptions}
              className="inline-flex items-center gap-2 text-sm md:text-base bg-blue-500 text-white px-2 md:px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
        </div>
        <div className="space-y-4">
          {captions.map((caption) => (
            <div
              key={caption.id}
              className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {editingCaptionId === caption.id ? (
                <CaptionEditForm
                  caption={caption}
                  onSave={(updatedCaption) => {
                    onCaptionUpdate(updatedCaption);
                    setEditingCaptionId(null);
                  }}
                  onCancel={() => setEditingCaptionId(null)}
                />
              ) : (
                <CaptionDisplay
                  caption={caption}
                  onEdit={() => setEditingCaptionId(caption.id)}
                  onDelete={() => onCaptionDelete(caption.id)}
                  formatTime={formatTime}
                />
              )}
            </div>
          ))}
          {captions.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No captions yet. Add your first caption above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CaptionDisplayProps {
  caption: Caption;
  onEdit: () => void;
  onDelete: () => void;
  formatTime: (time: number) => string;
}

function CaptionDisplay({
  caption,
  onEdit,
  onDelete,
  formatTime,
}: CaptionDisplayProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="font-medium mb-2 text-gray-900 dark:text-white">
          {caption.text}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatTime(caption.startTime)} → {formatTime(caption.endTime)}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
