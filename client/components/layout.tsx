import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";


const metadata = {
  title: "Social proof | Mendly",
  description: "Boost your business with social proof.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {children}
      <Analytics />
    </div>
  );
}
