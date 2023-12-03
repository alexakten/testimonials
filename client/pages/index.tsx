import { useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Logo from "../public/logo";
import Image from "next/image";

export default function LandingPage() {
  const [lang, setLang] = useState("en");

  const [email, setEmail] = useState("");

  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update the email state variable when the input changes
  };

  const handleJoinWaitlistClick = () => {
    if (emailRef.current) {
      // Check if emailRef.current is not null
      emailRef.current.focus(); // If it’s not null, call the focus method
    }
  };

  const [buttonText, setButtonText] = useState("Join waitlist"); // Create a state variable for the button text

  const handleButtonClick = () => {
    setButtonText("Submitting"); // Update the button text state

    const functionURL =
      "https://testimonials-git-main-alexakten.vercel.app/api/submit-email";
    axios
      .post(functionURL, { email })
      .then((response) => {
        setButtonText("Submitted!"); // Update the button text state upon successful submission
      })
      .catch((error) => {
        setButtonText("Failed to submit."); // Update the button text state upon failure
      });
  };

  return (
    <main className="flex flex-col px-4 items-center justify-center bg-zinc-100">
      <nav className="flex w-full z-100 justify-between items-center fixed px-4 xs:px-6 top-5">
        <Link href="/">
          <Logo></Logo>
        </Link>
        <div className="flex flex-row text-black font-medium gap-4 ">
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
      <section className="flex items-center px-4 pt-32 sm:pt-56 pb-16 justify-center w-screen">
        <div className="flex flex-col items-center gap-6 text-gray-900 text-center max-w-4xl">
          <div className="border bg-white px-4 py-1 rounded-full text-zinc-400 border-zinc-300">
            {lang === "en" ? "v1.0 launching soon. " : "v1.0 kommer snart. "}
            <span className="text-indigo-500 font-medium">
              <button onClick={handleJoinWaitlistClick}>
                {lang === "en" ? "Join waitlist →" : "Väntelista →"}
              </button>
            </span>
          </div>
          <div className="h1-container">
            <h1
              className="text-5xl sm:text-8xl tracking-tighter font-semibold"
              style={{ lineHeight: 1.1 }}
              data-text={
                lang === "en"
                  ? "Boost your business with social proof. "
                  : "Boosta ditt varumärke med text- och videorecensioner."
              }
            >
              {lang === "en"
                ? "Boost your business with "
                : "Boosta ditt varumärke med text- och "}
              <span className="white-shadow">
                {lang === "en" ? "social proof." : "videorecensioner."}
              </span>
            </h1>
          </div>

          <div className="text-md xs:text-xl" style={{ maxWidth: 640 }}>
            <p>
              {lang === "en"
                ? "Increase conversion and grow your business with authentic testimonials and case studies on your website, ads, and social channels."
                : "Öka din konvertering och väx ditt varumärke med övertygande recensioner och case studies på din hemsida, i annonser, och sociala kanaler."}
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-4 items-center">
            <input
              type="email"
              required
              className="px-4 h-12 w-80 border text-black outline-none border-zinc-300 focus:border-indigo-500 rounded-full"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className="flex items-center justify-center z-10 rounded-full border border-black text-white font-medium bg-indigo-500 px-4 h-12"
              onClick={handleButtonClick}
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
          <p className="text-zinc-400">
            {lang === "en" ? "It's so easy! 🧡" : "Det är så enkelt! 🧡"}
          </p>
        </div>
      </section>

      {/* Screen Section */}
      <section className="px-4 sm:px-24 py-16">
        <Image
          className="border border-black rounded-3xl"
          src="/dashboard.jpg" // Path to the image in the public folder
          alt="Dashboard" // Alt text for the image
          width={500} // Desired width (can be adjusted)
          height={300} // Desired height (can be adjusted)
          layout="responsive" // This can be 'fixed', 'intrinsic', or 'responsive'
        />
      </section>

      {/* Collect Section */}
      <section className="flex flex-row items-center align-center py-16">
        <div className="px-4 sm:px-24 gap-16 sm:gap-32 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col max-w-lg gap-6 text-black">
            <h1 className="font-semibold text-3xl md:text-5xl">
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
      <section className="flex flex-row items-center align-center py-16">
        <div className="px-4 sm:px-24 gap-16 sm:gap-32 flex flex-col lg:flex-row-reverse items-center">
          <div className="flex flex-col max-w-lg gap-6 text-black">
            <h1 className="font-semibold text-3xl md:text-5xl">
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
      <section className="flex items-center pt-32 pb-32 justify-center w-screen">
        <div className="flex flex-col items-center gap-6 text-black text-center max-w-4xl">
          <h1
            className="text-3xl xs:text-6xl font-semibold"
            style={{ lineHeight: 1.1 }}
          >
            {lang === "en"
              ? "Join the waitlist today."
              : "Ställ dig i kön idag. "}
          </h1>
          <div className="text-md xs:text-lg" style={{ maxWidth: 640 }}>
            <p>
              {lang === "en"
                ? "Get notified when we launch. "
                : "Få en notis när vi lanserar."}
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-4 items-center">
            <input
              type="email"
              required
              className="px-4 h-12 w-80 border text-black outline-none border-zinc-300 focus:border-indigo-500 rounded-full"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className="flex items-center justify-center z-10 rounded-full border border-black text-white font-medium bg-indigo-500 px-4 h-12"
              onClick={handleButtonClick}
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
