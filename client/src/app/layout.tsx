import React, { ReactNode } from "react";
import Head from "next/head";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>Mendly | Social Proof</title>{" "}
        <meta
          name="description"
          content="Boost your business with social proof."
        />{" "}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Analytics />
    </>
  );
}
