import { getServiceBySlug } from "@/services/api";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const service = await getServiceBySlug(category);
  
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} | PetExpress Sri Lanka`,
    description: service.shortDescription
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const service = await getServiceBySlug(category);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <section className="bg-gray-100 pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading 
            title={service.title} 
            subtitle={service.shortDescription}
            className="mb-0 text-gray-900 max-w-3xl" 
            alignment="center" 
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Available Specialized Services</h2>
          
          {service.subServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.subServices.map((subService) => (
                <Card key={subService.id} className="group hover:-translate-y-1 transition-all h-full flex flex-col">
                  {/* Decorative Header Image */}
                  <div className="h-40 bg-slate-200 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-300/60 mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex items-center p-6 text-white text-sm font-medium">Image Placeholder</div>
                  </div>
                  
                  <CardContent className="pt-6 flex-grow flex flex-col">
                    <CardTitle className="mb-3">{subService.title}</CardTitle>
                    <p className="text-slate-600 mb-6">{subService.description}</p>
                    <ul className="space-y-2 mt-auto">
                      {subService.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-4 border-t border-slate-100">
                    <Link 
                      href={`/services/${service.slug}/${subService.slug}`} 
                      className="inline-flex items-center gap-2 font-semibold text-brand-sky hover:text-brand-orange w-full justify-between"
                    >
                      <span>Explore this route</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-brand-navy">General Service</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                This service category is provided as a unified package. Please contact us directly to arrange this service for your pet's relocation.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-brand-orange text-white hover:bg-brand-orange-accent h-11 px-6 font-medium">
                Get more information
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
