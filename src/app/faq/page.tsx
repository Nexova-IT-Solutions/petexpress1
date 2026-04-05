"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState } from "react";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How far in advance should I start planning my pet's relocation?",
      answer: "We highly recommend starting the process at least 4-6 months in advance. Some countries, like Australia or New Zealand, require up to 6 months of preparation due to mandatory quarantine bookings and rabies titer testing."
    },
    {
      question: "What vaccinations are required for international travel out of Sri Lanka?",
      answer: "Requirements vary strictly by the destination country. Generally, a microchip and an up-to-date Rabies vaccination are mandatory. Many countries also require DHLPP for dogs and FVRCP for cats. Our veterinary team will prepare a custom vaccination schedule for you."
    },
    {
      question: "Can I use my own travel crate?",
      answer: "Yes, provided it strictly adheres to IATA (International Air Transport Association) Live Animal Regulations. The pet must be able to stand, sit erect, turn around normally, and lie down in a natural position. If yours doesn't comply, we can build a custom, IATA-approved wooden or plastic crate."
    },
    {
      question: "Will my pet travel in the cabin or cargo?",
      answer: "For most international flights departing Sri Lanka, pets must travel as 'Manifested Cargo' in the pressurized and temperature-controlled cargo hold. Very few airlines allow pets in the cabin, and only for certain routes and small weights."
    },
    {
      question: "Do you handle the customs clearance in the destination country?",
      answer: "Yes, through our network of IPATA-accredited partners worldwide, we provide full door-to-door service, including customs clearance and home delivery in the destination country."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen pb-32">
      <section className="bg-gray-100 text-gray-900 pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase"
          >
            THE <span className="text-brand-red">FAQ</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium uppercase tracking-widest leading-relaxed">
            Find quick answers to common questions about international pet travel.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-20 max-w-4xl">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-muted overflow-hidden divide-y divide-muted">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between p-8 md:p-12 text-left hover:bg-muted/30 transition-colors focus:outline-none group"
              >
                <div className="flex items-center gap-6">
                   <span className={`text-2xl font-black transition-colors ${openIndex === index ? 'text-brand-red' : 'text-zinc-200'}`}>0{index + 1}</span>
                   <h3 className={`text-2xl font-black uppercase tracking-tighter transition-colors ${openIndex === index ? 'text-brand-red' : 'text-brand-black'}`}>{faq.question}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${openIndex === index ? 'bg-brand-red border-brand-red text-white' : 'border-muted text-muted-foreground group-hover:border-brand-red group-hover:text-brand-red'}`}>
                  <ChevronDown 
                    className={`w-6 h-6 transition-transform duration-500 ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden bg-muted/10"
                  >
                    <div className="p-8 md:p-12 pt-0 text-muted-foreground text-lg leading-relaxed max-w-3xl ml-16">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 bg-muted/30 rounded-[40px] text-center"
        >
          <h3 className="text-3xl font-black text-brand-black uppercase tracking-tighter mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-10 text-lg">Our relocation experts are available 24/7 to assist you.</p>
          <a href="/contact" className="inline-flex items-center justify-center font-black uppercase tracking-widest text-sm bg-brand-red text-white px-12 py-6 rounded-full hover:scale-105 transition-transform shadow-xl shadow-brand-red/20 group">
            Contact Experts <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
