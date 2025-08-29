"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white  shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center ">
          <Image
            src="/v-logo.png"
            alt="V"
            width={48}
            height={48}
          />
          <span className="text-2xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
            ECTONIX
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
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
    </nav>
  );
}
