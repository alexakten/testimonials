"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Record from "./components/RecordScreen";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  const textPhrases = ["your website.", "social media.", "marketing."];

  const [currentTextPhrase, setCurrentTextPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const typingSpeed = 65; // Adjust typing speed

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (currentTextPhrase === "") {
        setIsDeleting(false);
        setTextIndex((index) => (index + 1) % textPhrases.length);
        timeoutId = setTimeout(() => {
          setCurrentTextPhrase(
            textPhrases[(textIndex + 1) % textPhrases.length].substring(0, 1),
          );
        }, 2000); // Wait half a second before typing new phrase
      } else {
        timeoutId = setTimeout(() => {
          setCurrentTextPhrase(
            currentTextPhrase.substring(0, currentTextPhrase.length - 1),
          );
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentTextPhrase, isDeleting, textIndex, textPhrases]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentTextPhrase !== textPhrases[textIndex]) {
      timeoutId = setTimeout(() => {
        setCurrentTextPhrase(
          textPhrases[textIndex].substring(0, currentTextPhrase.length + 1),
        );
      }, typingSpeed);
    } else if (currentTextPhrase === textPhrases[textIndex]) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Wait 2 seconds before starting to delete
    }

    return () => clearTimeout(timeoutId);
  }, [currentTextPhrase, isDeleting, textIndex, textPhrases]);

  const [lang, setLang] = useState("en");

  const [email, setEmail] = useState("");

  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update the email state variable when the input changes
  };

  const [buttonText, setButtonText] = useState(
    lang === "en" ? "Join waitlist" : "Ställ dig i kö",
  );
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmitClick = async () => {
    setButtonLoading(true);

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // handle the response

      setButtonText(lang === "en" ? "Submitted!" : "Inskickad!");
    } catch (error) {
      console.error("Error submitting email:", error);
      setButtonText(lang === "en" ? "Try again" : "Försök igen");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-zinc-100 px-4">
      <Navbar />
      {/* Hero Section */}
      <section className="flex h-screen w-screen items-center justify-center px-4">
        <div
          className="flex  flex-col items-center gap-6 text-center text-gray-900"
          style={{ maxWidth: 880 }}
        >
          <div className="rounded-full border border-zinc-300 bg-white  px-4 py-1 text-zinc-400">
            v1.0 under construction <span className="text-[12px]">🚧</span>
          </div>
          <div>
            <h1 className="gray-shadow text-5xl font-bold tracking-tighter sm:text-8xl">
              Video testimonials <br /> for{" "}
              <span className="black-shadow">{currentTextPhrase}</span>
              <span className="typing-cursor">|</span>
            </h1>
          </div>

          <div className="text-md xs:text-xl" style={{ maxWidth: 624 }}>
            <p>
              {lang === "en"
                ? "Introducing the simplest way to collect & publish video testimonials. Start boosting your business with social proof today. "
                : "Öka din konvertering och väx ditt varumärke med övertygande recensioner och case studies på din hemsida, i annonser, och sociala kanaler."}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 xs:flex-row">
            {/* <input
              type="email"
              required
              className="box-shadow h-12 w-80 rounded-lg border border-black px-4 text-black outline-none"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={handleEmailChange}
            /> */}
            {/* <button
              type="button"
              className={`box-shadow flex h-12 items-center justify-center rounded-lg border border-black px-4 font-medium text-white ${
                buttonLoading
                  ? " bg-gray-300"
                  : "bg-purple hover:bg-indigo-600 hover:text-white"
              }`}
              onClick={handleSubmitClick}
              disabled={buttonLoading}
            >
              {buttonLoading
                ? lang === "en"
                  ? "Submitting"
                  : "Skickar"
                : buttonText}
            </button> */}
            <Link href={"/form"}>
              <button
                type="button"
                className="box-shadow flex h-12 items-center justify-center rounded-lg border border-black bg-white px-4 font-medium text-black hover:bg-purple hover:text-white"
              >
                Try demo 🌵
              </button>
            </Link>
          </div>
          <p className="text-zinc-400">
            {lang === "en" ? "It's so easy! " : "Det är så enkelt! 🌵"}
          </p>
        </div>
      </section>

      {/* <section className="flex w-screen pb-40 items-center justify-center px-4">
        <Record question="How did you hear about us?"/>
      </section> */}
    </main>
  );
}
