"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Add or Replace Student
export async function addOrReplaceStudent(formData: FormData) {
  const rollNo = formData.get("rollNo") as string;
  const name = formData.get("name") as string;
  const fatherName = formData.get("fatherName") as string;
  const formB = formData.get("formB") as string;
  const cellNo = formData.get("cellNo") as string;
  const address = formData.get("address") as string;
  const image = formData.get("image") as string;
  const className = formData.get("class") as string;
  const type = formData.get("type") as string;

  if (!rollNo || !name || !fatherName || !formB) {
    throw new Error("⚠️ Required fields are missing");
  }

  // ✅ delete old duplicates by rollNo or formB
  await prisma.student.deleteMany({
    where: {
      OR: [
        { rollNo },
        { formB },
      ],
    },
  });

  // ✅ insert new student
  await prisma.student.create({
    data: {
      rollNo,
      name,
      fatherName,
      formB,
      cellNo,
      address,
      image,
      class: className,
      type,
    },
  });

  // refresh Admin page after mutation
  revalidatePath("/admin");
}

// Delete Student
export async function deleteStudent(formData: FormData) {
  const id = formData.get("id");

  if (!id) return;

  try {
    await prisma.student.delete({
      where: {
        id: id as string, // ✅ MongoDB ObjectId is String
      },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error("❌ Failed to delete student:", error);
  }
}
