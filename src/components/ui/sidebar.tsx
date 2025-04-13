"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LucideIcon, LayoutDashboard, BookOpen, User, Settings, LogOut } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

interface Links {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

const links: Links[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    label: "My Learning",
    icon: BookOpen,
    href: "/dashboard/learning"
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings"
  },
  {
    label: "Logout",
    icon: LogOut,
    href: "/auth/logout"
  }
];

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 h-screen hidden md:flex md:flex-col bg-white dark:bg-gray-900 flex-shrink-0 border-r border-gray-200 dark:border-gray-800",
        "transition-all duration-300 ease-in-out",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "72px") : "300px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Logo />
        </div>
        <nav className="mt-8 flex-1 space-y-2">
          {links.map((link) => (
            <SidebarLink 
              key={link.label} 
              link={link}
            />
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-800"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-gray-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-gray-600 dark:text-gray-300 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => (
                  <SidebarLink 
                    key={link.label} 
                    link={link}
                  />
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const Icon = link.icon;
  
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center py-2 text-sm font-medium rounded-lg relative",
        "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
        "dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
        "transition-colors duration-150 ease-in-out",
        open ? "px-4" : "px-6",
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <motion.span
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          width: animate ? (open ? "auto" : 0) : "auto",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "ml-3 whitespace-pre",
          !open && "hidden"
        )}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

// Logo component
const Logo = () => {
  const { open } = useSidebar();
  
  return (
    <Link href="/dashboard" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-xl">P</span>
      </div>
      <motion.span
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: open ? 1 : 0,
          width: open ? "auto" : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="font-bold text-gray-900 dark:text-white truncate"
      >
        Plus1
      </motion.span>
    </Link>
  );
};

export const SidebarTrigger = () => {
  const { open, setOpen } = useSidebar();
  const [isOpen, setIsOpen] = useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setOpen(!open);
  };

  return (
    <button
      type="button"
      className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
      onClick={toggleSidebar}
    >
      <span className="sr-only">Open sidebar</span>
      <Menu className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}; 