'use client'

import { cn } from '@/lib/utils'
import { STORAGE_BUCKETS } from '@/lib/constants'
import { getPublicUrl } from '@/lib/storage'

interface PDFViewerProps {
  pdfUrl: string
  lessonId: string
  onComplete?: () => void
  className?: string
}

export function PDFViewer({ pdfUrl, onComplete, className }: PDFViewerProps) {
  // Get the actual PDF URL
  const getPdfUrl = (url: string) => {
    if (url.startsWith('http')) return url
    return getPublicUrl(STORAGE_BUCKETS.COURSE_CONTENT, url)
  }

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