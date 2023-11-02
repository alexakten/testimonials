import '../../../styles/globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans as PlusJakartaSansFromNext } from 'next/font/google';

const Plus_Jakarta_Sans = PlusJakartaSansFromNext({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Samla och publicera kundrecensioner i videoformat.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Plus_Jakarta_Sans.className}>{children}</body>
    </html>
  )
}
