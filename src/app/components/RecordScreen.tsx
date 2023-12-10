"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

type RecordProps = {
  question: string;
};

const questions = [
  "How did you feel about your website before working with us?",
  "What was your favorite part about working with us?",
  "How do you feel about your website now that we are done?",
  // Add more questions as needed
];

const Record: React.FC<RecordProps> = ({ question }) => {
  const [mode, setMode] = useState("started"); // Modes: 'video', 'text', 'voice'

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const stopVideoStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    // Function to start the video stream
    const startVideoStream = async () => {
      try {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current && mediaStreamRef.current) {
          videoRef.current.srcObject = mediaStreamRef.current;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };

    if (mode === "video") {
      startVideoStream();
    }

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      stopVideoStream();
    };
  }, [mode]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex - 1 + questions.length) % questions.length,
    );
  };

  return (
    <div className="flex h-96 w-full max-w-4xl flex-row overflow-hidden rounded-lg border-2 border-black bg-gray-200">
      {/* Left Card */}
      <div className="relative flex w-full items-end bg-red-50">
        <Image
          src="/image.png"
          alt="Voice call"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        {/* Gradient overlay bottom */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, black, rgba(0, 0, 0, 0.05) 50%, transparent)",
          }}
        ></div>
        <p className="absolute bottom-4 left-4 text-2xl font-medium text-white">
          {questions[currentQuestionIndex]}
        </p>
        <button
          className="absolute top-4 left-4 rounded-md border-2 border-white bg-white bg-opacity-10 px-4 py-1 text-white"
          onClick={goToPreviousQuestion}
        >
          Previous
        </button>
        <button
          className="absolute top-4 right-4 rounded-md border-2 border-white bg-white bg-opacity-10 px-4 py-1 text-white"
          onClick={goToNextQuestion}
        >
          Next
        </button>
      </div>

      {/* Right Card */}
      <div className="relative w-full bg-zinc-100">
        {mode === "started" && (
          <>
            <div className="flex h-full flex-col items-center justify-center gap-8 p-8">
              <p className="max-w-sm text-xl font-semibold text-black">
                Are you ready?
              </p>
              <div className="flex w-full flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  className="box-shadow h-16 rounded-md border-2 border-black bg-white p-4 text-black hover:bg-black hover:text-white"
                  onClick={() => setMode("default")}
                >
                  Get started
                </button>
              </div>
            </div>
          </>
        )}
        {mode === "default" && (
          <>
            <div className="flex h-full flex-col items-center justify-center gap-8 p-8">
              <p className="max-w-sm text-xl font-semibold text-black">
                How would you like to answer?
              </p>
              <div className="flex w-full flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  className="box-shadow h-16 w-16 rounded-md border-2 border-black bg-white text-black hover:bg-black hover:text-white"
                  onClick={() => setMode("video")}
                >
                  Video
                </button>
                <button
                  type="button"
                  className="box-shadow h-16 w-16 rounded-md border-2 border-black bg-white text-black hover:bg-black hover:text-white"
                  onClick={() => setMode("text")}
                >
                  Text
                </button>
                <button
                  type="button"
                  className="box-shadow h-16 w-16 rounded-md border-2 border-black bg-white text-black hover:bg-black hover:text-white"
                  onClick={() => setMode("voice")}
                >
                  Voice
                </button>
              </div>
            </div>
          </>
        )}
        {mode === "video" && (
          <>
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
              autoPlay
              muted
            />
            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <button
                type="button"
                aria-label="record"
                className="h-14 w-14 rounded-full border-8 bg-red-500 hover:bg-red-600 focus:border-red-500"
                // Add onClick handler for recording functionality
              ></button>
            </div>
            {/* Back button */}
            <button
              className="box-shadow absolute bottom-6 left-4 rounded-md border-2 border-black bg-white px-4 py-1 text-black"
              onClick={() => setMode("default")}
            >
              Back
            </button>
            <button
              className="box-shadow absolute bottom-6 right-4 rounded-md border-2 border-black bg-white px-4 py-1 text-black"
              onClick={() => setMode("default")}
            >
              Submit
            </button>
          </>
        )}
        {mode === "text" && (
          <>
            <div className="flex h-full flex-col items-center justify-center p-4">
              <textarea
                className="box-shadow mb-4 h-2/3 w-full rounded-lg border-2 border-black p-2 text-black"
                placeholder="Type your text here..."
              />
              <button
                type="button"
                className="box-shadow rounded-md border-2 border-black bg-white px-4 py-1 text-black hover:bg-green-500 hover:text-white"
              >
                Submit
              </button>
            </div>
            {/* Back button */}
            <button
              className="box-shadow absolute bottom-6 left-4 rounded-md border-2 border-black bg-white px-4 py-1 text-black"
              onClick={() => setMode("default")}
            >
              Back
            </button>
          </>
        )}

        {mode === "voice" && (
          <>
            {/* Back button */}
            <button
              className="box-shadow absolute bottom-6 left-4 rounded-md border-2 border-black bg-white px-4 py-1 text-black"
              onClick={() => setMode("default")}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Record;
