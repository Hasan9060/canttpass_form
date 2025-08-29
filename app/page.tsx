"use client";

import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <div>
       <WhatsAppButton />
      {/* Hero / Header */}
      <header className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-4">
        
          <h1 className="text-green-500 text-3xl md:text-5xl font-bold mb-6">
            GOVT. DEGREE COLLEGE MALIR CANTT
          </h1>
          <p className="text-gray-700 text-3xl max-w-2xl mx-auto mb-6">
            MALIR CANTT ENTRY PASS FORM ONLY FOR COLLEGE STUDENTS
          </p>
          <h6 className="uppercase text-red-700 tracking-wide font-semibold mb-6">
            Read instructions Carefully⬇️
          </h6>
          <Link
            href="/form"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg uppercase font-semibold"
          >
            Fill the Form
          </Link>
        </div>
      </header>

      {/* Section One */}
      <section className="bg-black py-10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Form Instructions */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Instructions to fill the form
            </h2>

            <h3 className="font-medium mb-2">Fill in your details clearly:</h3>
            <ul className="list-disc list-inside text-yellow-500 mb-4">
              <li>Roll Number</li>
              <li>Student Name</li>
              <li>Father Name</li>
              <li>Form “B” / CNIC Number</li>
              <li>Cell Number</li>
              <li>Full Address</li>
            </ul>

            <h3 className="font-medium mb-2">
              Attach Required Documents (1 Copy Each):
            </h3>
            <ul className="list-disc list-inside text-yellow-500 mb-4">
              <li>College ID Card</li>
              <li>B-Form / CNIC (if available)</li>
              <li>SECCAP Admission Form (only for XI students)</li>
              <li>Permission Letter (only for permission students)</li>
              <li>Expired Malir Cantt. Entry Pass (if applying for renewal)</li>
            </ul>
          </div>

          {/* Right Side - Notes & Submission */}
          <div>
            <h3 className="font-medium mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside text-yellow-500 mb-4">
              <li>
                Attach all documents on the back of the form, otherwise the form
                will be canceled.
              </li>
              <li>Entry pass is issued only to college students.</li>
              <li>Make sure all details are correct and clear.</li>
            </ul>

            <h3 className="font-medium mb-2">Submission:</h3>
            <ul className="list-disc list-inside text-yellow-500 mb-4">
              <li>
                Submit the filled form with required documents to the designated
                office.
              </li>
              <li>
                After submission, you will receive a receipt. Keep it safe.
              </li>
              <li>
                The receipt will expire in 30 days. Without it, entry pass will
                not be issued.
              </li>
              <li>
                If the receipt or entry card is lost, an FIR will need to be
                filed.
              </li>
            </ul>

            <div className="flex flex-col md:flex-row gap-4 justify-start">
              <Link
                href="/form"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg uppercase font-semibold"
              >
                Fill the Form
              </Link>
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg uppercase font-semibold"
              >
                Watch video
              </Link>
            </div>
          </div>
        </div>
      </section>

     {/* Section Team */}
<section className="text-black bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    {/* 3 columns grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Person 1 */}
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/me.png"
            alt="person1"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <Link
          href="https://www.linkedin.com/in/hasanrafay/"
          className="text-blue-600 font-semibold hover:underline block mb-3"
        >
          Hasan Rafay
        </Link>
        <p className="text-gray-600">Full Stack Developer | AI Engineer</p>
      </div>

      {/* Person 2 */}
      <div className="text-blue-600 bg-white p-6 rounded-lg shadow text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/younus.jpeg"
            alt="person2"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
         Syed Younus
      </div>

      {/* Person 3 */}
      <div className="text-blue-600 bg-white p-6 rounded-lg shadow text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/ali.jpeg"
            alt="person3"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
      Syed Ali Hamzah
      </div>

    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; Copyright 2025. All Rights Reserved —{" "}
            <span className="font-semibold">S.A.H CC&S.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
