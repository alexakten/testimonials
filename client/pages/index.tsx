import { useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Logo from "./../public/src/logo";

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

    const functionURL = "http://127.0.0.1:5001/testimonials-c3d77/us-central1/api/submit-email";
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
    <main
      className="flex px-4 items-center justify-center bg-zinc-50"
      style={{
        backgroundSize: '96px 96px',
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.3'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='white'/%3E%3C/svg%3E")
    `,
        backgroundPosition: 'center center',
      }}
    >
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
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center gap-6 text-black text-center max-w-4xl">
          <div className="border bg-white px-4 py-1 rounded-full text-zinc-400 border-zinc-300">
            {lang === "en" ? "v1.0 launching soon. " : "v1.0 kommer snart. "}
            <span className="text-indigo-500 font-medium">
              <button onClick={handleJoinWaitlistClick}>
                {lang === "en" ? "Join waitlist →" : "Väntelista →"}
              </button>
            </span>
          </div>
          <h1
            className="text-3xl xs:text-6xl font-semibold"
            style={{ lineHeight: 1.1 }}
          >
            {lang === "en"
              ? "Fastest way to boost your business with "
              : "Samla och publicera kund-recensioner i "}
            <span className="text-black">
              {lang === "en" ? "social proof." : "videoformat."}
            </span>
          </h1>
          <div className="text-md xs:text-lg" style={{ maxWidth: 640 }}>
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
        </div>
      </div>
    </main>
  );
}
