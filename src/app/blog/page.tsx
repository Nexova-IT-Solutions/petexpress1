"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/Card";
import { getBlogPosts } from "@/services/api";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadData() {
      const p = await getBlogPosts();
      setPosts(p);
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
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase"
          >
            PET <span className="text-brand-red">GUIDES</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium uppercase tracking-widest leading-relaxed">
            Expert advice and updates from our relocation specialists.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group border-none shadow-2xl shadow-zinc-200/50 rounded-3xl h-full flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                  <div className="h-64 bg-gray-300 relative w-full overflow-hidden">
                     <div className="absolute inset-0 bg-brand-red/20 group-hover:bg-transparent transition-all duration-700"></div>
                     <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs font-black uppercase tracking-widest">Featured Image</div>
                  </div>
                  
                  <CardContent className="pt-8 px-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-6 text-[10px] font-black text-brand-red uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-2 underline decoration-zinc-200"><User className="w-3.5 h-3.5" /> {post.author}</span>
                    </div>
                    
                    <CardTitle className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none text-brand-black group-hover:text-brand-red transition-colors">
                      <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-6 px-8 pb-8 border-t border-muted mt-0">
                    <span className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs text-brand-black w-full group-hover:text-brand-red transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </span>
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
