"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import type { Post } from "../types"

interface InstagramPostProps {
  post: Post
  index: number
  onDelete: (id: string) => void
}

export function InstagramPost({ post, index, onDelete }: InstagramPostProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: post.id,
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    touchAction: "pan-y", // Allow vertical scrolling
  }

  return (
    <div ref={setNodeRef} style={style} className="relative aspect-[3/4] w-full group touch-none">
      <div className="absolute inset-0">
        <Image src={post.imageUrl || "/placeholder.svg"} alt={`Post ${index + 1}`} fill className="object-cover" />
      </div>
      <div
        className="absolute inset-0 bg-black/60 opacity-0 transition-opacity 
          group-hover:opacity-100 md:group-hover:opacity-100 
          group-active:opacity-100 touch:group-active:opacity-100"
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete(post.id)
          }}
          className="absolute top-2 right-2 p-2 bg-white/10 rounded-full 
            hover:bg-white/20 transition-colors z-[60]"
        >
          <Trash2 className="h-4 w-4 text-white" />
        </button>
      </div>
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }} // Allow vertical scrolling on drag handle
      />
    </div>
  )
}
