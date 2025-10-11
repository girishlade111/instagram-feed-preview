"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { ImagePlus } from "lucide-react"

interface ImageDropzoneProps {
  onImageDrop: (files: File[]) => void
}

export function ImageDropzone({ onImageDrop }: ImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageDrop(acceptedFiles)
      }
    },
    [onImageDrop],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"}`}
    >
      <input {...getInputProps()} />
      <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">Glissez plusieurs images ici ou cliquez pour en sélectionner</p>
    </div>
  )
}
