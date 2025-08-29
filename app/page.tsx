"use client";

import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "./components/WhatsAppButton";
import { useState } from "react";

// Accordion Item Component
const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <button
        className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center hover:bg-gray-800 transition-colors duration-300"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span className="ml-2 text-yellow-400 font-bold">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-6 py-4 border-t border-gray-700 text-yellow-300">{children}</div>}
    </div>
  );
};

export default function Home() {
  return (
    <div className="font-sans scroll-smooth">
      <WhatsAppButton />

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center bg-no-repeat py-10 md:py-35 text-center text-white"
        style={{ backgroundImage: "url('/herobackground-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-4 animate-fadeIn">
          <h1 className="text-green-100 text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            GOVT. DEGREE COLLEGE MALIR CANTT
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 drop-shadow-md">
            ENTRY PASS FORM FOR COLLEGE STUDENTS
          </p>
          <span className="inline-block bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-6 py-3 rounded-lg uppercase font-semibold tracking-wider shadow-lg animate-bounce">
            Read Instructions Carefully ⬇️
          </span>
        </div>
      </header>

      {/* Instructions Section */}
      <section className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 grid gap-6 md:grid-cols-1">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
            INSTRUCTIONS
          </h2>

          <AccordionItem title="Fill in Your Details Clearly">
            <ul className="list-disc list-inside space-y-2">
              <li>Roll Number</li>
              <li>Student Name</li>
              <li>Father Name</li>
              <li>Form “B” / CNIC Number</li>
              <li>Cell Number</li>
              <li>Full Address</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="Attach Required Documents (1 Copy Each)">
            <ul className="list-disc list-inside space-y-2">
              <li>College ID Card</li>
              <li>B-Form / CNIC</li>
              <li>SECCAP Admission Form (for XI students)</li>
              <li>Permission Letter (if applicable)</li>
              <li>Expired Malir Cantt. Entry Pass (for renewal)</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="Important Notes & Submission">
            <ul className="list-disc list-inside space-y-2">
              <li>Attach all documents on the back of the form; otherwise it will be canceled.</li>
              <li>Entry pass is issued only to college students.</li>
              <li>Ensure all details are correct and legible.</li>
              <li>Submit the filled form with documents to the designated office.</li>
              <li>Keep the receipt safe; it expires in 30 days.</li>
              <li>If lost, an FIR must be filed.</li>
            </ul>
          </AccordionItem>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Link
              href="/form"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg uppercase font-semibold transition-all duration-300 shadow-lg hover:scale-105 text-center"
            >
              Fill the Form
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-3 rounded-lg uppercase font-semibold transition-all duration-300 shadow-lg hover:scale-105 text-center"
            >
              Watch Video
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Hasan Rafay", role: "Full Stack Developer | AI Engineer", img: "/me.png", link: "https://www.linkedin.com/in/hasanrafay/" },
              { name: "Syed Younus", role: "Director", img: "/younus.jpeg" },
              { name: "Syed Ali Hamzah", role: "Graphic Designer", img: "/ali.jpeg" },
            ].map((person, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center hover:scale-105 transform transition-transform">
                <Image src={person.img} alt={person.name} width={100} height={100} className="rounded-full mx-auto mb-4" />
                {person.link ? (
                  <Link href={person.link} className="text-blue-600 font-semibold hover:underline block mb-2">
                    {person.name}
                  </Link>
                ) : (
                  <h3 className="text-gray-800 font-semibold mb-2">{person.name}</h3>
                )}
                <p className="text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 Vectonix. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
