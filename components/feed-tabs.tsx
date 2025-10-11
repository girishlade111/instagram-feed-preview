"use client"

import { Grid, Film, User2 } from "lucide-react"
import type { FeedTab } from "../types"

interface FeedTabsProps {
  activeTab: FeedTab
  onTabChange: (tab: FeedTab) => void
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  return (
    <div className="flex justify-around border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <button
        onClick={() => onTabChange("posts")}
        className={`flex-1 p-3 border-t-2 ${
          activeTab === "posts" ? "border-black dark:border-white" : "border-transparent"
        }`}
      >
        <Grid className={`h-6 w-6 mx-auto ${activeTab === "posts" ? "text-black dark:text-white" : "text-gray-500"}`} />
      </button>
      <button
        onClick={() => onTabChange("reels")}
        className={`flex-1 p-3 border-t-2 ${
          activeTab === "reels" ? "border-black dark:border-white" : "border-transparent"
        }`}
      >
        <Film className={`h-6 w-6 mx-auto ${activeTab === "reels" ? "text-black dark:text-white" : "text-gray-500"}`} />
      </button>
      <button
        onClick={() => onTabChange("tagged")}
        className={`flex-1 p-3 border-t-2 ${
          activeTab === "tagged" ? "border-black dark:border-white" : "border-transparent"
        }`}
        disabled
      >
        <User2
          className={`h-6 w-6 mx-auto ${activeTab === "tagged" ? "text-black dark:text-white" : "text-gray-500"}`}
        />
      </button>
    </div>
  )
}
