"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Review = {
  name: string;
  stars: number;
  review: string;
  videoUrl: string;
  // Add more fields as necessary
};

export default function AdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

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
    <main className="flex relative flex-col xs:px-8 px-4 justify-center items-center bg-zinc-50 w-screen">
      <h1>Admin Page</h1>
      {loading && <p>Loading reviews...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
              <p className="font-semibold text-xl text-black">{review.name}</p>
              <div className="flex flex-row gap-2">
                {renderStars(review.stars)}
              </div>
              <div>
                <p className="text-zinc-500">&quot;{review.review}&quot;</p>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
