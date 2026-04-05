import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Camera, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-900 pt-16 pb-8 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center group mb-4 h-32 bg-white p-6 rounded-2xl shadow-xl">
              <Image 
                src="/images/logo.png" 
                alt="PetExpress Logo" 
                width={374} 
                height={124} 
                className="h-full w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600">
              Your trusted partner for safe, stress-free international pet relocation to and from Sri Lanka. IATA and IPATA accredited.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="text-gray-600 hover:text-brand-red transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-brand-red transition-colors">Our Services</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-brand-red transition-colors">Pet Travel Guides</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-brand-red transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Key Services</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services/export" className="text-gray-600 hover:text-brand-red transition-colors">Export Pets</Link></li>
              <li><Link href="/services/import" className="text-gray-600 hover:text-brand-red transition-colors">Import Pets</Link></li>
              <li><Link href="/services/consultancy" className="text-gray-600 hover:text-brand-red transition-colors">Consultancy</Link></li>
              <li><Link href="/services/veterinary" className="text-gray-600 hover:text-brand-red transition-colors">Veterinary Support</Link></li>
              <li><Link href="/services/crates" className="text-gray-600 hover:text-brand-red transition-colors">Travel Crates</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span>Terminal 2, Air Cargo Village, BIA, Katunayake, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <span>+94 77 22 88 181</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-brand-red shrink-0" />
                <a href="mailto:info@petexpress.lk" className="hover:text-brand-red transition-colors">info@petexpress.lk</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
          <p>&copy; {currentYear} PetExpress Sri Lanka. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-red transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
