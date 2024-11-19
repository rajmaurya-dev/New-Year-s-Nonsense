"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 md:px-5 bg-white w-full">
        <div className="flex items-center gap-5">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Resolution Hub Logo"
              className="w-auto h-20 md:h-32"
            />
          </Link>
          <nav className="hidden md:flex justify-between items-center gap-10">
            <Link href="#" className="hover:text-orange-600 transition-colors">
              Products
            </Link>
            <Link
              href="#features"
              className="hover:text-orange-600 transition-colors"
            >
              Features
            </Link>
            <Link href="#" className="hover:text-orange-600 transition-colors">
              How it works
            </Link>
            <Link
              href="#faq"
              className="hover:text-orange-600 transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            className="hidden md:block px-4 py-2 bg-orange-600 text-white font-medium rounded-2xl hover:bg-orange-700 transition-colors"
            href="/dashboard"
          >
            Start Free
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="#"
              className="hover:text-orange-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="#features"
              className="hover:text-orange-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="hover:text-orange-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#faq"
              className="hover:text-orange-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              className="w-full px-4 py-2 bg-orange-600 text-white font-medium rounded-2xl hover:bg-orange-700 transition-colors text-center"
              href="/dashboard"
              onClick={() => setIsOpen(false)}
            >
              Start Free
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
