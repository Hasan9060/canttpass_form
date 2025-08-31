type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export default function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Cannot get canvas context");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return reject("Failed to create blob");
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, "image/png");
    };
    image.onerror = (err) => reject(err);
  });
}
