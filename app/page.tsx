"use client"

import { TopNav } from "../components/top-nav"
import { BottomNav } from "../components/bottom-nav"
import { InstagramFeed } from "../components/instagram-feed"
import { DragDropZone } from "../components/drag-drop-zone"
import { ThemeProvider } from "../components/theme-provider"
import { useEffect, useState } from "react"
import { loadPosts, loadReels } from "../utils/db"

export default function Page() {
  const [hasContent, setHasContent] = useState(false)

  useEffect(() => {
    const checkContent = async () => {
      try {
        const [posts, reels] = await Promise.all([loadPosts(), loadReels()])
        setHasContent(posts.length > 0 || reels.length > 0)
      } catch (error) {
        console.error("Error checking content:", error)
      }
    }
    checkContent()
  }, [])

  const handleImageDrop = (files: File[]) => {
    setHasContent(true)
    const event = new CustomEvent("addImages", { detail: files })
    document.dispatchEvent(event)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen dark:bg-black bg-gray-100">
        <div className="relative mx-auto max-w-[430px] min-h-screen">
          <div className="flex flex-col bg-white min-h-screen dark:bg-black border-x border-gray-200 dark:border-gray-800 shadow-2xl">
            <TopNav />
            <DragDropZone onImageDrop={handleImageDrop}>
              <div className="flex-1 flex flex-col min-h-0 pb-12">
                <InstagramFeed />
              </div>
            </DragDropZone>
            <BottomNav />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
