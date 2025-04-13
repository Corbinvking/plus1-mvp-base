'use client'

import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
  lessonId: string
  onComplete?: () => void
  className?: string
}

const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')
  } catch {
    return false
  }
}

const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return ''
  
  try {
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url
    }

    let videoId = ''
    const urlObj = new URL(url)

    // Handle youtu.be URLs
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1)
    }
    // Handle youtube.com URLs
    else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('watch')) {
        videoId = urlObj.searchParams.get('v') || ''
      } else {
        // Handle other youtube.com URLs (like shortened ones)
        videoId = urlObj.pathname.split('/').filter(Boolean).pop() || ''
      }
    }

    if (!videoId) {
      throw new Error('Could not extract video ID')
    }

    // Remove any extra parameters from video ID
    videoId = videoId.split(/[?#]/)[0]

    return `https://www.youtube.com/embed/${videoId}`
  } catch (error) {
    console.warn('Failed to parse YouTube URL:', error)
    return ''
  }
}

export function VideoPlayer({ videoUrl, className }: VideoPlayerProps) {
  // Handle YouTube videos
  if (isYouTubeUrl(videoUrl)) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl)
    
    // If we couldn't get a valid embed URL, show error
    if (!embedUrl) {
      return (
        <div className={cn('relative aspect-video w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center', className)}>
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Invalid YouTube URL format. Please check the URL and try again.</AlertDescription>
          </Alert>
        </div>
      )
    }

    return (
      <div className={cn('relative aspect-video w-full', className)}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    )
  }

  // Show error for non-YouTube URLs
  return (
    <div className={cn('relative aspect-video w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center', className)}>
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Only YouTube videos are supported at this time. Please provide a valid YouTube URL.
        </AlertDescription>
      </Alert>
    </div>
  )
} 