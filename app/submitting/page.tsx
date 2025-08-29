// app/thanks/page.tsx
"use client";
import { useRouter } from "next/navigation";
import WhatsAppButton from "../components/WhatsAppButton";

export default function SubmittingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white relative overflow-hidden px-4">
      <WhatsAppButton />
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-56 h-56 sm:w-72 sm:h-72 bg-pink-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-400/30 rounded-full blur-3xl" />

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-center w-full max-w-md sm:max-w-lg lg:max-w-xl z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          ✅ Steps Completed
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium mb-6">
          Your form has been Generated successfully.
        </p>

        {/* Steps Instructions */}
        <div className="text-left bg-black/60 p-4 sm:p-6 rounded-xl space-y-3 shadow-inner">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Instructions:<span className="text-red-400"> (Important)</span></h2>
          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base leading-relaxed">
            <li>Take a printout of the downloaded PDF.</li>
            <li>
              Ensure the document has the{" "}
              <span className="font-semibold">S.A.H stamp</span>, otherwise the
              application will be rejected.
            </li>
            <li>Submit the Form with all require documents.</li>
            <li>Within a few days, your card will be received from the headquarter.</li>
            <li>You will then be handed your card.</li>
          </ol>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-md hover:scale-105 transition-transform text-sm sm:text-base"
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}
