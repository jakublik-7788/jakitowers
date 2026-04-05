// app/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const day = searchParams.get("day");
  const mode = searchParams.get("mode") || "rap";

  if (!day) {
    return NextResponse.json({ error: "Missing day param" }, { status: 400 });
  }

  try {
    const dayNum = parseInt(day);
    const useNewFormat = dayNum >= 17 || mode !== "rap";

    // Nowy format z trybem
    const newKey = `stats:day:${day}:${mode}`;
    // Stary format bez trybu (dni 1-16 rap)
    const oldKey = `stats:day:${day}`;

    const key = useNewFormat ? newKey : oldKey;

    const [attempts, total, wins] = await Promise.all([
      redis.hgetall(`${key}:attempts`),
      redis.get<number>(`${key}:total`),
      redis.get<number>(`${key}:wins`),
    ]);

    // Jeśli nowy format pusty a to rap, spróbuj stary
    if ((!attempts || Object.keys(attempts).length === 0) && mode === "rap" && useNewFormat) {
      const [oldAttempts, oldTotal, oldWins] = await Promise.all([
        redis.hgetall(`${oldKey}:attempts`),
        redis.get<number>(`${oldKey}:total`),
        redis.get<number>(`${oldKey}:wins`),
      ]);
      return NextResponse.json({
        attempts: oldAttempts ?? {},
        total: oldTotal ?? 0,
        wins: oldWins ?? 0,
      });
    }

    return NextResponse.json({
      attempts: attempts ?? {},
      total: total ?? 0,
      wins: wins ?? 0,
    });
  } catch (err) {
    console.error("Redis GET error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}