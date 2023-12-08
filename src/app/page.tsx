"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import ServiceCard from "./components/ServiceCard";
import TotalPriceCard from "./components/TotalPriceCard";
import axios from "axios";
import Link from "next/link";
import Logo from "../../public/logo";
import Image from "next/image";

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
          style={{ maxWidth: 800 }}
        >
          <div className="rounded-full border border-zinc-300 bg-white px-4 py-1 text-zinc-400">
            {lang === "en" ? "v1.0 launching soon. " : "v1.0 kommer snart. "}
            <span className="font-medium text-black">
              <button onClick={() => emailRef.current?.focus()}>
                {lang === "en" ? "Join waitlist →" : "Väntelista →"}
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
                ? "Use video to ask questions and collect video responses. Interviews, testimonials, lead gen — it all becomes easy with async conversation."
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

      {/* Services Section */}
      <section className="relative flex w-screen flex-col items-center justify-center gap-16 overflow-hidden bg-zinc-100 px-4 pb-40">
        {/* Heading */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-zinc-950">Step 1</p>
            <h2 className="gray-shadow text-4xl font-medium tracking-tight text-zinc-950 xs:text-5xl">
              {lang === "en" ? "Select a plan" : "Välj en plan"}
            </h2>
          </div>
          <p className="text-md max-w-xs text-center font-normal text-zinc-950 xs:text-lg">
            {lang === "en"
              ? "Create your own plan. Each month you only pay for what you need."
              : "Välj mellan en eller två requests åt gången. Obegränsad revision, alltid."}
          </p>
        </div>
        {/* Cards Container */}
        <div className="flex w-full flex-col items-center gap-4">
          {/* Pricing Cards Grid */}
          <div className="grid w-full max-w-5xl gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <div className="col-span-1 row-span-1">
              {" "}
              <ServiceCard
                title={serviceTitles[0]}
                cost={serviceCosts.service1}
                features={serviceFeatures[0]}
                isSelected={isService1Selected}
                onToggle={handleService1Toggle}
                lang="en"
              />
            </div>
            <div className="col-span-1 row-span-1">
              {" "}
              <ServiceCard
                title={serviceTitles[1]}
                cost={serviceCosts.service2}
                features={serviceFeatures[1]}
                isSelected={isService2Selected}
                onToggle={handleService2Toggle}
                lang="en"
              />
            </div>
            <div className="col-span-1 row-span-1">
              {" "}
              <ServiceCard
                title={serviceTitles[2]}
                cost={serviceCosts.service3}
                features={serviceFeatures[2]}
                isSelected={isService3Selected}
                onToggle={handleService3Toggle}
                lang="en"
              />
            </div>
            <div className="col-span-3 row-span-1">
              <TotalPriceCard
                serviceTitles={serviceTitles}
                serviceCosts={serviceCosts}
                selectedServices={[
                  isService1Selected,
                  isService2Selected,
                  isService3Selected,
                ]}
                totalPrice={totalPrice}
                lang="en"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screen Section */}
      <section className="px-4 py-16 sm:px-24">
        <Image
          className="rounded-3xl border border-black"
          src="/dashboard.jpg" // Path to the image in the public folder
          alt="Dashboard" // Alt text for the image
          width={500} // Desired width (can be adjusted)
          height={300} // Desired height (can be adjusted)
          layout="responsive" // This can be 'fixed', 'intrinsic', or 'responsive'
        />
      </section>

      {/* Collect Section */}
      <section className="align-center flex flex-row items-center py-16">
        <div className="flex flex-col items-center gap-16 px-4 sm:gap-32 sm:px-24 lg:flex-row">
          <div className="flex max-w-lg flex-col gap-6 text-black">
            <h1 className="text-3xl font-semibold tracking-tighter md:text-5xl">
              {lang === "en"
                ? "Collect & publish testimonials with ease"
                : "Samla & publicera kundrecensioner enkelt"}
            </h1>
            <p className="text-md xs:text-lg">
              {lang === "en"
                ? "Mendly supports video, text and voice testimonials so that you can get great reviews for any platform."
                : "Mendly stödjer video-, text- och röstrecensioner så att du kan få fantastiska recensioner till alla platformar."}
            </p>
          </div>
          <div className="max-w-md">
            <Image
              src="/collect.jpg"
              alt="Collect"
              width={125}
              height={75}
              layout="responsive"
            />
          </div>
        </div>
      </section>

      {/* Embed Section */}
      <section className="align-center flex flex-row items-center py-16">
        <div className="flex flex-col items-center gap-16 px-4 sm:gap-32 sm:px-24 lg:flex-row-reverse">
          <div className="flex max-w-lg flex-col gap-6 text-black">
            <h1 className="text-3xl font-semibold tracking-tighter md:text-5xl">
              {lang === "en"
                ? "Embed on your website and socials"
                : "Embedda på din hemsida och sociala kanaler"}
            </h1>
            <p className="text-md xs:text-lg">
              {lang === "en"
                ? "Let your customers do the selling for you. Embed your testimonials on your website once, and use our platform to control what you display."
                : "Låt dina kunder sköta säljet åt dig. Embedda dina recensioner på din hemsida en gång, och använd vår platform för att kontrollera vad du visar."}
            </p>
          </div>
          <div className="max-w-md">
            <Image
              src="/share.png"
              alt="Share"
              width={125}
              height={75}
              layout="responsive"
            />
          </div>
        </div>
      </section>

      {/* Join Waitlist Section */}
      <section className="flex w-screen items-center justify-center pb-32 pt-32">
        <div className="flex max-w-4xl flex-col items-center gap-6 text-center text-black">
          <h1
            className="text-3xl font-semibold tracking-tight xs:text-6xl"
            style={{ lineHeight: 1.1 }}
          >
            {lang === "en"
              ? "Join the waitlist today"
              : "Ställ dig i kön idag "}
          </h1>
          <div className="text-md xs:text-lg" style={{ maxWidth: 640 }}>
            <p>
              {lang === "en"
                ? "Get notified when we launch. "
                : "Få en notis när vi lanserar."}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 xs:flex-row">
            <input
              type="email"
              required
              className="h-12 w-80 rounded-full border border-zinc-300 px-4 text-black outline-none focus:border-indigo-500"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className="z-10 flex h-12 items-center justify-center rounded-full border border-black bg-indigo-500 px-4 font-medium text-white"
              onClick={handleSubmitClick}
            >
              {lang === "en"
                ? buttonText === "Join waitlist"
                  ? "Join waitlist"
                  : buttonText === "Submitting"
                    ? "Submitting"
                    : buttonText === "Submitted!"
                      ? "Submitted!"
                      : "Failed."
                : buttonText === "Join waitlist"
                  ? "Ställ dig i kö"
                  : buttonText === "Submitting"
                    ? "Skickar"
                    : buttonText === "Submitted!"
                      ? "Inskickad!"
                      : "Misslyckades."}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
