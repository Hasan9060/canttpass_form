import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const {
    image,
    name,
    rollNo,
    fatherName,
    formB,
    cellNo,
    address,
    class: studentClass,
    type, // "New" | "Renewal"
  } = await req.json();

  // ✅ Save in DB
  await prisma.student.create({
    data: {
      rollNo,
      name,
      fatherName,
      formB,
      cellNo,
      address,
      image,
      class: studentClass,
      type,
    },
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  // ✅ Load background template
  const formPath = path.join(process.cwd(), "public/form-template.jpg");
  const formBytes = fs.readFileSync(formPath);

  // ✅ Create PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([794, 1123]); // A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ✅ Background embed (only once)
  const bgImage = await pdfDoc.embedJpg(formBytes);
  page.drawImage(bgImage, {
    x: 0,
    y: 0,
    width: 794,
    height: 1123,
  });

  // -----------------------------------------------------
  // 🔲 Helper: draw chars inside square boxes
  function drawInBoxes(text: string, startX: number, startY: number) {
    const boxSize = 26;
    const gap = 2;

    text.split("").forEach((char, i) => {
      const x = startX + i * (boxSize + gap);

      page.drawRectangle({
        x,
        y: startY - boxSize + 5,
        width: boxSize,
        height: boxSize,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      page.drawText(char, {
        x: x + boxSize / 2 - 4,
        y: startY - boxSize / 2,
        size: 16,
        font,
        color: rgb(0, 0, 0),
      });
    });
  }
  // -----------------------------------------------------

  // ✅ Roll No
  drawInBoxes(rollNo.toString(), 90, height - 136);

  // ✅ Student Name
  page.drawText(name.toUpperCase(), {
    x: 160,
    y: height - 190,
    size: 14,
    font,
  });

  // ✅ Father Name
  page.drawText(fatherName.toUpperCase(), {
    x: 160,
    y: height - 220,
    size: 14,
    font,
  });

  // ✅ B-Form
  drawInBoxes(formB, 95, height - 245);

  // ✅ Cell No
  drawInBoxes(cellNo, 95, height - 300);

  // ✅ Class
  drawInBoxes(`${studentClass}`, 400, height - 138);
  page.drawText(`Class:`, {
    x: 340,
    y: height - 150,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  });

  // ✅ Address
  page.drawText(address.toUpperCase(), {
    x: 50,
    y: height - 375,
    size: 13,
    font,
  });

  // ✅ Admission Type
  page.drawText(`Application Type: ${type}`, {
    x: 580,
    y: height - 150,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  // ✅ Admission Date
  page.drawText(`${formattedDate}`, {
    x: 95,
    y: height - 540,
    size: 13,
    font,
  });

  // ✅ Student Image Embed (two times)
  if (image) {
    try {
      let embeddedImg;
      const imgBytes = Buffer.from(image.split(",")[1], "base64");

      if (image.startsWith("data:image/png")) {
        embeddedImg = await pdfDoc.embedPng(imgBytes);
      } else {
        embeddedImg = await pdfDoc.embedJpg(imgBytes);
      }

      const boxSize = 130;

      // 🖼️ First Image (main form)
      page.drawImage(embeddedImg, {
        x: 620,
        y: height - 310,
        width: boxSize,
        height: boxSize,
      });

      // 🖼️ Second Image (receipt section)
      page.drawImage(embeddedImg, {
        x: 620,
        y: height - 925,
        width: boxSize,
        height: boxSize,
      });
    } catch (err) {
      console.error("Image embed error:", err);
    }
  }

  // ✅ Receipt Section
  drawInBoxes(rollNo.toString(), 100, height - 785);
  page.drawText(name.toUpperCase(), { x: 180, y: height - 838, size: 14, font });
  page.drawText(fatherName.toUpperCase(), { x: 180, y: height - 870, size: 14, font });
  page.drawText(formB, { x: 220, y: height - 905, size: 16, font });
  page.drawText(cellNo, { x: 490, y: height - 905, size: 16, font });
  page.drawText(`${formattedDate}`, {
    x: 220,
    y: height - 945,
    size: 16,
    font,
  });

  // ✅ Class in receipt
  drawInBoxes(`${studentClass}`, 400, height - 785);
  page.drawText(`Class:`, {
    x: 340,
    y: height - 800,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  });

  // ✅ Admission Type in receipt
  page.drawText(`Application Type: ${type}`, {
    x: 580,
    y: height - 780,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
const pdfBuffer = Buffer.from(pdfBytes); // ✅ Convert Uint8Array → Buffer

return new NextResponse(pdfBuffer, {
  status: 200,
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=student-entry-pass.pdf",
  },
});
}
