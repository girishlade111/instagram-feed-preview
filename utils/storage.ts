import type { FeedState } from "../types"

const MAX_IMAGES = 50 // Maximum number of images allowed
const MAX_SIZE_PER_IMAGE = 500 * 1024 // 500KB in bytes

export function saveFeedState(state: FeedState) {
  try {
    // Check number of images
    const totalImages = state.posts.length + state.reels.length
    if (totalImages > MAX_IMAGES) {
      throw new Error(`Vous ne pouvez pas sauvegarder plus de ${MAX_IMAGES} images.`)
    }

    // Check size of data
    const stateString = JSON.stringify(state)
    const sizeInBytes = new Blob([stateString]).size

    // Average size per image
    const averageSizePerImage = totalImages > 0 ? sizeInBytes / totalImages : 0

    if (averageSizePerImage > MAX_SIZE_PER_IMAGE) {
      throw new Error("Les images sont trop volumineuses. Essayez d'en ajouter moins ou de plus petite taille.")
    }

    localStorage.setItem("instagram-feed-state", stateString)
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "QuotaExceededError") {
        throw new Error("Espace de stockage insuffisant. Veuillez supprimer quelques images.")
      }
      throw error
    }
  }
}

export function loadFeedState(): FeedState {
  const saved = localStorage.getItem("instagram-feed-state")
  return saved ? JSON.parse(saved) : { posts: [], reels: [] }
}
