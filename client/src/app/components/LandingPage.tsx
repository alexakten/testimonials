import { useState, useRef } from "react";
import axios from 'axios';

export default function LandingPage() {
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
    
    axios.post('http://localhost:3003/submit-email', { email })
      .then(response => {
        setButtonText("Submitted!"); // Update the button text state upon successful submission
      })
      .catch(error => {
        setButtonText("Failed to submit. Try again."); // Update the button text state upon failure
        console.error("There was an error submitting the email!", error);
      });
  };

  return (
    <main className="flex items-center justify-center bg-zinc-50">
      
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center gap-6 text-black text-center max-w-4xl">
          <div className="border px-4 py-1 rounded-full text-zinc-400 border-zinc-200">
            v1.0 launching soon.{" "}
            <span className="text-purple font-medium">
              <button onClick={handleJoinWaitlistClick}>Join waitlist →</button>
            </span>
          </div>
          <h1 className="text-6xl font-semibold">
            Fastest way to collect & publish{" "}
            <span className="text-purple">video testimonials.</span>
          </h1>
          <div className="max-w-xl text-lg">
            <p>
              {" "}
              Engage customers in leaving authentic and honest testimonials
              to be used on your website, ads, and social channels.
            </p>
          </div>
          <div className="flex w-flex-row gap-4 items-center">
            <input
              type="text"
              className="px-4 py-3 w-80 border text-black outline-none border-zinc-200 focus:border-purple rounded-full"
              placeholder="Email"
              ref={emailRef}
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="button"
              className="flex items-center justify-center z-10 rounded-full text-white bg-purple px-4 py-3"
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
