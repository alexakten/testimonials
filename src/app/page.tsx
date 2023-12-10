"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Record from "./components/RecordScreen";

export default function LandingPage() {
  const serviceTitles = ["Service 1", "Service 2", "Service 3"];

  // Costs for each service
  const serviceCosts = useMemo(
    () => ({
      service1: 4999,
      service2: 2999,
      service3: 1999,
    }),
    [],
  );

  // Features for each service
  const serviceFeatures = [
    ["Feature 1.1", "Feature 1.2", "Feature 1.3"],
    ["Feature 2.1", "Feature 2.2", "Feature 2.3"],
    ["Feature 3.1", "Feature 3.2", "Feature 3.3"],
  ];

  // State for each service's selection status
  const [isService1Selected, setIsService1Selected] = useState(false);
  const [isService2Selected, setIsService2Selected] = useState(false);
  const [isService3Selected, setIsService3Selected] = useState(false);

  // Handlers to toggle the selection of each service
  const handleService1Toggle = () => setIsService1Selected(!isService1Selected);
  const handleService2Toggle = () => setIsService2Selected(!isService2Selected);
  const handleService3Toggle = () => setIsService3Selected(!isService3Selected);

  // Calculate the total price based on selected services
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (isService1Selected) total += serviceCosts.service1;
    if (isService2Selected) total += serviceCosts.service2;
    if (isService3Selected) total += serviceCosts.service3;
    setTotalPrice(total);
  }, [
    isService1Selected,
    isService2Selected,
    isService3Selected,
    serviceCosts,
  ]);

  const textPhrases = [
    "boost business.",
    "do interviews.",
    "collect leads.",
    "hire employees.",
    "get testimonials.",
  ];

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
      const response = await fetch("/api/submitEmail", {
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
      <nav className="fixed top-0 z-10 flex w-full items-center justify-between px-4 py-4 xs:px-6">
        {/* <Link href="/">
          <Logo></Logo>
        </Link> */}
        <div className="flex flex-row items-end gap-2">
          {/* <div className="box-shadow w-8 h-8 rounded-full border-2 border-black bg-orange-600"></div> */}
          <h1 className="gray-shadow text-4xl font-bold tracking-tight text-black">
            mendly.
          </h1>
        </div>
        <div className="flex flex-row gap-4 font-medium text-black ">
          <button
            type="button"
            onClick={() => setLang("sv")}
            className={lang === "sv" ? "font-bold" : ""}
          >
            Sv
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={lang === "en" ? "font-bold" : ""}
          >
            En
          </button>
          {/* <Link
            href="/login"
            className="flex items-center justify-center z-10 bg-black text-white rounded-full px-4 h-10"
          >
            {lang === "en" ? "Login" : "Logga in"}
          </Link> */}
        </div>
      </nav>
      {/* Hero Section */}
      <section className="flex h-screen w-screen items-center justify-center px-4">
        <div
          className="flex  flex-col items-center gap-6 text-center text-gray-900"
          style={{ maxWidth: 880 }}
        >
          <div className="rounded-full border border-zinc-300 bg-white px-4 py-1 text-zinc-400">
            {lang === "en" ? "v1.0 launching soon. " : "v1.0 kommer snart. "}
            <span className="font-medium text-black">
              <button
                onClick={() =>
                  (window.location.href =
                    "https://buy.stripe.com/7sIaIo8cu7TX79SbII")
                }
              >
                {lang === "en" ? "Reserve your spot →" : "Förbeställ →"}
              </button>
            </span>
          </div>
          <div>
            <h1 className="s:leading-loose gray-shadow text-5xl font-bold leading-tight tracking-tighter sm:text-8xl">
              Async video chats <br /> to{" "}
              <span className="black-shadow">{currentTextPhrase}</span>
              <span className="typing-cursor">|</span>
            </h1>
          </div>

          <div className="text-md xs:text-xl" style={{ maxWidth: 640 }}>
            <p>
              {lang === "en"
                ? "Connect with creators worldwide. Getting user generated content has never been easier. One membership — unlimited content."
                : "Öka din konvertering och väx ditt varumärke med övertygande recensioner och case studies på din hemsida, i annonser, och sociala kanaler."}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 xs:flex-row">
            <input
              type="email"
              required
              className="box-shadow h-12 w-80 rounded-full border border-black px-4 text-black outline-none focus:border-black"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className={`box-shadow z-10 flex h-12 items-center justify-center rounded-full border border-black px-4 font-medium text-black ${
                buttonLoading
                  ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300"
                  : "bg-white hover:bg-green-600 hover:text-white"
              }`}
              onClick={handleSubmitClick}
              disabled={buttonLoading}
            >
              {buttonLoading
                ? lang === "en"
                  ? "Submitting"
                  : "Skickar"
                : buttonText}
            </button>
          </div>
          <p className="text-zinc-400">
            {lang === "en" ? "It's so easy! 🌵" : "Det är så enkelt! 🌵"}
          </p>
        </div>
      </section>

      {/* <section className="flex w-screen pb-40 items-center justify-center px-4">
        <Record question="How did you hear about us?"/>
      </section> */}
    </main>
  );
}
