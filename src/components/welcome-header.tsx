"use client"

import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "@/components/ui/text-rotate"

export function WelcomeHeader() {
  return (
    <div className="w-full text-2xl sm:text-3xl flex flex-row items-center justify-center font-light mb-4">
      <LayoutGroup>
        <motion.div className="flex whitespace-pre" layout>
          <motion.span
            className="pt-0.5"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            Welcome to{" "}
          </motion.span>
          <TextRotate
            texts={[
              "Plus1 MVP!",
              "the future ✨",
              "innovation 🚀",
              "excellence 💫",
              "success 🎯",
            ]}
            mainClassName="text-white px-2 bg-primary overflow-hidden py-0.5 justify-center rounded-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.div>
      </LayoutGroup>
    </div>
  )
} 