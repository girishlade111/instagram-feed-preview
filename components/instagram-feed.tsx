"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { InstagramPost } from "./instagram-post"
import { ReelPost } from "./reel-post"
import { FeedTabs } from "./feed-tabs"
import { UploadZone } from "./upload-zone"
import { EmptyState } from "./empty-state"
import { calculateImageHash, compressImage } from "../utils/image"
import { savePosts, saveReels, loadPosts, loadReels } from "../utils/db"
import type { Post, FeedTab } from "../types"
import { toast } from "@/components/ui/use-toast"

export function InstagramFeed() {
  const [activeTab, setActiveTab] = useState<FeedTab>("posts")
  const [posts, setPosts] = useState<Post[]>([])
  const [reels, setReels] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load initial data from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedPosts, loadedReels] = await Promise.all([loadPosts(), loadReels()])
        setPosts(loadedPosts)
        setReels(loadedReels)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les images sauvegardées.",
        })
      }
    }
    loadData()
  }, [])

  // Save changes to IndexedDB
  useEffect(() => {
    const saveData = async () => {
      try {
        await savePosts(posts)
      } catch (error) {
        console.error("Error saving posts:", error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de sauvegarder les posts.",
        })
      }
    }
    saveData()
  }, [posts])

  useEffect(() => {
    const saveData = async () => {
      try {
        await saveReels(reels)
      } catch (error) {
        console.error("Error saving reels:", error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de sauvegarder les reels.",
        })
      }
    }
    saveData()
  }, [reels])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Require more deliberate horizontal movement
        distance: 10,
        // Increase delay to better distinguish between scroll and drag
        delay: 150,
        // Only activate drag if movement is primarily horizontal
        tolerance: {
          x: 5,
          y: 20, // Allow more vertical movement before canceling drag
        },
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      if (activeTab === "posts") {
        setPosts((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      } else if (activeTab === "reels") {
        setReels((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }
  }

  const handleNewImages = async (files: File[]) => {
    const MAX_IMAGES = 100
    const currentTotal = posts.length + reels.length
    if (currentTotal + files.length > MAX_IMAGES) {
      toast({
        variant: "destructive",
        title: "Limite atteinte",
        description: `Vous ne pouvez pas ajouter plus de ${MAX_IMAGES} images au total.`,
      })
      return
    }

    setIsLoading(true)
    try {
      const newPosts = await Promise.all(
        files.map(async (file) => ({
          id: Math.random().toString(),
          imageUrl: await compressImage(file),
          hash: await calculateImageHash(file),
        })),
      )

      if (activeTab === "posts") {
        setPosts((currentPosts) => [...currentPosts, ...newPosts])
      } else if (activeTab === "reels") {
        setReels((currentReels) => [...currentReels, ...newPosts])
      }
    } catch (error) {
      console.error("Error processing images:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du traitement des images.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    if (activeTab === "posts") {
      setPosts((current) => current.filter((post) => post.id !== id))
    } else if (activeTab === "reels") {
      setReels((current) => current.filter((reel) => reel.id !== id))
    }
  }

  useEffect(() => {
    const handleAddImages = async (e: CustomEvent<File[]>) => {
      await handleNewImages(e.detail)
    }

    document.addEventListener("addImages", handleAddImages as EventListener)
    return () => {
      document.removeEventListener("addImages", handleAddImages as EventListener)
    }
  }, [activeTab])

  const currentItems = activeTab === "posts" ? posts : reels
  const PostComponent = activeTab === "posts" ? InstagramPost : ReelPost

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {currentItems.length === 0 ? (
          <EmptyState onImageSelect={(files) => handleNewImages(Array.from(files))} />
        ) : (
          <>
            <UploadZone onImageSelect={(files) => handleNewImages(Array.from(files))} />
            <div className="grid grid-cols-3 gap-[1px] bg-white dark:bg-black flex-1">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={currentItems} strategy={rectSortingStrategy}>
                  {currentItems.map((item, index) => (
                    <PostComponent key={item.id} post={item} index={index} onDelete={handleDelete} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
