const VIDEO_EXTENSIONS = ['.mp4', '.webm']
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm']
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
export const ACCEPTED_MEDIA_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES]

export const MAX_FILE_SIZE_MB = 50
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
export const MAX_VIDEO_DURATION_SECONDS = 10

export const ACCEPT_MEDIA_INPUT = 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm'

export function isVideoUrl(url: string): boolean {
  if (!url) return false
  const lowerUrl = url.split('?')[0].toLowerCase()
  return VIDEO_EXTENSIONS.some((ext) => lowerUrl.endsWith(ext))
}

export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/')
}

export function isValidMediaFile(file: File): boolean {
  return ACCEPTED_MEDIA_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE_BYTES
}

export function getMediaType(file: File): 'image' | 'video' {
  return file.type.startsWith('video/') ? 'video' : 'image'
}

export function validateVideoDuration(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isVideoFile(file)) {
      resolve(true)
      return
    }
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve(video.duration <= MAX_VIDEO_DURATION_SECONDS)
    }
    video.onerror = () => {
      URL.revokeObjectURL(video.src)
      resolve(false)
    }
    video.src = URL.createObjectURL(file)
  })
}
