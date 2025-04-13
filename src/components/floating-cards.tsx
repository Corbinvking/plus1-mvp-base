"use client"

import { motion } from "framer-motion"

const cards = [
  { color: "from-pink-200 to-blue-200", rotation: -15, x: "10%", y: "10%" },
  { color: "from-blue-200 to-cyan-200", rotation: 15, x: "80%", y: "20%" },
  { color: "from-orange-200 to-red-200", rotation: -10, x: "20%", y: "70%" },
  { color: "from-purple-200 to-pink-200", rotation: 20, x: "70%", y: "60%" },
]

export function FloatingCards() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`absolute w-64 h-40 rounded-xl bg-gradient-to-br ${card.color} opacity-50`}
          initial={{ 
            x: card.x, 
            y: card.y, 
            rotate: card.rotation,
            scale: 0
          }}
          animate={{ 
            scale: 1,
            y: [card.y, `calc(${card.y} - 20px)`, card.y],
            rotate: [card.rotation, card.rotation + 5, card.rotation],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  )
} 