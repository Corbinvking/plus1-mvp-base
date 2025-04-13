"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Trophy,
  Music,
  Headphones,
  Star,
  GraduationCap,
  Award,
  User,
  Mail,
  MapPin,
  Calendar,
  LayoutDashboard,
  Settings,
  LogOut,
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

const profileItems = [
  {
    title: "Personal Information",
    meta: "Active",
    description: (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/avatars/default.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>john.doe@example.com</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">Music Producer</Badge>
          <Badge variant="secondary">Songwriter</Badge>
        </div>
      </div>
    ),
    icon: <User className="w-4 h-4 text-blue-500" />,
    status: "Verified",
    tags: ["Profile", "Contact"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Current Course",
    meta: "67% Complete",
    description: (
      <div className="space-y-2">
        <div className="text-sm">Music Production Basics</div>
        <Progress value={67} />
        <div className="text-xs text-muted-foreground">8/12 lessons completed</div>
      </div>
    ),
    icon: <Headphones className="w-4 h-4 text-emerald-500" />,
    status: "In Progress",
    tags: ["Learning", "Production"],
  },
  {
    title: "Learning Stats",
    meta: "Last 30 days",
    description: (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold">24</div>
          <div className="text-xs text-muted-foreground">Hours Spent</div>
        </div>
        <div>
          <div className="text-2xl font-bold">4</div>
          <div className="text-xs text-muted-foreground">Courses Enrolled</div>
        </div>
      </div>
    ),
    icon: <GraduationCap className="w-4 h-4 text-purple-500" />,
    tags: ["Statistics", "Progress"],
    colSpan: 2,
  },
  {
    title: "Achievements",
    meta: "3 Badges Earned",
    description: (
      <div className="flex gap-2">
        <Award className="w-6 h-6 text-yellow-500" />
        <Star className="w-6 h-6 text-blue-500" />
        <Trophy className="w-6 h-6 text-emerald-500" />
      </div>
    ),
    icon: <Trophy className="w-4 h-4 text-yellow-500" />,
    status: "Updated",
    tags: ["Rewards", "Badges"],
  },
];

export default function ProfilePage() {
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
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          <BentoGrid items={profileItems} />
        </motion.div>
      </div>
    </div>
  );
} 