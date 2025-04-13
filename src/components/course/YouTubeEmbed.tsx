'use client'

import { useState } from 'react'
import { AlertCircle, Maximize2, Minimize2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface YouTubeEmbedProps {
  videoUrl: string
  title?: string
  className?: string
  onComplete?: () => void
}

export function YouTubeEmbed({ videoUrl, title, className, onComplete }: YouTubeEmbedProps) {
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    try {
      // Handle already-extracted video IDs
      if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url
      }

      // Handle various YouTube URL formats
      const patterns = [
        // youtu.be URLs
        /youtu\.be\/([a-zA-Z0-9_-]{11})/i,
        // youtube.com/watch?v= URLs
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
        // youtube.com/embed/ URLs
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
        // Any other format with v= parameter
        /[?&]v=([a-zA-Z0-9_-]{11})/i
      ]

      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match && match[1]) {
          return match[1]
        }
      }

      // If no patterns match but URL contains a YouTube domain, try to extract the last path segment
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const urlObj = new URL(url)
        const pathSegments = urlObj.pathname.split('/')
        const lastSegment = pathSegments[pathSegments.length - 1]
        if (/^[a-zA-Z0-9_-]{11}$/.test(lastSegment)) {
          return lastSegment
        }
      }

      return null
    } catch (e) {
      console.error('Invalid URL:', e)
      return null
    }
  }

  const videoId = getVideoId(videoUrl)

  if (!videoId) {
    console.error('Could not extract video ID from URL:', videoUrl)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Invalid YouTube URL. Please provide a valid YouTube URL (e.g., https://youtube.com/watch?v=VIDEO_ID)
        </AlertDescription>
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Always use the embed URL format
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className={cn(
      'relative w-full transition-all duration-300',
      isExpanded ? 'fixed inset-0 z-50 bg-black/90' : '',
      className
    )}>
      <div className={cn(
        'relative transition-all duration-300',
        isExpanded ? 'h-screen' : 'h-[400px]'
      )}>
        <iframe
          src={embedUrl}
          title={title || 'YouTube video player'}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setError('Failed to load video. Please check your internet connection and try again.')}
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/10 hover:bg-white/20"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
} 