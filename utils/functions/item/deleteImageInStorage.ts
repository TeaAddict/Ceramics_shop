import prisma from "@/lib/prisma";

export function deleteImageInStorage(imageName: string) {
  const fs = require("fs");
  const path = require("path");

  const uploadsDirectory = path.join(process.cwd(), "public/uploads");

  const imagePath = path.join(uploadsDirectory, imageName);
  if (!fs.existsSync(imagePath)) {
    console.log("Image does not exist");
    return;
  }

  fs.unlink(imagePath, (err: any) => {
    if (err) {
      console.error("Error deleting image:", err);
      return;
    }
    console.log("Image deleted successfully");
  });
}
