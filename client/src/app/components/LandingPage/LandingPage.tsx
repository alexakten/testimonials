import { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
    setButtonText("Submitted!"); // Update the button text state
    // ... your other code for the click event ...
  };

  return (
    <main className="flex items-center justify-center bg-zinc-50">
      <nav className="flex w-full justify-start fixed px-4 xs:px-8 top-8">
        <svg
          width="166"
          height="27"
          viewBox="0 0 166 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.8638 23V5.04753H39.5317V23H36.8638ZM39.0829 15.819L44.8177 9.71018H48.0093L42.075 15.819H39.0829ZM39.0829 15.819L42.0999 15.4201L48.3584 23H45.0421L39.0829 15.819ZM49.6814 23V9.71018H52.3494V23H49.6814ZM49.6814 8.06454V5.04753H52.3494V8.06454H49.6814ZM54.9507 23V9.71018H57.6186V23H54.9507ZM57.6186 15.1957H56.5714C56.6545 13.8991 56.9121 12.8186 57.3443 11.9542C57.7931 11.0899 58.3832 10.4416 59.1146 10.0094C59.846 9.5772 60.6855 9.36111 61.633 9.36111C62.5638 9.36111 63.3617 9.54396 64.0266 9.90966C64.6915 10.2587 65.2068 10.7907 65.5725 11.5054C65.9382 12.2036 66.1211 13.0763 66.1211 14.1235V23H63.4781V14.672C63.4781 14.0238 63.3784 13.4752 63.1789 13.0264C62.9794 12.561 62.6885 12.2036 62.3062 11.9542C61.9239 11.7049 61.4252 11.5802 60.8102 11.5802C60.3115 11.5802 59.8627 11.6883 59.4637 11.9044C59.0648 12.1038 58.724 12.3698 58.4414 12.7023C58.1755 13.0347 57.9677 13.417 57.8181 13.8492C57.6851 14.2814 57.6186 14.7302 57.6186 15.1957ZM73.7291 23.3241C72.5655 23.3241 71.5598 23.0499 70.7121 22.5013C69.8643 21.9361 69.216 21.13 68.7672 20.0827C68.3184 19.0355 68.094 17.7971 68.094 16.3676C68.094 14.1069 68.601 12.3781 69.615 11.1813C70.629 9.96784 72.0003 9.36111 73.7291 9.36111C75.2251 9.36111 76.4136 9.95952 77.2946 11.1564C78.1923 12.3532 78.6411 14.0903 78.6411 16.3676C78.6411 17.7971 78.4416 19.0355 78.0427 20.0827C77.6437 21.1133 77.0702 21.9112 76.3222 22.4764C75.5908 23.0416 74.7264 23.3241 73.7291 23.3241ZM74.0782 21.0801C75.142 21.0801 75.9482 20.6811 76.4967 19.8833C77.0619 19.0687 77.3445 17.8968 77.3445 16.3676C77.3445 14.8383 77.0536 13.6664 76.4718 12.8519C75.9066 12.0207 75.1088 11.6052 74.0782 11.6052C73.0143 11.6052 72.1998 12.0124 71.6346 12.8269C71.0861 13.6414 70.8118 14.8217 70.8118 16.3676C70.8118 17.8802 71.0944 19.0438 71.6596 19.8583C72.2413 20.6728 73.0475 21.0801 74.0782 21.0801ZM77.3445 23V5.04753H80.0124V23H77.3445ZM82.6069 23V9.71018H85.2749V23H82.6069ZM85.2749 15.7442H84.2775C84.344 14.2482 84.6017 13.0347 85.0505 12.1038C85.5159 11.1564 86.0894 10.4665 86.7709 10.0343C87.4691 9.58551 88.2337 9.36111 89.0648 9.36111C89.3308 9.36111 89.5801 9.39435 89.8129 9.46084C90.0456 9.51071 90.2201 9.59383 90.3365 9.71018V12.054C90.137 11.9875 89.9209 11.9459 89.6882 11.9293C89.4555 11.8961 89.1978 11.8794 88.9152 11.8794C88.2836 11.8794 87.735 11.9709 87.2696 12.1537C86.8208 12.3366 86.4468 12.6025 86.1476 12.9516C85.8484 13.2841 85.624 13.6913 85.4744 14.1734C85.3414 14.6388 85.2749 15.1624 85.2749 15.7442ZM101.807 15.0461L100.286 16.2928C100.286 14.7801 99.9871 13.6165 99.3887 12.802C98.7903 11.9875 97.9342 11.5802 96.8205 11.5802C95.6901 11.5802 94.8258 11.9958 94.2273 12.8269C93.6456 13.6414 93.3547 14.8217 93.3547 16.3676C93.3547 17.8802 93.6622 19.0521 94.2772 19.8833C94.9089 20.6978 95.7982 21.105 96.9452 21.105C97.7929 21.105 98.4994 20.9055 99.0645 20.5066C99.6463 20.1077 100.054 19.4926 100.286 18.6615H103.079C102.713 20.2074 101.982 21.371 100.885 22.1522C99.8043 22.9335 98.4911 23.3241 96.9452 23.3241C95.6486 23.3241 94.5266 23.0499 93.5791 22.5013C92.6316 21.9361 91.9002 21.13 91.3849 20.0827C90.8862 19.0355 90.6369 17.7971 90.6369 16.3676C90.6369 14.8549 90.8862 13.5833 91.3849 12.5527C91.9002 11.5054 92.6233 10.7159 93.5541 10.1839C94.485 9.63538 95.5738 9.36111 96.8205 9.36111C98.1004 9.36111 99.1975 9.64369 100.112 10.2089C101.026 10.7574 101.732 11.5387 102.231 12.5527C102.73 13.5666 102.979 14.7884 102.979 16.218V16.8662H91.7339V15.0461H101.807ZM110.015 23.3241C108.851 23.3241 107.846 23.0499 106.998 22.5013C106.15 21.9361 105.502 21.13 105.053 20.0827C104.604 19.0355 104.38 17.7971 104.38 16.3676C104.38 14.1069 104.887 12.3781 105.901 11.1813C106.915 9.96784 108.286 9.36111 110.015 9.36111C111.511 9.36111 112.699 9.95952 113.58 11.1564C114.478 12.3532 114.927 14.0903 114.927 16.3676C114.927 17.7971 114.727 19.0355 114.328 20.0827C113.929 21.1133 113.356 21.9112 112.608 22.4764C111.877 23.0416 111.012 23.3241 110.015 23.3241ZM110.364 21.0801C111.428 21.0801 112.234 20.6811 112.783 19.8833C113.348 19.0687 113.63 17.8968 113.63 16.3676C113.63 14.8383 113.339 13.6664 112.758 12.8519C112.192 12.0207 111.395 11.6052 110.364 11.6052C109.3 11.6052 108.486 12.0124 107.92 12.8269C107.372 13.6414 107.098 14.8217 107.098 16.3676C107.098 17.8802 107.38 19.0438 107.945 19.8583C108.527 20.6728 109.333 21.0801 110.364 21.0801ZM113.63 23V5.04753H116.298V23H113.63Z"
            fill="black"
          />
          <path
            d="M119.192 9.01203C119.192 7.56586 119.499 6.4937 120.114 5.79555C120.746 5.08077 121.677 4.72339 122.907 4.72339C123.256 4.72339 123.555 4.74832 123.805 4.79819C124.054 4.84806 124.245 4.90624 124.378 4.97273V6.76797H124.129C123.215 6.76797 122.6 6.95913 122.284 7.34146C121.985 7.70715 121.835 8.27233 121.835 9.03697V23H119.192V9.01203ZM117.397 11.7797V9.71018H124.378V11.7797H117.397ZM135.926 15.0461L134.405 16.2928C134.405 14.7801 134.106 13.6165 133.507 12.802C132.909 11.9875 132.053 11.5802 130.939 11.5802C129.809 11.5802 128.944 11.9958 128.346 12.8269C127.764 13.6414 127.473 14.8217 127.473 16.3676C127.473 17.8802 127.781 19.0521 128.396 19.8833C129.028 20.6978 129.917 21.105 131.064 21.105C131.912 21.105 132.618 20.9055 133.183 20.5066C133.765 20.1077 134.172 19.4926 134.405 18.6615H137.198C136.832 20.2074 136.1 21.371 135.003 22.1522C133.923 22.9335 132.61 23.3241 131.064 23.3241C129.767 23.3241 128.645 23.0499 127.698 22.5013C126.75 21.9361 126.019 21.13 125.504 20.0827C125.005 19.0355 124.756 17.7971 124.756 16.3676C124.756 14.8549 125.005 13.5833 125.504 12.5527C126.019 11.5054 126.742 10.7159 127.673 10.1839C128.604 9.63538 129.692 9.36111 130.939 9.36111C132.219 9.36111 133.316 9.64369 134.23 10.2089C135.145 10.7574 135.851 11.5387 136.35 12.5527C136.848 13.5666 137.098 14.7884 137.098 16.218V16.8662H125.853V15.0461H135.926ZM149.669 15.0461L148.148 16.2928C148.148 14.7801 147.849 13.6165 147.25 12.802C146.652 11.9875 145.796 11.5802 144.682 11.5802C143.552 11.5802 142.687 11.9958 142.089 12.8269C141.507 13.6414 141.216 14.8217 141.216 16.3676C141.216 17.8802 141.524 19.0521 142.139 19.8833C142.77 20.6978 143.66 21.105 144.807 21.105C145.654 21.105 146.361 20.9055 146.926 20.5066C147.508 20.1077 147.915 19.4926 148.148 18.6615H150.94C150.575 20.2074 149.843 21.371 148.746 22.1522C147.666 22.9335 146.353 23.3241 144.807 23.3241C143.51 23.3241 142.388 23.0499 141.441 22.5013C140.493 21.9361 139.762 21.13 139.246 20.0827C138.748 19.0355 138.498 17.7971 138.498 16.3676C138.498 14.8549 138.748 13.5833 139.246 12.5527C139.762 11.5054 140.485 10.7159 141.416 10.1839C142.347 9.63538 143.435 9.36111 144.682 9.36111C145.962 9.36111 147.059 9.64369 147.973 10.2089C148.888 10.7574 149.594 11.5387 150.093 12.5527C150.591 13.5666 150.841 14.7884 150.841 16.218V16.8662H139.596V15.0461H149.669ZM157.876 23.3241C156.713 23.3241 155.707 23.0499 154.859 22.5013C154.012 21.9361 153.363 21.13 152.915 20.0827C152.466 19.0355 152.241 17.7971 152.241 16.3676C152.241 14.1069 152.748 12.3781 153.762 11.1813C154.776 9.96784 156.148 9.36111 157.876 9.36111C159.372 9.36111 160.561 9.95952 161.442 11.1564C162.34 12.3532 162.788 14.0903 162.788 16.3676C162.788 17.7971 162.589 19.0355 162.19 20.0827C161.791 21.1133 161.218 21.9112 160.47 22.4764C159.738 23.0416 158.874 23.3241 157.876 23.3241ZM158.225 21.0801C159.289 21.0801 160.096 20.6811 160.644 19.8833C161.209 19.0687 161.492 17.8968 161.492 16.3676C161.492 14.8383 161.201 13.6664 160.619 12.8519C160.054 12.0207 159.256 11.6052 158.225 11.6052C157.162 11.6052 156.347 12.0124 155.782 12.8269C155.233 13.6414 154.959 14.8217 154.959 16.3676C154.959 17.8802 155.242 19.0438 155.807 19.8583C156.389 20.6728 157.195 21.0801 158.225 21.0801ZM161.492 23V5.04753H164.16V23H161.492Z"
            fill="#6054FC"
          />
          <circle cx="12.5" cy="13.8354" r="12.5" fill="#6054FC" />
          <path
            d="M20.3653 12.8739C21.3309 12.8739 22.1297 13.663 21.9551 14.6126C21.833 15.2764 21.6412 15.927 21.3817 16.5536C20.8984 17.7202 20.1902 18.7802 19.2973 19.673C18.4044 20.5659 17.3444 21.2742 16.1778 21.7574C15.0113 22.2406 13.7609 22.4893 12.4982 22.4893C11.2355 22.4893 9.98514 22.2406 8.81855 21.7574C7.65196 21.2742 6.59196 20.5659 5.69909 19.673C4.80622 18.7802 4.09796 17.7202 3.61474 16.5536C3.35522 15.927 3.16335 15.2764 3.04131 14.6126C2.86672 13.663 3.66553 12.8739 4.63106 12.8739L12.4982 12.8739H20.3653Z"
            fill="#F3F3F3"
          />
        </svg>
      </nav>
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
