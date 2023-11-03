import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from "./../public/src/logo";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfQc1iJ3QSR5CHr2Y64ffwOOFwa5wqJzE",
  authDomain: "testimonials-c3d77.firebaseapp.com",
  projectId: "testimonials-c3d77",
  storageBucket: "testimonials-c3d77.appspot.com",
  messagingSenderId: "125518248646",
  appId: "1:125518248646:web:185228f5893e6a599775c7",
  measurementId: "G-W28TNP1784",
};

const app = initializeApp(firebaseConfig);

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const router = useRouter(); // Get the navigate function

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");

      router.push('/login'); // Redirect to the login page or any other page
    } catch (error: any) {
      alert(error.message); // Display error message to user
    }
  };

  return (
    <main className="flex items-center justify-center bg-zinc-50 h-screen">
       <nav className="flex w-full z-100 justify-start fixed px-4 xs:px-6 top-8">
        <Link href="/">
          <Logo></Logo>
        </Link>
        {/* <div className="flex flex-row text-black font-medium gap-4 fixed top-8 right-8">
          <Link
            href="/login"
            className="flex items-center justify-center z-10 bg-black text-white rounded-full px-4 h-12"
          >
            Log in
          </Link>
        </div> */}
      </nav>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-semibold leading-9 text-black">
            Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
              <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)} // Capture input
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
              <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)} // Capture input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)} // Capture input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-purple hover:text-indigo-500"
            >
              Sign in.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
