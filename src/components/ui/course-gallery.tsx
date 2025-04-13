"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CourseModal } from "@/components/courses/CourseModal";

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
  level?: string;
  contentType?: 'video' | 'pdf';
  contentUrl?: string;
}

export interface CourseGalleryProps {
  title?: string;
  description?: string;
  items: CourseItem[];
}

const demoData: CourseItem[] = [
  {
    id: "music-production",
    title: "Music Production Fundamentals",
    description:
      "Learn the basics of music production, from setting up your DAW to mixing and mastering your first track.",
    image: "/course-thumbnails/music-production.jpg",
    duration: "8 weeks",
    level: "Beginner",
    contentType: "video",
    contentUrl: "https://www.youtube.com/embed/Ke90Tje7VS0"
  },
  {
    id: "songwriting",
    title: "Songwriting Essentials",
    description:
      "Master the art of songwriting with practical exercises and professional techniques.",
    image: "/course-thumbnails/songwriting.jpg",
    duration: "6 weeks",
    level: "Intermediate",
    contentType: "video",
    contentUrl: "https://www.youtube.com/embed/mTz0GXj8NwE"
  },
  {
    id: "mixing",
    title: "Professional Mixing Techniques",
    description:
      "Take your mixing skills to the next level with industry-standard practices and tools.",
    image: "/course-thumbnails/mixing.jpg",
    duration: "10 weeks",
    level: "Advanced",
    contentType: "video",
    contentUrl: "https://www.youtube.com/embed/BwuLxPH8IDs"
  },
  {
    id: "marketing",
    title: "Music Marketing Mastery",
    description:
      "Learn how to promote your music effectively and build your audience in the digital age.",
    image: "/course-thumbnails/marketing.jpg",
    duration: "4 weeks",
    level: "Intermediate",
    contentType: "video",
    contentUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8"
  }
];

export function CourseGallery({
  title = "Featured Courses",
  description,
  items = demoData,
}: CourseGalleryProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });

    carouselApi.on("reInit", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });

    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, [carouselApi]);

  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium md:text-3xl">
            {title}
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <button 
                  onClick={() => setSelectedCourse(item)}
                  className="group block h-full w-full"
                >
                  <div className="relative overflow-hidden rounded-xl h-[400px]">
                    <div className="h-[250px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 text-xs text-white/80 mb-3">
                        {item.duration && (
                          <span className="rounded-full bg-white/20 px-2.5 py-1">
                            {item.duration}
                          </span>
                        )}
                        {item.level && (
                          <span className="rounded-full bg-white/20 px-2.5 py-1">
                            {item.level}
                          </span>
                        )}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-white line-clamp-2">{item.title}</h3>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-200/90">
                        {item.description}
                      </p>
                      <div className="flex items-center text-sm text-white/90 font-medium">
                        Start Learning
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedCourse && (
        <CourseModal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          courseId={selectedCourse.id}
          lessonId="lesson-1"
          contentType={selectedCourse.contentType || 'video'}
          contentUrl={selectedCourse.contentUrl || 'https://example.com/default.mp4'}
        />
      )}
    </section>
  );
} 