"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { getServices } from "@/services/api";
import Link from "next/link";
import { PlaneTakeoff, PlaneLanding, Package, Stethoscope, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ServiceCategory } from "@/types";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  "PlaneTakeoff": <PlaneTakeoff className="w-8 h-8" />,
  "PlaneLanding": <PlaneLanding className="w-8 h-8" />,
  "Package": <Package className="w-8 h-8" />,
  "Stethoscope": <Stethoscope className="w-8 h-8" />
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    async function loadData() {
      const s = await getServices();
      setServices(s);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="bg-gray-100 text-gray-900 pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            OUR <span className="text-brand-red">SERVICES</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium uppercase tracking-widest">
            Comprehensive pet travel solutions tailored to your unique requirements.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group border-none shadow-2xl shadow-zinc-200/50 p-4 rounded-3xl h-full flex flex-col hover:scale-[1.02] transition-transform duration-500">
                  <CardHeader className="flex flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-brand-red flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-red/20 group-hover:scale-110 transition-transform">
                      {iconMap[service.icon] || <PlaneTakeoff className="w-10 h-10" />}
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-black uppercase tracking-tighter text-brand-black group-hover:text-brand-red transition-colors">{service.title}</CardTitle>
                      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mt-2">{service.subServices.length} CATEGORIES</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow pt-4">
                    <CardDescription className="text-lg text-gray-700 leading-relaxed">
                      {service.shortDescription}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="border-t border-muted pt-6 mt-0">
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-sm text-brand-black group-hover:text-brand-red transition-colors"
                    >
                      Explore Service
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
