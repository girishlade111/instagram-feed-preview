import { openDB, type DBSchema, type IDBPDatabase } from "idb"
import type { FeedState, Post } from "../types"

interface FeedDB extends DBSchema {
  posts: {
    key: string
    value: Post
  }
  reels: {
    key: string
    value: Post
  }
}

const DB_NAME = "instagram-feed-db"
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<FeedDB>>

export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<FeedDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains("posts")) {
          db.createObjectStore("posts", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("reels")) {
          db.createObjectStore("reels", { keyPath: "id" })
        }
      },
    })
  }
  return dbPromise
}

export async function savePosts(posts: Post[]) {
  const db = await initDB()
  const tx = db.transaction("posts", "readwrite")
  await tx.store.clear() // Clear existing posts
  for (const post of posts) {
    await tx.store.put(post)
  }
  await tx.done
}

export async function saveReels(reels: Post[]) {
  const db = await initDB()
  const tx = db.transaction("reels", "readwrite")
  await tx.store.clear() // Clear existing reels
  for (const reel of reels) {
    await tx.store.put(reel)
  }
  await tx.done
}

export async function loadPosts(): Promise<Post[]> {
  const db = await initDB()
  return db.getAll("posts")
}

export async function loadReels(): Promise<Post[]> {
  const db = await initDB()
  return db.getAll("reels")
}

export async function clearAll() {
  const db = await initDB()
  await db.clear("posts")
  await db.clear("reels")
}
