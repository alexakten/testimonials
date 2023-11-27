import { Plus_Jakarta_Sans as PlusJakartaSansFromNext } from "next/font/google";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

const Plus_Jakarta_Sans = PlusJakartaSansFromNext({ subsets: ["latin"] });

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
    <div className={Plus_Jakarta_Sans.className}>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {children}
      <Analytics />
    </div>
  );
}
