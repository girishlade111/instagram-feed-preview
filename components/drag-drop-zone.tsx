"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface DragDropZoneProps {
  onImageDrop: (files: File[]) => void
  children: React.ReactNode
}

export function DragDropZone({ onImageDrop, children }: DragDropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageDrop(acceptedFiles)
      }
    },
    [onImageDrop],
  )

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
    noClick: true,
    noKeyboard: true,
  })

  return (
    <div {...getRootProps()} className={`relative flex-1 ${isDragActive ? "bg-primary/10 dark:bg-primary/20" : ""}`}>
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <p className="text-white text-lg font-medium">Déposez vos images ici</p>
        </div>
      )}
      {children}
    </div>
  )
}
