"use client";

import Record from "../components/RecordScreen";

export default function RecordPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-zinc-100 px-4">
      {/* Hero Section */}
      <section className="flex h-screen w-screen items-center justify-center px-4">
        <Record question="How did you hear about us?"/>
      </section>
    </main>
  );
}
