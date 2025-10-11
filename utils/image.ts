export async function calculateImageHash(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const binary = e.target?.result
      if (typeof binary === "string") {
        const hash = binary.split("").reduce((acc, char) => {
          return ((acc << 5) - acc + char.charCodeAt(0)) | 0
        }, 0)
        resolve(Math.abs(hash).toString(16))
      }
    }
    reader.readAsBinaryString(file)
  })
}

export async function compressImage(file: File, maxWidth = 1080, maxHeight = 1350): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        // Reduce dimensions further if the image is still too large
        const MAX_DIMENSION = 800
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        // Convert to base64 with reduced quality
        const base64 = canvas.toDataURL("image/jpeg", 0.6) // Reduced quality to 60%
        resolve(base64)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
