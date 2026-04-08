"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamiczny import właściwego komponentu gry (tylko po stronie klienta)
const HomeClient = dynamic(
  () => import('./HomePage'),
  { ssr: false }
);

export default function HomeClientWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeClient />
    </Suspense>
  );
}