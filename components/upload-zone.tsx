"use client"

import { ImagePlus } from "lucide-react"

interface UploadZoneProps {
  onImageSelect: (files: FileList) => void
}

export function UploadZone({ onImageSelect }: UploadZoneProps) {
  return (
    <div className="p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && onImageSelect(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
          <ImagePlus className="h-8 w-8" />
          <p className="text-sm">Cliquez pour ajouter des images</p>
        </div>
      </label>
    </div>
  )
}
