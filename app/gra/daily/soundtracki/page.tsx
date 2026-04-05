import DailySoundtracki from "@/app/components/gra/daily/soundtracki";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DailySoundtracki />
    </Suspense>
  );
}