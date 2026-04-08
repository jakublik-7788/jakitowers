"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const NonLimitGame = dynamic(
  () => import('@/app/components/gra/nonlimit').then(mod => mod.default),
  { ssr: false }
);

export default function NonLimitClientWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <NonLimitGame />
    </Suspense>
  );
}