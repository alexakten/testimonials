import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

import { auth } from './firebaseConfig';

export default function ReviewPage() {
  //#region
  const { userId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [name, setName] = useState("");
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [selectedStar, setSelectedStar] = useState(-1);
  const [review, setReview] = useState("");

  const renderStars = (size = "0", interactive = true) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <button
          aria-label="stars"
          key={index}
          onMouseEnter={interactive ? () => setHoveredStar(index) : undefined}
          onMouseLeave={interactive ? () => setHoveredStar(-1) : undefined}
          onClick={interactive ? () => setSelectedStar(index) : undefined}
          className={`cursor-pointer ${interactive ? "text-4xl" : ""} ${
            index <=
            (interactive
              ? hoveredStar !== -1
                ? hoveredStar
                : selectedStar
              : selectedStar)
              ? "text-purple-500"
              : "text-gray-300"
          }`}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 46 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.282 1.35569C21.8227 -0.308615 24.1773 -0.308613 24.718 1.35569L28.8808 14.1674C29.1227 14.9117 29.8163 15.4156 30.5989 15.4156H44.0699C45.8199 15.4156 46.5474 17.6549 45.1317 18.6835L34.2334 26.6016C33.6003 27.0616 33.3353 27.877 33.5772 28.6213L37.7399 41.433C38.2807 43.0973 36.3758 44.4813 34.9601 43.4527L24.0618 35.5346C23.4287 35.0746 22.5713 35.0746 21.9382 35.5346L11.0399 43.4527C9.62415 44.4813 7.71929 43.0973 8.26005 41.433L12.4228 28.6213C12.6647 27.877 12.3997 27.0616 11.7666 26.6016L0.868295 18.6835C-0.547446 17.6549 0.180151 15.4156 1.9301 15.4156H15.4011C16.1837 15.4156 16.8773 14.9117 17.1192 14.1674L21.282 1.35569Z"
              fill={
                index <= (hoveredStar !== -1 ? hoveredStar : selectedStar)
                  ? "#6054FC"
                  : "#DEDEDE"
              }
            />
          </svg>
        </button>
      ));
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorder.current?.stop();
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
          mediaRecorder.current = new MediaRecorder(stream);

          mediaRecorder.current.onstop = () => {
            videoRef.current!.srcObject = null;
            stream.getTracks().forEach((track) => track.stop());
          };

          mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setVideoUrl(URL.createObjectURL(event.data));
            }
          };

          mediaRecorder.current.start();
          setIsRecording(true);
        });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current?.stop();
  };

  const startOverRecording = () => {
    setIsRecording(false);

    // Revoke the old video URL to release the object URL resource
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl("");
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const mediaStream: MediaStream = videoRef.current
        .srcObject as MediaStream;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      videoRef.current.srcObject = null; // Clear the old video frames
    }

    // Reset MediaRecorder to ensure it doesn’t hold any previous data
    if (mediaRecorder.current) {
      mediaRecorder.current = null;
    }

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the new video feed
      }
    });
  };

  useEffect(() => {
    const video = videoRef.current;

    const turnOffCamera = () => {
      if (video && video.srcObject instanceof MediaStream) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        video.srcObject = null;
      }
    };

    if (currentQuestion === 5) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Check if the currentQuestion is still 5 before setting the video srcObject
          if (video && currentQuestion === 5) {
            video.srcObject = stream;
            video.play();
          } else {
            // If the currentQuestion is no longer 5, ensure to turn off the camera
            stream.getTracks().forEach((track) => track.stop());
          }
        })
        .catch((err) => {
          console.error("Error accessing the camera: ", err);
        });
    } else {
      turnOffCamera();
    }

    return () => {
      turnOffCamera();
    };
  }, [currentQuestion]);



  const handleSubmitReview = () => {
    const reviewData = {
      userId,
      videoUrl, // assuming videoUrl is stored in a state or it’s accessible in your function
      stars: selectedStar + 1, // replace with your actual star rating
      name,
      review,
    };

    // Sending a POST request to the server
    fetch("http://localhost:3003/submit-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //#endregion

  return (
    <main className="flex  flex-col xs:px-8 px-4 justify-center items-center bg-zinc-50 w-screen h-screen">
      {currentQuestion === 0 && (
        <div className="flex flex-col gap-8 items-center text-center max-w-lg">
          <div className="flex items-center flex-col gap-4">
            <h1 className="font-semibold text-3xl xs:text-5xl  text-black">
              Hi there! We&apos;d love to hear your thoughts!👋
            </h1>
            <div className="max-w-sm">
              <p className="text-zinc-500">
                If you enjoyed working with us, leave a quick testimonial! It really helps us out. 
              </p>
            </div>
          </div>
          <div className="flex items-center flex-col gap-24">
            <button
              type="button"
              className="flex items-center justify-center w-56 h-14 rounded-lg text-white font-medium bg-purple"
              onClick={() => setCurrentQuestion(1)}
            >
              Leave testimonial
            </button>
            <p className="absolute bottom-12 text-black">
              How is my testimonial used?{" "}
              <span>
                <button type="button" className="font-semibold underline">
                  Read more.
                </button>
              </span>
            </p>
          </div>
        </div>
      )}

      {currentQuestion === 1 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <p className="text-zinc-500">Step {currentQuestion} of 5</p>
          <div className="flex items-start flex-col gap-4">
            <h2 className="font-semibold text-3xl text-black">
              Hey there, uhm...
            </h2>
            <div>
              <p className="text-zinc-500">What&apos;s your name?</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end">
            <input
              type="text"
              className="p-4 w-full border text-black outline-none border-zinc-200 rounded-md"
              placeholder="Name"
              value={name} // Setting the value of the input to be the name state variable
              onChange={(e) => setName(e.target.value)} //
            />

            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-white font-medium bg-purple"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 2 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <p className="text-zinc-500">Step {currentQuestion} of 5</p>
          <div className="flex items-start flex-col gap-4">
            <h2 className="font-semibold text-3xl text-black">
              Twinkle twinkle...
            </h2>
            <div>
              <p className="text-zinc-500">
                What would you rate your experience?
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end">
            <div className="flex flex-row w-full items-start gap-8">
              {renderStars("52", true)}
            </div>

            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-white font-medium bg-purple"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 3 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <p className="text-zinc-500">Step {currentQuestion} of 5</p>
          <div className="flex items-start flex-col gap-4">
            <h2 className="font-semibold text-3xl text-black">
              Some love! 🧡
            </h2>
            <div>
              <p className="text-zinc-500">
                Tell us more about your experience!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end">
            <input
              type="text"
              className="p-4 w-full border text-black outline-none border-zinc-200 rounded-md"
              placeholder="..."
              value={review} // Setting the value of the input to be the review state variable
              onChange={(e) => setReview(e.target.value)} //
            />

            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-white font-medium bg-purple"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 4 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <p className="text-zinc-500">Step {currentQuestion} of 5</p>
          <div className="flex items-start flex-col gap-4">
            <h2 className="font-semibold text-3xl text-black">
              Record a short video!
            </h2>
            <div>
              <p className="text-zinc-500">
                Remember to record in a {" "}
                <span className="font-semibold underline">bright environment</span> by
                a window or lamp ☀️
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end">
            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-white font-medium bg-purple"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <p className="absolute bottom-12 text-black">
              <button
                type="button"
                className="font-semibold underline"
                onClick={() => setCurrentQuestion(6)}
              >
                Skip video
              </button>
            </p>
          </div>
        </div>
      )}

      {currentQuestion === 5 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <div className="rounded-lg bg-purple w-full h-96">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg object-cover"
              ></video>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full rounded-lg scale-x-[-1] object-cover"
              ></video>
            )}
          </div>
          <div className="flex flex-col gap-8 items-end">
            <div className="flex justify-center items-center h-full w-full">
              {videoUrl ? (
                <button
                  type="button"
                  aria-label="start over"
                  className="w-32 h-14 rounded-lg text-black bg-zinc-200 focus:outline-none"
                  onClick={startOverRecording}
                >
                  Start over
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="record"
                  className={`relative w-16 h-16 rounded-full focus:outline-none ${
                    isRecording ? "bg-red-500" : "bg-purple"
                  }`}
                  onClick={isRecording ? stopRecording : toggleRecording}
                >
                  <div
                    className={`absolute border-2 border-zinc-50 w-14 h-14 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                      isRecording ? "bg-red-500" : "bg-purple"
                    }`}
                  ></div>
                </button>
              )}
            </div>

            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-white font-medium bg-purple"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 6 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <div className="rounded-lg bg-purple w-full h-96">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg object-cover"
              ></video>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full rounded-lg scale-x-[-1] object-cover"
              ></video>
            )}
          </div>

          <div className="flex items-start flex-col gap-4">
            <div className="flex flex-row gap-2">
              {" "}
              {renderStars("24", false)}
            </div>
            <p className="font-semibold text-xl text-black">{name}</p>
            <div>
              <p className="text-zinc-500">&quot;{review}&quot;</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end">
            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-white font-medium bg-purple"
                onClick={() => {
                  handleSubmitReview();
                  setCurrentQuestion(currentQuestion + 1);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {currentQuestion === 7 && (
        <div className="flex flex-col gap-8 w-full max-w-lg">
          <div className="flex items-center flex-col gap-4">
            <h2 className="font-semibold text-3xl text-black">
              All done! Thank you! 🧡
            </h2>
            <div>
              <p className="text-zinc-500">
                Keep an eye out for your testimonial on our website!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end">
            <div className="flex items-center flex-row gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-36 h-14 rounded-lg text-zinc-400 font-regular bg-white"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
