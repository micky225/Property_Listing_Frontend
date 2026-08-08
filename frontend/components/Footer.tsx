'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Property Finds</h3>
            <p className="opacity-90">
              Your trusted partner in finding the perfect property in Ghana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link href="/" className="hover:opacity-100 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:opacity-100 transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:opacity-100 transition">
                  Saved
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-bold mb-4">Property Types</h4>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link href="/properties?type=house" className="hover:opacity-100 transition">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=apartment" className="hover:opacity-100 transition">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=commercial" className="hover:opacity-100 transition">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/properties?type=land" className="hover:opacity-100 transition">
                  Land
                </Link>
              </li>
              <li>
                <Link href="/properties?type=car" className="hover:opacity-100 transition">
                  Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 opacity-90">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+233 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@propertyfinds.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Accra, Ghana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center opacity-90">
          <p>&copy; 2024 Property Finds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
