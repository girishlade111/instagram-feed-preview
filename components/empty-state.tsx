import { ImagePlus } from "lucide-react"

interface EmptyStateProps {
  onImageSelect: (files: FileList) => void
}

export function EmptyState({ onImageSelect }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <label className="w-full max-w-md flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && onImageSelect(e.target.files)}
        />
        <ImagePlus className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Aucune image dans votre feed</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 text-center">Cliquez ici pour ajouter des images</p>
      </label>
    </div>
  )
}
