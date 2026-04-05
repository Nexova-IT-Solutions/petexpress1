"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    
    // Simulate API call for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccessMsg("Thank you! Your message has been sent successfully.");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

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
            GET IN <span className="text-brand-red">TOUCH</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium uppercase tracking-widest leading-relaxed">
            We'd love to hear from you. Get in touch with our expert pet relocation consultants.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-muted"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-brand-red"></div>
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Send us a message</span>
            </div>
            
            {successMsg ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 bg-muted/30 text-brand-black rounded-3xl border border-muted font-bold text-center"
              >
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Message Sent!</h3>
                <p className="text-muted-foreground font-medium">{successMsg}</p>
                <Button variant="outline" className="mt-8 rounded-full" onClick={() => setSuccessMsg("")}>Send Another</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-black text-brand-black uppercase tracking-widest mb-3">Full Name</label>
                    <input required id="name" name="name" type="text" className="w-full px-6 py-4 rounded-2xl border border-muted focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all bg-muted/20 font-bold" placeholder="JOHN DOE" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-black text-brand-black uppercase tracking-widest mb-3">Email Address</label>
                    <input required id="email" name="email" type="email" className="w-full px-6 py-4 rounded-2xl border border-muted focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all bg-muted/20 font-bold" placeholder="HELLO@EXAMPLE.COM" />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-[10px] font-black text-brand-black uppercase tracking-widest mb-3">Interested Service</label>
                  <select id="service" name="service" className="w-full px-6 py-4 rounded-2xl border border-muted focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all bg-muted/20 font-bold appearance-none">
                    <option value="">SELECT A SERVICE</option>
                    <option value="export">EXPORTING PETS</option>
                    <option value="import">IMPORTING PETS</option>
                    <option value="crates">TRAVEL CRATES</option>
                    <option value="veterinary">VET SERVICES</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[10px] font-black text-brand-black uppercase tracking-widest mb-3">Message</label>
                  <textarea required id="message" name="message" rows={5} className="w-full px-6 py-4 rounded-2xl border border-muted focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all bg-muted/20 font-bold resize-none" placeholder="HOW CAN WE HELP YOUR PET?"></textarea>
                </div>
                
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full rounded-full py-8 text-xl font-black uppercase tracking-widest group">
                  {isSubmitting ? "SENDING..." : (
                    <>
                      Send Message <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="bg-gray-100 text-gray-900 p-10 md:p-16 rounded-[40px] shadow-2xl shadow-gray-200 border border-gray-300 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-red/20 rounded-full blur-3xl"></div>
              <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">CONTACT <br />INFO</h2>
              
              <div className="flex flex-col gap-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">Call Us</h3>
                    <p className="text-2xl font-black text-white tracking-tighter">+94 77 22 88 181</p>
                    <p className="text-xs text-brand-red font-bold mt-1 uppercase tracking-widest">Mon-Fri: 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">Email Us</h3>
                    <a href="mailto:info@petexpress.lk" className="text-2xl font-black text-white tracking-tighter hover:text-brand-red transition-colors">info@petexpress.lk</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-red transition-colors">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-1">Visit Us</h3>
                    <p className="text-lg font-bold text-white leading-tight uppercase tracking-tighter">
                      Terminal 2, Air Cargo Village,<br />BIA, Katunayake, Sri Lanka.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-80 bg-muted rounded-[40px] border border-muted overflow-hidden relative group">
              <div className="absolute inset-0 bg-gray-300/20 group-hover:bg-gray-200/10 transition-colors duration-700"></div>
              <div className="w-full h-full flex items-center justify-center">
                 <p className="text-white font-black uppercase tracking-widest text-xl rotate-12">BIA LOCATION MAP</p>
              </div>
              <div className="absolute top-4 right-4 bg-brand-red text-white p-3 rounded-2xl shadow-lg">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
