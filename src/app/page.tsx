"use client";

import Link from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { getServices, getTestimonials } from "@/services/api";
import { Star, ShieldCheck, Heart, Plane, Shield, Globe2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { ServiceCategory, Testimonial } from "@/types";

export default function Home() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function loadData() {
      const s = await getServices();
      const t = await getTestimonials(3);
      setServices(s);
      setTestimonials(t);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-brand-black uppercase">
                Moving your furry <br/>
                <span className="text-brand-red">friends safely</span> <br/>
                across the globe.
              </h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg">
                IATA and IPATA accredited professional door-to-door pet transportation. We handle everything from veterinary protocols to customs clearance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" variant="primary" className="rounded-full px-10">
                  Read More
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square w-full max-w-[600px] mx-auto lg:ml-auto"
            >
              {/* Blob Shape Background */}
              <div className="absolute inset-0 bg-brand-red/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-blob animate-pulse"></div>
              <div className="absolute inset-4 bg-brand-red rounded-[60%_40%_30%_70%/50%_30%_70%_50%] overflow-hidden border-[12px] border-white shadow-2xl">
                <NextImage 
                  src="/images/home/hero-pet.png" 
                  alt="Happy dog and cat" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-muted flex items-center gap-4 hidden md:flex"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-brand-red">
                  <Star className="fill-brand-red text-brand-red" />
                </div>
                <div>
                  <div className="text-brand-black font-bold text-lg">Top Rated</div>
                  <div className="text-muted-foreground text-sm">#1 Relocation Service</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Observation / Services Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Icons */}
            <div className="space-y-16">
              {[
                { title: "Observation", desc: "Constant monitoring of your pet's comfort and well-being during transist.", icon: Globe2 },
                { title: "Behaviour Analysis", desc: "Pre-travel temperament assessment for a stress-free journey.", icon: Heart },
                { title: "Introduction", desc: "Expert handling during initial travel prep and crate acclimation.", icon: Plane }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20 group-hover:scale-110 transition-transform">
                    <item.icon className="text-white w-6 h-6" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center Image */}
            <div className="relative aspect-square w-full max-w-[400px] mx-auto hidden lg:block">
              <div className="absolute inset-0 bg-muted rounded-full"></div>
              <NextImage 
                src="/images/home/hero-pet.png" 
                alt="Pet training" 
                fill
                className="object-contain p-8 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Right Icons */}
            <div className="space-y-16">
              {[
                { title: "Relocation Training", desc: "Specialized prep for long-haul flights and international entry.", icon: ShieldCheck },
                { title: "Implementation", desc: "Flawless execution of veterinary and customs protocols.", icon: Shield },
                { title: "Control & Evaluation", desc: "Real-time updates and post-arrival care checks.", icon: Star }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20 group-hover:scale-110 transition-transform">
                    <item.icon className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square w-full"
            >
              <div className="absolute inset-4 bg-gray-300 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] rotate-6 overflow-hidden">
                <NextImage 
                  src="/images/home/hero-pet.png" 
                  alt="Relocation team" 
                  fill
                  className="object-cover -rotate-6 scale-110"
                />
              </div>
              <div className="absolute top-10 left-10 w-full h-full border-4 border-brand-red rounded-[30%_70%_70%_30%/30%_30%_70%_70%] -z-10 rotate-12"></div>
            </motion.div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-brand-red"></div>
                <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Why Choose Us</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-brand-black mb-12 tracking-tighter leading-none">
                OUR PET <br/>EXPERTISE
              </h2>
              
              <div className="space-y-10">
                {[
                  "We Succeeded in The Mental Formation of Pets during travel.",
                  "We Make Your Relationship With Your Pet Harmonious.",
                  "We Develop Your Pet's Intellectual Ability & Comfort.",
                  "We Stimulate The Ability To Increase Your Pet's Potential."
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-8 group"
                  >
                    <span className="text-5xl font-black text-brand-red/20 group-hover:text-brand-red transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <p className="text-xl font-bold text-brand-black leading-tight group-hover:translate-x-2 transition-transform">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" variant="primary" className="mt-16 rounded-full px-12 group">
                Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter underline decoration-brand-red decoration-8 underline-offset-8">
              TESTIMONIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="border-none shadow-2xl shadow-zinc-200/50 p-4 rounded-3xl h-full flex flex-col hover:scale-[1.02] transition-transform duration-500">
                  <CardHeader>
                    <div className="flex text-brand-red mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-zinc-600 text-lg italic leading-relaxed mb-8">"{testimonial.content}"</p>
                  </CardContent>
                  <CardFooter className="border-t border-muted pt-6 mt-0">
                    <div>
                      <h4 className="font-black text-brand-black text-lg uppercase">{testimonial.authorName}</h4>
                      <p className="text-xs text-brand-red font-bold uppercase tracking-widest">{testimonial.authorLocation}</p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none"
          >
            READY TO <br/>RELOCATE?
          </motion.h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl font-bold uppercase tracking-widest">
            Expert consultants waiting to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" className="bg-white text-brand-red hover:bg-zinc-100 rounded-full px-16 py-8 text-xl font-black uppercase tracking-tighter">
              Get a Quote
            </Button>
            <Button size="lg" className="bg-brand-red text-white hover:bg-brand-red/90 rounded-full px-16 py-8 text-xl font-black uppercase tracking-tighter border-none">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
