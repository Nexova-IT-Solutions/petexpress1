import { getSubService, getServiceBySlug } from "@/services/api";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileVideo, MessageSquare, Phone } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ category: string, "sub-service": string }> }): Promise<Metadata> {
  const { category, "sub-service": subServiceSlug } = await params;
  const subService = await getSubService(category, subServiceSlug);
  
  if (!subService) return { title: "Service Details Not Found" };
  
  return {
    title: `${subService.title} | PetExpress Sri Lanka`,
    description: subService.description
  };
}

export default async function SubServicePage({ params }: { params: Promise<{ category: string, "sub-service": string }> }) {
  const { category, "sub-service": subServiceSlug } = await params;
  const parentCategory = await getServiceBySlug(category);
  const subService = await getSubService(category, subServiceSlug);

  if (!subService || !parentCategory) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Breadcrumbs & Header */}
      <section className="bg-gray-100 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <Link href={`/services/${category}`} className="inline-flex items-center text-gray-600 hover:text-brand-red mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {parentCategory.title}
          </Link>
          
          <SectionHeading 
            title={subService.title} 
            subtitle="PetExpress end-to-end relocation expertise."
            alignment="left"
            className="text-gray-900 max-w-3xl mb-0" 
          />
        </div>
      </section>

      {/* Content */}
      <section className="-mt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sky/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
              
              <h2 className="text-2xl font-bold text-brand-navy mb-6 relative z-10">Service Overview</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-10 relative z-10">
                {subService.description}
              </p>
              
              <h3 className="text-xl font-bold text-brand-navy mb-6 relative z-10">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {subService.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange shrink-0" />
                    <span className="font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Process Disclaimer */}
              <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">Important Notice</h4>
                <p className="text-amber-800 text-sm">
                  Relocating to certain countries involves mandatory waiting periods post-vaccinations or blood tests (up to 180 days). We highly recommend contacting us well in advance to avoid travel delays.
                </p>
              </div>
            </div>
            
            {/* Sidebar CTA */}
            <div className="space-y-6">
              <div className="bg-gray-100 text-gray-900 rounded-2xl shadow-sm border border-gray-200 p-8 text-center sticky top-28">
                <h3 className="text-2xl font-bold mb-4">Ready to Fly?</h3>
                <p className="text-gray-700 mb-8 max-w-[250px] mx-auto text-sm leading-relaxed">
                  Every pet's travel needs are unique. Let our accredited experts build a customized travel itinerary.
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button variant="primary" className="w-full flex justify-center items-center gap-2">
                    <FileVideo className="w-4 h-4" /> Get Final Quote
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent border-gray-400 text-gray-900 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-500">
                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Us
                  </Button>
                </div>
                
                <hr className="my-8 border-gray-300" />
                
                <div className="text-gray-600 text-sm">Or call us direct</div>
                <div className="flex justify-center items-center gap-2 mt-2 font-bold text-lg">
                  <Phone className="w-5 h-5 text-brand-orange" />
                  <span>+94 77 22 88 181</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
