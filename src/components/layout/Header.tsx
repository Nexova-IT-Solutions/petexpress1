"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

import { Sidebar } from "./Sidebar";
import { QuoteModal } from "@/components/ui/QuoteModal";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Logo Only */}
        <Link href="/" className="flex items-center lg:hidden group h-20">
          <Image 
            src="/images/logo.png" 
            alt="PetExpress Logo" 
            width={312} 
            height={124} 
            className="h-full w-auto object-contain"
            priority
          />
        </Link>
        
        {/* Spacer for desktop */}
        <div className="hidden lg:block"></div>

        {/* Global Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-6">
             <a href="tel:+94772288181" className="text-zinc-500 hover:text-brand-red font-bold text-sm transition-colors uppercase tracking-widest">Call Us</a>
             <Link href="/contact" className="text-zinc-500 hover:text-brand-red font-bold text-sm transition-colors uppercase tracking-widest">Support</Link>
          </div>
          
          <Button 
            variant="primary" 
            className="rounded-full px-8 py-6 text-sm font-black uppercase tracking-tighter shadow-lg shadow-brand-red/20 hover:scale-105 active:scale-95 transition-transform"
            onClick={() => setIsQuoteModalOpen(true)}
          >
            Get a Quote
          </Button>

          <button
            className="lg:hidden text-gray-600 hover:text-brand-red p-2 bg-gray-200 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar overlay */}
      {isMobileMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 top-20 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="lg:hidden fixed top-20 left-0 right-0 z-50 bg-white h-[calc(100vh-80px)] overflow-y-auto">
            <Sidebar className="w-full border-none" onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </>
      )}

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </header>
  );
}
