"use client";
import React, { useState } from "react";
import ReviewPage from "./components/ReviewPage/ReviewPage";
import AdminPage from "./components/AdminPage/AdminPage";
import LandingPage from "./components/LandingPage/LandingPage";

const App = () => {
  const [currentView, setCurrentView] = useState("LandingPage");

  return (
    <main className="">
      {currentView === "LandingPage" && <LandingPage />}

      {currentView === "AdminPage" && <AdminPage />}

      {currentView === "ReviewPage" && <ReviewPage />}

      <div className="flex flex-row text-black font-medium gap-4 fixed top-8 right-8">
        <button
          type="button"
          className="flex items-center justify-center z-10 rounded-full px-4 h-10"
          onClick={() => setCurrentView("ReviewPage")}
        >
          Review
        </button>
        <button
          type="button"
          className="flex items-center justify-center z-10 bg-black text-white rounded-full px-6 h-10"
          onClick={() => setCurrentView("AdminPage")}
        >
          Log in
        </button>
      </div>
    </main>
  );
};

export default App;
