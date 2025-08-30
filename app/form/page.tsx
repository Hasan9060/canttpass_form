"use client";
import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

export default function StudentForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    address: "",
    fatherName: "",
    formB: "",
    cellNo: "03", // hamesha 03 se start karega
    image: "" as string,
    class: "",
    type: "",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ image upload + compression
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.015, // ~15 KB
        maxWidthOrHeight: 300, // resize to keep quality
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onload = () =>
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("❌ Image compression error:", err);
    }
  };

  // ✅ form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        let errMsg =
          "You have already filled the form, please contact the admin at 03184017664.!";

        if (contentType.includes("application/json")) {
          const err = await res.json();
          errMsg = err.message || errMsg;
        }
        throw new Error(errMsg);
      }

      // ✅ Agar PDF mila hai
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // 🔽 Auto download trigger
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.name || "student"}-canttpass form.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // ✅ Reset form
      setForm({
        name: "",
        rollNo: "",
        address: "",
        fatherName: "",
        formB: "",
        cellNo: "03",
        image: "",
        class: "",
        type: "",
        admissionDate: new Date().toISOString().split("T")[0],
      });
      router.push("/submitting");
    } catch (err: unknown) {
      console.error("❌ Error:", err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Failed to generate PDF.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Number only handler
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "rollNo" | "formB" | "cellNo"
  ) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (field === "cellNo") {
      if (!value.startsWith("03")) {
        value = "03" + value.replace(/^0+/, "");
      }
      value = value.slice(0, 11);
    }

    if (field === "formB") {
      value = value.replace(/\D/g, "");
      if (value.length > 13) value = value.slice(0, 13);
      if (value.length > 5 && value.length <= 12) {
        value = value.slice(0, 5) + "-" + value.slice(5);
      } else if (value.length > 12) {
        value =
          value.slice(0, 5) + "-" + value.slice(5, 12) + "-" + value.slice(12);
      }
    }

    setForm({ ...form, [field]: value });
  };

  // ✅ Form complete check
  const isFormComplete =
    form.name.trim() &&
    form.rollNo.trim() &&
    form.address.trim() &&
    form.fatherName.trim() &&
    form.formB.trim() &&
    form.cellNo.length === 11 &&
    form.image &&
    form.class.trim() &&
    form.type.trim();

  return (
    <div className="min-h-screen bg-gray-200 py-24 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-green-500 shadow-[0_0_20px_#22c55e] rounded-xl p-6 w-full max-w-lg space-y-4"
      >
        <h1 className="flex flex-col text-[19px] font-bold text-center text-gray-800 mb-2">
          GOVT. DEGREE COLLEGE MALIR CANTT{" "}
          <span className="text-[14px] font-bold text-center text-gray-800 mb-4">
            ENTRY PASS FORM ONLY FOR COLLEGE STUDENTS
          </span>
        </h1>

        {/* Roll No */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Roll No
          </label>
          <input
            type="text"
            name="rollNo"
            value={form.rollNo}
            onChange={(e) => handleNumberChange(e, "rollNo")}
            className="w-full p-2 border rounded-lg mt-1 text-black"
            maxLength={4}
            required
          />
        </div>

        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Student Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1 text-black uppercase"
            required
          />
        </div>

        {/* Father Name */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Father Name
          </label>
          <input
            type="text"
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1 text-black uppercase"
            required
          />
        </div>

        {/* B-Form */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            B-Form No
          </label>
          <input
            type="text"
            name="formB"
            value={form.formB}
            onChange={(e) => handleNumberChange(e, "formB")}
            className="w-full p-2 border rounded-lg mt-1 text-black"
            maxLength={15}
            required
          />
        </div>

        {/* Cell No */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Cell No
          </label>
          <input
            type="text"
            name="cellNo"
            value={form.cellNo}
            maxLength={11}
            onChange={(e) => handleNumberChange(e, "cellNo")}
            className="w-full p-2 border rounded-lg mt-1 text-black"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Full Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1 text-black uppercase"
            required
          />
        </div>

        {/* Class Select */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Class
          </label>
          <select
            name="class"
            value={form.class}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1 text-black"
            required
          >
            <option value="">Select Class</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
            <option value="ADS-I">ADS I</option>
            <option value="ADS-II">ADS II</option>
            <option value="ADC-I">ADC I</option>
            <option value="ADC-II">ADC II</option>
          </select>
        </div>

        {/* Type Select */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1 text-black"
            required
          >
            <option value="">Select Type</option>
            <option value="New">New</option>
            <option value="Renewal">Renewal</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-blue-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full p-2 border rounded-lg mt-1 text-black"
            required
          />
          {form.image && (
            <Image
              src={form.image}
              alt="Preview"
              width={96}
              height={96}
              className="mt-2 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Admission Date */}
        <div>
          <p className="text-lg text-gray-700">
            Submission Date:{" "}
            <span className="text-lg text-blue-600">
              {new Date(form.admissionDate).toLocaleDateString("en-GB")}
            </span>
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormComplete || isSubmitting}
          className={`w-full py-2 rounded-lg transition ${
            !isFormComplete || isSubmitting
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Generating..." : "Generate PDF"}
        </button>

        {/* ❌ Error message */}
        {errorMessage && (
          <p className="bg-red-100 text-red-700 p-2 rounded-lg text-center font-medium">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
