// Assuming this file is located at: /pages/api/submit-review.js

import { createRouter } from "next-connect";
import multer from "multer";
import { promises as fs } from 'fs';
import { storage, firestore } from "../../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// Configure multer for file uploading
const uploadMiddleware = multer({ dest: "uploads/" }).single("video");

// Define the POST handler directly since we're using named exports
export async function POST(req, res) {
  try {
    // Since we're handling the file upload as part of the POST request,
    // we need to apply the multer middleware manually.
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to upload file." });
      }

      const { stars, name, review } = req.body;
      const videoFile = req.file; // Accessed via multer

      if (!videoFile) {
        return res.status(400).json({ error: "No video file uploaded." });
      }

      const videoBuffer = await fs.readFile(videoFile.path);
      const videoName = `review_${Date.now()}.webm`;
      const videoStorageRef = ref(storage, `videos/${videoName}`);

      await uploadBytes(videoStorageRef, videoBuffer);
      const downloadURL = await getDownloadURL(videoStorageRef);

      const reviewDocRef = doc(firestore, "reviews", videoName);
      await setDoc(reviewDocRef, {
        stars,
        name,
        review,
        videoUrl: downloadURL,
      });

      await fs.unlink(videoFile.path);

      res.json({ message: "Review submitted successfully", downloadURL });
    });
  } catch (error) {
    console.error("Error submitting review: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
