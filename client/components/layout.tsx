import { Plus_Jakarta_Sans as PlusJakartaSansFromNext } from "next/font/google";
import Head from "next/head";

const Plus_Jakarta_Sans = PlusJakartaSansFromNext({ subsets: ["latin"] });

const metadata = {
  title: "Mendly",
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
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {children}
    </div>
  );
}
