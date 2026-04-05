"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTeamMembers } from "@/services/api";
import { Award, CheckCircle2, History, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { TeamMember } from "@/types";

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function loadData() {
      const t = await getTeamMembers();
      setTeamMembers(t);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-gray-100 text-gray-900 pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            OUR <span className="text-brand-red">STORY</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium uppercase tracking-widest">
            Dedicated to uniting families with their pets across borders.
          </p>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-square bg-muted rounded-[20%_80%_30%_70%/50%_30%_70%_50%] overflow-hidden border-[16px] border-white shadow-2xl relative">
                <NextImage 
                  src="/images/home/hero-pet.png" 
                  alt="Relocation team" 
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-10 -right-10 bg-brand-red text-white p-10 rounded-full shadow-2xl flex flex-col items-center justify-center aspect-square text-center">
                <span className="block text-4xl font-black leading-none">15+</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Years <br/>Experience</span>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-brand-red"></div>
                <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Founded in 2010</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-brand-black mb-10 tracking-tighter leading-none">
                PASSION FOR <br/>PET LOGISTICS
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                PetExpress Sri Lanka emerged from a genuine passion for animal welfare and a recognized need for professional, transparent pet logistics in South Asia. Over the past decade, we have transported thousands of pets safely across the globe.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-3xl text-brand-black">10,000+</h4>
                    <p className="text-xs font-bold text-brand-red uppercase tracking-widest transition-colors">Pets Relocated</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center shrink-0 text-gray-900 group-hover:scale-110 transition-transform">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-3xl text-brand-black">50+</h4>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Destinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-32 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">OUR ACCREDITATIONS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-20 text-lg">
            We operate strictly under the guidelines of independent global authorities, ensuring the absolute safety, comfort, and dignified treatment of your pets.
          </p>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { label: "IATA Assured", icon: Award },
              { label: "IPATA Member", icon: Award },
              { label: "DEFRA Compliant", icon: Award }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-24 h-24 rounded-2xl bg-brand-red/10 border border-brand-red flex items-center justify-center text-brand-red shadow-lg shadow-brand-red/20">
                  <item.icon className="w-12 h-12" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter">MEET THE EXPERTS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-12">
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id} 
                whileHover={{ y: -10 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-64 h-64 rounded-full bg-muted mb-10 overflow-hidden border-8 border-white shadow-2xl group-hover:border-brand-red transition-all relative">
                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold">
                       IMAGE
                    </div>
                </div>
                <h3 className="text-2xl font-black text-brand-black mb-2 uppercase tracking-tighter">{member.name}</h3>
                <p className="text-brand-red font-black text-xs uppercase tracking-[0.2em] mb-6">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
