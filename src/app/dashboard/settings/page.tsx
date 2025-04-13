"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  BookOpen,
  User,
  Moon,
  Sun,
  Globe,
  Bell,
  Shield,
  Palette,
  Github,
  Music,
  YoutubeIcon,
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

const settingsItems = [
  {
    title: "Appearance",
    meta: "Customize",
    description: "Customize the appearance of your dashboard",
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light Mode</span>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Custom Theme</span>
          </div>
          <Switch />
        </div>
      </div>
    ),
    icon: <Moon className="w-4 h-4 text-purple-500" />,
    status: "Active",
    tags: ["Theme", "Display"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Notifications",
    meta: "Configure",
    description: "Manage your notification preferences",
    content: (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Course Updates</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span>New Features</span>
          <Switch />
        </div>
      </div>
    ),
    icon: <Bell className="w-4 h-4 text-yellow-500" />,
    status: "Updated",
    tags: ["Alerts", "Email"],
  },
  {
    title: "Integrations",
    meta: "Connect",
    description: "Connect with external services and apps",
    content: (
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Music className="h-4 w-4" />
          <span>Spotify</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <YoutubeIcon className="h-4 w-4" />
          <span>YouTube</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Music className="h-4 w-4" />
          <span>DAW</span>
        </Button>
      </div>
    ),
    icon: <Globe className="w-4 h-4 text-blue-500" />,
    tags: ["Apps", "Services"],
    colSpan: 2,
  },
  {
    title: "Security",
    meta: "Manage",
    description: "Configure your security settings",
    content: (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Two-Factor Auth</span>
          <Switch />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Change Password
        </Button>
      </div>
    ),
    icon: <Shield className="w-4 h-4 text-emerald-500" />,
    status: "Secure",
    tags: ["Security", "Privacy"],
  },
];

export default function SettingsPage() {
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
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <BentoGrid items={settingsItems.map(item => ({
            ...item,
            description: (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425] mb-4">
                  {item.description}
                </p>
                {item.content}
              </>
            )
          }))} />
        </motion.div>
      </div>
    </div>
  );
} 