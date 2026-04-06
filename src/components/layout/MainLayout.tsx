"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-dvh flex font-sans bg-white overflow-x-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen && isDesktop ? 320 : 0,
          opacity: isSidebarOpen && isDesktop ? 1 : 0,
        }}
        className={cn(
          "hidden lg:flex fixed h-screen top-0 left-0 z-50 shadow-2xl bg-white border-r border-gray-200/50 overflow-hidden",
        )}
      >
        <div className="w-[320px] h-full shrink-0">
          <Sidebar
            className="w-full border-none"
            onNavigate={() => {}}
          />
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.div
        initial={false}
        animate={{
          marginLeft: isSidebarOpen && isDesktop ? 320 : 0,
        }}
        className="flex-1 flex flex-col min-h-screen relative transition-all duration-300 ease-in-out"
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 flex flex-col w-full relative group/main">
          {children}
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
