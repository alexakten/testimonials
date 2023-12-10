// src/app/api/submit-review/route.js
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { storage, firestore } from "../../../../config/firebaseConfig"; // Import Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { NextResponse } from "next/server";

export async function POST(req) {
  const form = new IncomingForm();

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(NextResponse.json({ error: 'Error parsing form data' }, { status: 500 }));
      }

      try {
        const { stars, name, review } = fields;
        const videoFile = files.video;

        const videoBuffer = await fs.readFile(videoFile.filepath);
        const videoName = `review_${Date.now()}.webm`;
        const videoStorageRef = ref(storage, `videos/${videoName}`);

        await uploadBytes(videoStorageRef, videoBuffer);
        const downloadURL = await getDownloadURL(videoStorageRef);

        // Create a new document in Firestore
        const reviewDocRef = doc(firestore, "reviews", videoName); // "reviews" is the name of your collection
        await setDoc(reviewDocRef, {
          stars, 
          name, 
          review, 
          videoUrl: downloadURL
        });

        return resolve(NextResponse.json({ message: 'Review submitted successfully', downloadURL }, { status: 200 }));
      } catch (error) {
        console.error("Error submitting review: ", error);
        return resolve(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
      }
    });
  });
}
