export interface Post {
  id: string
  imageUrl: string
  hash?: string
  isDuplicate?: boolean
}

export interface FeedState {
  posts: Post[]
  reels: Post[]
}

export type FeedTab = "posts" | "reels" | "tagged"
