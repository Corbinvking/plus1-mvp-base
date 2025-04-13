'use client'

import { useEffect } from 'react'
import { useProgress } from '@/providers/ProgressProvider'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { STORAGE_BUCKETS } from '@/lib/constants'
import { getPublicUrl } from '@/lib/storage'

interface PDFViewerProps {
  pdfUrl: string
  lessonId: string
  onComplete?: () => void
  className?: string
}

export function PDFViewer({ pdfUrl, lessonId, onComplete, className }: PDFViewerProps) {
  const { updateProgress } = useProgress()

  // Get the actual PDF URL
  const getPdfUrl = (url: string) => {
    if (url.startsWith('http')) return url
    return getPublicUrl(STORAGE_BUCKETS.COURSE_CONTENT, url)
  }

  useEffect(() => {
    // Mark as started when component mounts
    updateProgress(lessonId, 1)
    
    // Mark as complete after 5 seconds of viewing
    const timer = setTimeout(() => {
      updateProgress(lessonId, 100)
      onComplete?.()
    }, 5000)

    return () => clearTimeout(timer)
  }, [lessonId, updateProgress, onComplete])

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      <iframe
        src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(getPdfUrl(pdfUrl))}`}
        className="w-full h-full border-0 rounded-lg"
        title="PDF Viewer"
      />
    </div>
  )
} 