"use client";

import { useState } from "react";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { PDFViewer } from "@/components/course/PDFViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ContentType = "video" | "pdf";

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuiz: Quiz[] = [
  {
    question: "What is the first step in setting up a DAW?",
    options: [
      "Configure audio interface",
      "Install plugins",
      "Create a new project",
      "Set up MIDI devices"
    ],
    correctAnswer: 0
  },
  // Add more quiz questions here
];

export default function CourseLessonPage({ params }: { params: { id: string } }) {
  const [contentType, setContentType] = useState<ContentType>("video");
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold">Course Title</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous Lesson
              </Button>
              <Button size="sm">
                Next Lesson
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Content Section */}
          <Card className="p-4">
            <Tabs value={contentType} onValueChange={(value) => setContentType(value as ContentType)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="video">
                  Video
                </TabsTrigger>
                <TabsTrigger value="pdf">
                  PDF Materials
                </TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="aspect-video">
                <VideoPlayer
                  videoUrl="https://example.com/sample-video.mp4"
                  lessonId={params.id}
                  onComplete={() => console.log("Video completed")}
                />
              </TabsContent>
              <TabsContent value="pdf">
                <div className="h-[60vh]">
                  <PDFViewer
                    pdfUrl="https://example.com/sample.pdf"
                    lessonId={params.id}
                    onComplete={() => console.log("PDF completed")}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Notes & Quiz Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Notes Section */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Notes</h2>
              <Textarea
                placeholder="Take notes for this lesson..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[200px]"
              />
              <Button className="mt-4" variant="outline">
                Save Notes
              </Button>
            </Card>

            {/* Quiz Section */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Knowledge Check</h2>
              <div className="space-y-6">
                {sampleQuiz.map((quiz, questionIndex) => (
                  <div key={questionIndex} className="space-y-4">
                    <p className="font-medium">{quiz.question}</p>
                    <div className="space-y-2">
                      {quiz.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedAnswers[questionIndex] === optionIndex
                              ? "bg-primary/10 border-primary"
                              : "hover:bg-accent"
                          } ${
                            showResults
                              ? optionIndex === quiz.correctAnswer
                                ? "bg-green-100 border-green-500 dark:bg-green-900/20"
                                : selectedAnswers[questionIndex] === optionIndex
                                ? "bg-red-100 border-red-500 dark:bg-red-900/20"
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
                  <Button onClick={handleQuizSubmit} className="w-full">
                    Submit Answers
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">
                      Score: {selectedAnswers.filter((answer, index) => answer === sampleQuiz[index].correctAnswer).length}/{sampleQuiz.length}
                    </p>
                    <Button onClick={() => setShowResults(false)} variant="outline">
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 