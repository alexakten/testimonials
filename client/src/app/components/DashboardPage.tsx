import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "./firebaseConfig";

type Review = {
  userId: string;
  name: string;
  stars: number;
  review: string;
  videoUrl: string;
  // Add more fields as necessary
};

export default function AdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  const [currentView, setCurrentView] = useState("dashboard");

  const createReviewForm = () => {
  
    const userId = "yourUserId"; // Replace this with the actual userId
    const reviewPageUrl = `/review/${userId}`; // Generating a unique URL with the userId
    
    // You might want to save this URL to your database, or perform other actions
    
    console.log("ReviewPage URL:", reviewPageUrl); // For testing purposes
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/reviews")
      .then((response) => {
        const userReviews = response.data.filter(
          (review: Review) => review.userId === userId
        );
        setReviews(userReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the reviews!", error);
        setLoading(false);
      });
  }, [userId]);

  function renderStars(stars: number, size = "20") {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className={`inline-block ${
            index < stars ? "text-purple-500" : "text-gray-300"
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
              fill={index < stars ? "#6054FC" : "#DEDEDE"}
            />
          </svg>
        </div>
      ));
  }

  const [hoveredStar, setHoveredStar] = useState(-1);
  const [selectedStar, setSelectedStar] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:3003/reviews")
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the reviews!", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-row justify-center items-start bg-zinc-50 w-screen h-screen">
      <div className="flex flex-col justify-between h-screen border px-4 py-24 w-80 border-zinc-300">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setCurrentView("dashboard")}
            className="w-full px-2 py-3 rounded-lg text-black font-medium text-left hover:bg-zinc-100 hover:text-purple"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("responses")}
            className="w-full px-2 py-3 rounded-lg text-black font-medium text-left hover:bg-zinc-100 hover:text-purple"
          >
            Responses
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("forms")}
            className="w-full px-2 py-3 rounded-lg text-black font-medium text-left hover:bg-zinc-100 hover:text-purple"
          >
            Forms
          </button>
        </div>
        <button
          type="button"
          onClick={() => setCurrentView("settings")}
          className="w-full px-2 py-3 rounded-lg text-black font-medium text-left hover:bg-zinc-100 hover:text-purple"
        >
          Settings
        </button>
      </div>

      {currentView === "dashboard" && (
        <div className="w-full h-full flex items-center justify-center text-black">
          Dashboard View
        </div>
      )}

      {currentView === "responses" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {!loading &&
            reviews.map((review, index) => (
              <div
                key={index}
                className="flex p-8 rounded-md bg-zinc-100 items-start flex-col gap-4"
              >
                {review.videoUrl !== "null" ? ( // Check if the video URL is not "null"
                  <video
                    src={review.videoUrl}
                    controls
                    className="w-full rounded-lg object-cover"
                  ></video>
                ) : (
                  <div className="w-full bg-purple-500 rounded-lg"></div> // Display purple div if video URL is "null"
                )}
                <p className="font-semibold text-xl text-black">
                  {review.name}
                </p>
                <div className="flex flex-row gap-2">
                  {renderStars(review.stars)}
                </div>
                <div>
                  <p className="text-zinc-500">&quot;{review.review}&quot;</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {currentView === "forms" && (
        <div className="w-full h-full flex flex-col items-center justify-center text-black">
          <h2 className="text-2xl mb-4">Create a new Review Form</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={createReviewForm} // function to handle creating a unique ReviewPage
          >
            Generate Review Form
          </button>
        </div>
      )}

      {currentView === "settings" && (
        <div className="w-full h-full flex items-center justify-center text-black">
          Settings View
        </div>
      )}
    </main>
  );
}
