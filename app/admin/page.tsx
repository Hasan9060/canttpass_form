/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { deleteStudent } from "./actions";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams; // ✅ wait karna zaroori hai
  const q = typeof params?.q === "string" ? params.q : undefined;
  const type = typeof params?.type === "string" ? params.type : undefined;
  const classFilter =
    typeof params?.class === "string" ? params.class : undefined;

  const students = await prisma.student.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { rollNo: { contains: q, mode: "insensitive" } },
                { formB: { contains: q, mode: "insensitive" } },
                { name: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type } : {},
        classFilter ? { class: classFilter } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 py-25 text-black bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📊 Admin Dashboard —{" "}
        <span className="text-blue-600">Syed Younus</span>
      </h1>

      {/* Actions (Excel + Home) */}
<div className="flex gap-3 mb-6 justify-center">
  {/* Date Picker for Excel Export */}
  <form
    action="/api/admin/export"
    method="GET"
    className="flex gap-2 items-center"
  >
    <input
      type="date"
      name="date"
      className="px-3 py-2 border rounded-lg"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      ⬇️ Download Excel
    </button>
  </form>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🏠 Home
        </Link>
      </div>

      {/* Search & Filters */}

      <form className="flex flex-wrap gap-3 mb-6 justify-center">
        <input
          type="text"
          name="q"
          placeholder="Search by Roll No, CNIC or Name"
          defaultValue={q}
          className="px-4 py-2 border rounded-lg"
        />

        <select
          name="type"
          defaultValue={type || ""}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="New">New</option>
          <option value="Renewal">Renewal</option>
        </select>

        <select
          name="class"
          defaultValue={classFilter || ""}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Classes</option>
          <option value="XI">XI</option>
          <option value="XII">XII</option>
          <option value="ADS I">ADS I</option>
          <option value="ADS II">ADS II</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🔍 Search
        </button>
      </form>

      {/* Table same as before */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border text-left">Roll No</th>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Father Name</th>
              <th className="p-3 border text-left">Form-B</th>
              <th className="p-3 border text-left">Cell No</th>
              <th className="p-3 border text-left">Address</th>
              <th className="p-3 border text-left">Image</th>
              <th className="p-3 border text-left">Class</th>
              <th className="p-3 border text-left">Type</th>
              <th className="p-3 border text-left">Date</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-gray-500 border"
                >
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s.id}
                  className="text-black hover:bg-pink-400 uppercase"
                >
                  <td className="border p-2">{s.rollNo}</td>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.fatherName}</td>
                  <td className="border p-2">{s.formB}</td>
                  <td className="border p-2">{s.cellNo}</td>
                  <td className="border p-2">{s.address}</td>
                  <td className="border p-2 text-center">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="border p-2">{s.class}</td>
                  <td className="border p-2">{s.type}</td>
                  <td className="border p-2">
  {s.date ? new Date(s.date).toLocaleDateString("en-GB") : "-"}
</td>
                  <td className="border p-2 text-center">
                    <form action={deleteStudent}>
                      <input type="hidden" name="id" value={s.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        🗑️ Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
