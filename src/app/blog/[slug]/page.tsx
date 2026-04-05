import { getBlogPostBySlug } from "@/services/api";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | PetExpress Sri Lanka`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full bg-white min-h-screen">
      <section className="bg-gray-100 pt-8 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-brand-red mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Travel Guides
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-600 mb-6">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-700">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="-mt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
             
             {/* Featured Image */}
             <div className="h-64 sm:h-96 bg-gray-300/20 relative w-full overflow-hidden flex items-center justify-center">
                <div className="text-gray-500 font-medium">Image: {post.title}</div>
             </div>

             {/* Content Body */}
             <div 
               className="p-8 md:p-12 prose prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-sky hover:prose-a:text-brand-orange"
               dangerouslySetInnerHTML={{ __html: post.content }}
             />
          </div>
        </div>
      </section>
    </article>
  );
}
