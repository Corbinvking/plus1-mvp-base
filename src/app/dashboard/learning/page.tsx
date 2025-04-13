"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  BookOpen,
  User,
  Headphones,
  Music,
  Play,
  Clock,
  Star,
  Award,
  BookMarked,
  GraduationCap,
  Mic2,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: "/dashboard",
  },
  {
    title: "My Learning",
    icon: <BookOpen className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: "/dashboard/learning",
  },
  {
    title: "Profile",
    icon: <User className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    icon: <Settings className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: "/dashboard/settings",
  },
  {
    title: "Logout",
    icon: <LogOut className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: "/auth/logout",
  },
];

const learningItems = [
  {
    title: "Current Course",
    meta: "In Progress",
    description: (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <Headphones className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Music Production Basics</h3>
            <div className="text-sm text-muted-foreground">8/12 lessons completed</div>
          </div>
        </div>
        <Progress value={67} />
        <Button className="w-full">Continue Learning</Button>
      </div>
    ),
    icon: <Play className="w-4 h-4 text-blue-500" />,
    status: "67% Complete",
    tags: ["Production", "DAW"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Next Up",
    meta: "Recommended",
    description: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-purple-500" />
          <span>Advanced Mixing Techniques</span>
        </div>
        <div className="flex items-center gap-2">
          <Mic2 className="h-4 w-4 text-emerald-500" />
          <span>Vocal Production</span>
        </div>
      </div>
    ),
    icon: <BookMarked className="w-4 h-4 text-purple-500" />,
    status: "New",
    tags: ["Upcoming", "Featured"],
  },
  {
    title: "Learning Path",
    meta: "Music Production",
    description: (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>Beginner</span>
          <Badge variant="secondary">Completed</Badge>
        </div>
        <Progress value={100} />
        <div className="flex justify-between items-center">
          <span>Intermediate</span>
          <Badge variant="secondary">In Progress</Badge>
        </div>
        <Progress value={45} />
        <div className="flex justify-between items-center">
          <span>Advanced</span>
          <Badge variant="secondary">Locked</Badge>
        </div>
        <Progress value={0} />
      </div>
    ),
    icon: <GraduationCap className="w-4 h-4 text-emerald-500" />,
    tags: ["Progress", "Path"],
    colSpan: 2,
  },
  {
    title: "Recent Achievements",
    meta: "Last Week",
    description: (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Award className="h-8 w-8 text-yellow-500" />
          <span className="text-xs mt-1">Course</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="h-8 w-8 text-blue-500" />
          <span className="text-xs mt-1">Skills</span>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="h-8 w-8 text-green-500" />
          <span className="text-xs mt-1">Time</span>
        </div>
      </div>
    ),
    icon: <Award className="w-4 h-4 text-yellow-500" />,
    status: "New",
    tags: ["Rewards", "Progress"],
  },
];

export default function LearningPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Dock className="items-center py-2">
          {navigationItems.map((item, idx) => (
            <Link href={item.href} key={idx}>
              <DockItem
                className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800"
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            </Link>
          ))}
        </Dock>
      </div>
      
      <div className="container mx-auto p-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6">My Learning</h1>
          <BentoGrid items={learningItems} />
        </motion.div>
      </div>
    </div>
  );
} 