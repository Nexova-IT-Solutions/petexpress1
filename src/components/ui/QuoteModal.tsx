"use client";

import { Modal } from "./Modal";
import { Button } from "./Button";
import { PlaneLanding, PlaneTakeoff, ArrowRight } from "lucide-react";
import Link from "next/link";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="How can we help your pet?"
      className="max-w-md"
    >
      <div className="grid gap-4">
        <Link href="/services/import" className="block" onClick={onClose}>
          <div className="group relative flex items-center gap-4 rounded-2xl border-2 border-gray-100 p-5 transition-all hover:border-brand-red hover:bg-brand-red/5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-transform group-hover:scale-110">
              <PlaneLanding className="h-7 w-7" />
            </div>
            <div className="grow">
              <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 group-hover:text-brand-red">
                Bring pets to Sri Lanka
              </h3>
              <p className="text-sm font-medium text-gray-500">
                Importing pets into the country
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand-red" />
          </div>
        </Link>

        <Link href="/services/export" className="block" onClick={onClose}>
          <div className="group relative flex items-center gap-4 rounded-2xl border-2 border-gray-100 p-5 transition-all hover:border-brand-red hover:bg-brand-red/5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-transform group-hover:scale-110">
              <PlaneTakeoff className="h-7 w-7" />
            </div>
            <div className="grow">
              <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 group-hover:text-brand-red">
                Take pets from Sri Lanka
              </h3>
              <p className="text-sm font-medium text-gray-500">
                Exporting pets to international destinations
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand-red" />
          </div>
        </Link>
      </div>
      
      <p className="mt-6 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
        Professional & Accredited Relocation
      </p>
    </Modal>
  );
}
