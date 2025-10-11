"use client"

import { Home, Search, PlusSquare, Film, User } from "lucide-react"

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-around py-3">
        <Home className="h-6 w-6 dark:text-white" />
        <Search className="h-6 w-6 dark:text-white" />
        <PlusSquare className="h-6 w-6 dark:text-white" />
        <Film className="h-6 w-6 dark:text-white" />
        <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-gray-100" />
      </div>
    </div>
  )
}
