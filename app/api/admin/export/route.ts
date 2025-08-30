export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  let students;

  // ✅ Date filter logic
  if (dateParam) {
    const start = new Date(dateParam);
    const end = new Date(dateParam);
    end.setDate(end.getDate() + 1);

    students = await prisma.student.findMany({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } else {
    students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // ✅ Excel generate code (same as before)
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Students");

  // Add Generated Date Row
  const generatedDate = new Date().toISOString().split("T")[0];
  sheet.addRow([`Generated Date: ${generatedDate}`]);
  sheet.addRow([]); // empty row for spacing

  // Excel Columns
  sheet.columns = [
    { header: "SERIAL NO", key: "serialNo", width: 12 },
    { header: "ROLL NO", key: "rollNo", width: 15 },
    { header: "NAME", key: "name", width: 25 },
    { header: "FATHER NAME", key: "fatherName", width: 25 },
    { header: "FORM B", key: "formB", width: 20 },
    { header: "CELL NO", key: "cellNo", width: 18 },
    { header: "ADDRESS", key: "address", width: 40 },
    { header: "IMAGE", key: "image", width: 15 },
    { header: "APPLICATION TYPE", key: "type", width: 18 },
    { header: "DATE", key: "createdAt", width: 15 },
  ];

  let rowIndex = 4;
  let serial = 1;

  for (const s of students) {
    const rowData = {
      serialNo: serial,
      rollNo: s.rollNo?.toUpperCase() || "",
      name: s.name?.toUpperCase() || "",
      fatherName: s.fatherName?.toUpperCase() || "",
      formB: s.formB?.toUpperCase() || "",
      cellNo: s.cellNo?.toUpperCase() || "",
      address: s.address?.toUpperCase() || "",
      type: s.type?.toUpperCase() || "",
      createdAt: s.createdAt.toISOString().split("T")[0],
    };

    sheet.addRow(rowData);

    // Image embed
    if (s.image) {
      try {
        const res = await fetch(s.image);
        const arrayBuffer = await res.arrayBuffer();
        const imgBuffer: Buffer = Buffer.from(arrayBuffer);

        const imageId = workbook.addImage({
          buffer: imgBuffer as unknown as ExcelJS.Buffer,
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
    serial++;
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
