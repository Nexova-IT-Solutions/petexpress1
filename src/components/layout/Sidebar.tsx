"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Info, 
  Settings, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Globe2,
  Plane
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { 
      name: "Services", 
      href: "/services", 
      icon: Settings,
      submenu: [
        { name: "Export from Sri Lanka", href: "/services/export", icon: Plane },
        { name: "Import to Sri Lanka", href: "/services/import", icon: Globe2 },
        { name: "Pet Consultancy", href: "/services/consultancy", icon: Info },
      ]
    },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Pet Blog", href: "/blog", icon: FileText },
    { name: "FAQ Centre", href: "/faq", icon: HelpCircle },
  ];

  return (
    <aside className={`flex flex-col h-full bg-white text-gray-900 border-r border-gray-200/50 group/sidebar ${className}`}>
      {/* 1. Header (Logo Stays White) */}
      <div className="bg-white h-20 flex items-center justify-center p-4 border-b border-gray-200 shadow-sm transition-colors duration-500">
        <Link href="/" className="relative group/logo h-full flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="h-full flex items-center"
          >
            <Image 
              src="/images/logo.png" 
              alt="PetExpress Logo" 
              width={332} 
              height={124} 
              className="h-20 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>
      </div>

      {/* 2. Navigation Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-10 px-4 space-y-1.5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.submenu && pathname.startsWith(link.href));
          
          if (link.submenu) {
            return (
              <div key={link.name} className="flex flex-col">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all relative group ${
                    isActive ? "text-gray-900 bg-gray-100/40" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/20"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1.5 h-8 bg-brand-red rounded-r-full"
                    />
                  )}
                  
                  <div className="flex items-center gap-5">
                    <link.icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-red" : "group-hover:text-brand-red"}`} />
                    <span className="font-black uppercase tracking-tighter text-md">{link.name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col pl-6 mt-1 space-y-1"
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={onNavigate}
                          className={`flex items-center gap-4 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all group/sub ${
                            pathname === sub.href ? "text-brand-red scale-105" : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <sub.icon className={`w-3.5 h-3.5 transition-colors ${pathname === sub.href ? "text-brand-red" : "text-gray-500 group-hover/sub:text-gray-700"}`} />
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-5 px-6 py-4 rounded-xl transition-all relative group ${
                isActive ? "text-gray-900 bg-gray-100/40" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/20"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1.5 h-8 bg-brand-red rounded-r-full"
                />
              )}
              
              <link.icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-red" : "group-hover:text-brand-red"}`} />
              <span className="font-black uppercase tracking-tighter text-md">{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* 3. Utility Footer (Premium Style) */}
      <div className="p-8 pt-6 border-t border-gray-200/50 bg-gray-50/50 backdrop-blur-md">
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gray-100/30 hover:bg-gray-200/60 transition-all border border-gray-200/50 hover:border-brand-red/20 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-red border border-gray-300 transition-transform group-hover/item:scale-110">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest leading-none mb-1">Call Booking</span>
              <span className="text-xs font-black text-gray-900 group-hover/item:text-brand-red">+94 77 22 88 181</span>
            </div>
          </div>

          <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gray-100/30 hover:bg-gray-200/60 transition-all border border-gray-200/50 hover:border-brand-red/20 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-600 group-hover/item:text-brand-red border border-gray-300 transition-transform group-hover/item:scale-110">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest leading-none mb-1">Email Enquiry</span>
              <span className="text-xs font-black text-gray-900 group-hover/item:text-brand-red">info@petexpress.lk</span>
            </div>
          </div>
        </div>

        <Button variant="primary" className="w-full rounded-2xl py-8 text-lg font-black uppercase tracking-tighter shadow-[0_10px_30px_rgba(238,29,35,0.15)] group relative overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>
    </aside>
  );
}
