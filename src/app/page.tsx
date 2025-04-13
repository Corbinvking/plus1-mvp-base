"use client"

import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "@/components/ui/text-rotate"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1516967124798-10656f7dca28?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "eberhard grossgasteiger",
    title: "Mountain range",
  },
  {
    url: "https://images.unsplash.com/photo-1531816484220-16b56927746c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Luke Stackpoole",
    title: "Road between trees",
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Taras Zaluzhnyi",
    title: "Mountain near lake",
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "v2osk",
    title: "Lake between mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "v2osk",
    title: "House near lake",
  },
  {
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Johannes Plenio",
    title: "Pathway between green grass field",
  }
]

// Define courses before using it
const courses = [
  {
    id: "music-production",
    title: "Music Production Masterclass",
    thumbnail: "/course-thumbnails/music-production.jpg",
  },
  {
    id: "songwriting",
    title: "Songwriting for Beginners",
    thumbnail: "/course-thumbnails/songwriting.jpg",
  },
  {
    id: "mixing-mastering",
    title: "Mixing and Mastering Techniques",
    thumbnail: "/course-thumbnails/mixing.jpg",
  },
  {
    id: "music-marketing",
    title: "Music Marketing Fundamentals",
    thumbnail: "/course-thumbnails/marketing.jpg",
  },
  {
    id: "advanced-sound-design",
    title: "Advanced Sound Design",
    thumbnail: "/course-thumbnails/sound-design.jpg",
  },
];

// Define a simple type for Course to satisfy TypeScript
type Course = {
  id: string;
  title: string;
  thumbnail: string;
};

const courseImageUrls = courses.map((course: Course) => course.thumbnail); // Added type : Course
const fallbackImageUrls = exampleImages.map(img => img.url);

// Function to handle smooth scroll
const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.preventDefault();
  const targetId = e.currentTarget.href.split('#')[1];
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Home() {
  return (
    // Wrap in a Fragment to return multiple sections
    <>
      {/* Hero Section */}
      <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
        <Floating sensitivity={-0.5} className="h-full">
          <FloatingElement
            depth={0.5}
            className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
          >
            <motion.img
              src={courses[0]?.thumbnail || exampleImages[0].url} // Reverted back to check course images
              alt={courses[0]?.title || exampleImages[0].title}
              className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={1}
            className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
          >
            <motion.img
              src={courses[1]?.thumbnail || exampleImages[1].url}
              alt={courses[1]?.title || exampleImages[1].title}
              className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={4}
            className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
          >
            <motion.img
              src={courses[2]?.thumbnail || exampleImages[2].url}
              alt={courses[2]?.title || exampleImages[2].title}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={2}
            className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
          >
            <motion.img
              src={courses[3]?.thumbnail || exampleImages[3].url}
              alt={courses[3]?.title || exampleImages[3].title}
              className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            />
          </FloatingElement>

          <FloatingElement
            depth={1}
            className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
          >
            <motion.img
              src={courses[4]?.thumbnail || exampleImages[4].url}
              alt={courses[4]?.title || exampleImages[4].title}
              className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            />
          </FloatingElement>
        </Floating>

        {/* Hero Content */}
        <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          >
            <span>Unlock your</span>
            <LayoutGroup>
              <motion.span layout className="flex whitespace-pre">
                <motion.span
                  layout
                  className="flex whitespace-pre"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                >
                  potential{" "}
                </motion.span>
                <TextRotate
                  texts={[
                    "artistically",
                    "creatively",
                    "musically",
                    "✨ magically",
                    "💫 uniquely",
                    "🎨 powerfully",
                    "🌟 limitlessly",
                    "🔥 masterfully",
                    "🌈 vibrantly",
                    "🚀 boldly",
                  ]}
                  mainClassName="overflow-hidden pr-3 text-[#0015ff] py-0 pb-2 md:pb-4 rounded-xl"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </motion.span>
            </LayoutGroup>
          </motion.h1>
          <motion.p
            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
          >
            The premier learning platform for artists. Elevate your craft,
            connect with peers, and grow your career.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
            {/* Login Button */}
            <motion.button
              className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-[#0015ff] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.7,
                scale: { duration: 0.2 },
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <a href="/login">
                Login <span className="font-serif ml-1">→</span>
              </a>
            </motion.button>
            {/* Browse Courses Button (Updated for scroll) */}
            <motion.button
              className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-background bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.7,
                scale: { duration: 0.2 },
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 30, stiffness: 400 },
              }}
            >
              <a href="#course-carousel" onClick={handleScroll}>Browse Courses</a>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Carousel Section (Now outside the hero section) */}
      <section id="course-carousel" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12">Explore Our Courses</h2>
          <div className="w-full max-w-7xl mx-auto">
            <ThreeDPhotoCarousel imageUrls={fallbackImageUrls} />
          </div>
        </div>
      </section>
    </>
  )
}
