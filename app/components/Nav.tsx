"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-3xl tracking-wide bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
  S.A.H CC&amp;S
</span>

        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/admin"
            className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow-sm"
          >
            Admin
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/me.png"
              alt="Developer"
              width={40}
              height={40}
              className="rounded-full border shadow-sm"
            />
            <span className="font-medium text-gray-700">
              Developed by Hasan Rafay
            </span>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          className="text-black md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28}  />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="text-black md:hidden bg-blue-300 border-t shadow-lg">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
            >
              Admin
            </Link>
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/me.png"
                alt="Developer"
                width={50}
                height={50}
                className="rounded-full border shadow-sm"
              />
              <span className="font-medium text-gray-700 text-sm">
                Developed by Hasan Rafay
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
