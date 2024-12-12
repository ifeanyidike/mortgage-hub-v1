"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(
  buffer: Buffer,
  file: File,
  key: string,
  resize: boolean,
  maxSizeInBytes: number
): Promise<string | Error> {
  try {
    // Check if the buffer is larger than the max size
    let finalBuffer = buffer;
    if (resize && buffer.length > maxSizeInBytes) {
      finalBuffer = await resizeImageBuffer(buffer, maxSizeInBytes);
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: finalBuffer,
      ContentType: file.type, // Retain the original content type
    };

    const response = await s3Client.send(new PutObjectCommand(params));
    console.log("response", response);
    return file.name;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return error as Error;
  }
}

// async function resizeImageBuffer(
//   buffer: Buffer,
//   maxSizeInBytes: number
// ): Promise<Buffer> {
//   const metadata = await sharp(buffer).metadata();

//   if (!metadata.format) {
//     throw new Error("Unable to determine image format.");
//   }

//   let resizedBuffer = buffer;
//   let quality = 80; // Initial quality setting

//   while (resizedBuffer.length > maxSizeInBytes) {
//     resizedBuffer = await sharp(buffer)
//       .resize({
//         width: metadata.width && metadata.width > 1000 ? 1000 : undefined,
//       }) // Resize width if needed
//       .toFormat(metadata.format, { quality }) // Retain format and adjust quality
//       .toBuffer();

//     quality -= 5; // Reduce quality iteratively
//     if (quality <= 0) {
//       throw new Error("Unable to resize the image to the desired size.");
//     }
//   }

//   return resizedBuffer;
// }

async function resizeImageBuffer(
  buffer: Buffer,
  maxSizeInBytes: number
): Promise<Buffer> {
  const metadata = await sharp(buffer).metadata();

  if (!metadata.format || !metadata.width || !metadata.height) {
    throw new Error("Unable to determine image format or dimensions.");
  }

  let resizedBuffer = buffer;
  let quality = 80; // Initial quality
  let width = metadata.width; // Current width
  let height = metadata.height; // Current height

  // Iterative resizing loop
  while (resizedBuffer.length > maxSizeInBytes && quality > 0) {
    // Reduce dimensions by 10% each iteration
    width = Math.round(width * 0.9);
    height = Math.round(height * 0.9);

    // Resize image and adjust quality
    resizedBuffer = await sharp(buffer)
      .resize({ width, height }) // Reduce dimensions
      .toFormat(metadata.format, { quality }) // Retain format and adjust quality
      .toBuffer();

    quality -= 5; // Gradually reduce quality
  }

  if (resizedBuffer.length > maxSizeInBytes) {
    console.warn(
      "Resizing could not achieve the desired size. Uploading the smallest possible size."
    );
  }

  return resizedBuffer;
}

export async function uploadFile(
  formData: FormData,
  repo: string,
  resize = true,
  maxSizeInBytes = 100 * 1024
) {
  try {
    const file = formData.get("file") as File;

    if (file?.size === 0) {
      return { status: "error", message: "Please select a file" };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `${repo}/${Date.now()}${file.name}`;
    await uploadFileToS3(buffer, file, key, resize, maxSizeInBytes);

    return {
      status: "success",
      message: "File has been uploaded successfully",
      s3Uri: `https://${process.env.AWS_BUCKET_NAME!}.s3.${process.env
        .AWS_REGION!}.amazonaws.com/${key}`,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: "error",
      message: "Failed to upload file",
    };
  }
}
