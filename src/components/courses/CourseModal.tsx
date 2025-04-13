'use client'

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VideoPlayer } from "@/components/course/VideoPlayer"
import { PDFViewer } from "@/components/course/PDFViewer"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  lessonId: string
  contentType: 'video' | 'pdf'
  contentUrl: string
}

// Mock course content - replace with actual data from your API
const mockCourseContent = {
  '1': {
    title: 'Introduction to Music Production',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Getting Started',
        contentType: 'video',
        contentUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0'
      },
      {
        id: 'lesson-2',
        title: 'Basic Concepts',
        contentType: 'pdf',
        contentUrl: 'https://example.com/basics.pdf'
      }
    ]
  },
  '2': {
    title: 'Advanced Songwriting',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Song Structure',
        contentType: 'video',
        contentUrl: 'https://www.youtube.com/embed/mTz0GXj8NwE'
      }
    ]
  }
}

// Sample quiz data
const sampleQuiz = [
  {
    question: "What is the first step in setting up a DAW?",
    options: [
      "Configure audio interface",
      "Install plugins",
      "Create a new project",
      "Set up MIDI devices"
    ],
    correctAnswer: 0
  }
];

export function CourseModal({
  isOpen,
  onClose,
  courseId,
  lessonId,
  contentType: initialContentType,
  contentUrl
}: CourseModalProps) {
  const [contentType, setContentType] = useState(initialContentType);
  const [notes, setNotes] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[160vh] h-[85vh] min-w-[1200px] max-w-[98vw] bg-background/70 backdrop-blur-md rounded-lg border shadow-lg grid grid-rows-[auto_1fr] overflow-hidden text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-white">
            {mockCourseContent[courseId as keyof typeof mockCourseContent]?.title || 'Course Content'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="ml-auto text-white hover:text-white/80">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Main content container */}
        <div className="grid grid-rows-[60%_40%] overflow-hidden">
          {/* Top section - Video/PDF */}
          <div className="border-b border-white/10 p-4">
            <Tabs value={contentType} onValueChange={(value) => setContentType(value as 'video' | 'pdf')} className="h-full">
              <TabsList className="w-full grid grid-cols-2 mb-3 bg-white/10">
                <TabsTrigger value="video" className="text-base py-2 text-white data-[state=active]:bg-white/20">Video</TabsTrigger>
                <TabsTrigger value="pdf" className="text-base py-2 text-white data-[state=active]:bg-white/20">PDF Materials</TabsTrigger>
              </TabsList>
              <div className="h-[calc(100%-3rem)]">
                <TabsContent value="video" className="mt-0 h-full">
                  <VideoPlayer
                    videoUrl={contentUrl}
                    lessonId={lessonId}
                    onComplete={() => console.log("Video completed")}
                    className="w-full h-full"
                  />
                </TabsContent>
                <TabsContent value="pdf" className="mt-0 h-full">
                  <PDFViewer
                    pdfUrl={contentUrl}
                    lessonId={lessonId}
                    onComplete={() => console.log("PDF completed")}
                    className="w-full h-full"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Bottom section - Notes and Knowledge Check */}
          <div className="grid grid-cols-2 divide-x divide-white/10 overflow-hidden">
            {/* Notes section */}
            <div className="p-4 grid grid-rows-[auto_1fr_auto] gap-4 overflow-hidden">
              <h2 className="text-lg font-semibold text-white">Notes</h2>
              <Textarea
                placeholder="Take notes for this lesson..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none text-base min-h-0 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Save Notes
              </Button>
            </div>

            {/* Knowledge Check section */}
            <div className="grid grid-rows-[auto_1fr] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Knowledge Check</h2>
              </div>
              <div className="p-4 overflow-auto">
                <div className="space-y-4">
                  {sampleQuiz.map((quiz, questionIndex) => (
                    <div key={questionIndex} className="space-y-3">
                      <p className="text-base font-medium text-white">{quiz.question}</p>
                      <div className="space-y-2">
                        {quiz.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 text-base rounded-lg border border-white/20 cursor-pointer transition-colors text-white ${
                              selectedAnswers[questionIndex] === optionIndex
                                ? "bg-white/20 border-white/40"
                                : "hover:bg-white/10"
                            } ${
                              showResults
                                ? optionIndex === quiz.correctAnswer
                                  ? "bg-green-500/20 border-green-500/50"
                                  : selectedAnswers[questionIndex] === optionIndex
                                  ? "bg-red-500/20 border-red-500/50"
                                  : ""
                                : ""
                            }`}
                            onClick={() => !showResults && handleAnswerSelect(questionIndex, optionIndex)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {!showResults ? (
                    <Button onClick={handleQuizSubmit} className="w-full mt-4 bg-white/20 text-white hover:bg-white/30">
                      Submit Answers
                    </Button>
                  ) : (
                    <div className="text-center mt-4">
                      <p className="text-lg font-medium mb-3 text-white">
                        Score: {selectedAnswers.filter((answer, index) => answer === sampleQuiz[index].correctAnswer).length}/{sampleQuiz.length}
                      </p>
                      <Button onClick={() => setShowResults(false)} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 