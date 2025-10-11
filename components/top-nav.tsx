"use client"

import { ArrowLeft, Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function TopNav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <ArrowLeft className="h-6 w-6 dark:text-white" />
      <span className="text-base font-semibold dark:text-white">Feed - preview</span>
      <button onClick={toggleTheme}>
        {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6 text-white" />}
      </button>
    </div>
  )
}
