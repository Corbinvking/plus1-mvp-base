'use client'

import { VideoPlayer } from './VideoPlayer'
import { PDFViewer } from './PDFViewer'

interface LessonViewerProps {
  contentType: 'video' | 'pdf'
  contentUrl: string
  lessonId: string
  onComplete?: () => void
  className?: string
}

export function LessonViewer({
  contentType,
  contentUrl,
  lessonId,
  onComplete,
  className,
}: LessonViewerProps) {
  if (contentType === 'video') {
    return (
      <VideoPlayer
        videoUrl={contentUrl}
        lessonId={lessonId}
        onComplete={onComplete}
        className={className}
      />
    )
  }

  if (contentType === 'pdf') {
    return (
      <PDFViewer
        pdfUrl={contentUrl}
        lessonId={lessonId}
        onComplete={onComplete}
        className={className}
      />
    )
  }

  return (
    <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
      <p className="text-red-500">Unsupported content type: {contentType}</p>
    </div>
  )
} 