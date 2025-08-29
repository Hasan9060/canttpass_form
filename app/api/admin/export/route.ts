export const runtime = "nodejs"; 
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Students");

  // ✅ Excel Columns (duplicate ROLL NO hata diya)
  sheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "ROLL NO", key: "rollNo", width: 15 },
    { header: "NAME", key: "name", width: 25 },
    { header: "FATHER NAME", key: "fatherName", width: 25 },
    { header: "FORM B", key: "formB", width: 20 },
    { header: "CELL NO", key: "cellNo", width: 18 },
    { header: "ADDRESS", key: "address", width: 40 },
    { header: "IMAGE", key: "image", width: 15 }, // Placeholder
    { header: "APPLICATION TYPE", key: "type", width: 18 },
    { header: "CREATED AT", key: "createdAt", width: 25 },
  ];

  let rowIndex = 2; // header ke baad wali row

  for (const s of students) {
    // ✅ All string fields uppercase
    const rowData = {
      id: s.id,
      rollNo: s.rollNo?.toUpperCase() || "",
      name: s.name?.toUpperCase() || "",
      fatherName: s.fatherName?.toUpperCase() || "",
      formB: s.formB?.toUpperCase() || "",
      cellNo: s.cellNo?.toUpperCase() || "",
      address: s.address?.toUpperCase() || "",
      type: s.type?.toUpperCase() || "",
      createdAt: s.createdAt.toISOString(),
    };

    // ✅ Row add
    sheet.addRow(rowData);

    // ✅ Agar image hai to embed karo
    if (s.image) {
  try {
   const res = await fetch(s.image);
const arrayBuffer = await res.arrayBuffer();

// ✅ Force cast to Node.js Buffer
const imgBuffer: Buffer = Buffer.from(arrayBuffer);


   const imageId = workbook.addImage({
  buffer: imgBuffer as unknown as ExcelJS.Buffer, // <-- type force
  extension: "png",
});


    sheet.addImage(imageId, {
      tl: { col: 7, row: rowIndex - 1 },
      ext: { width: 60, height: 60 },
    });

    sheet.getRow(rowIndex).height = 50;
  } catch (err) {
    console.error("Image error:", err);
  }
}

    rowIndex++;
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=students.xlsx",
    },
  });
}
