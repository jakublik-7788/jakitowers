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

    const newKey = `stats:day:${day}:${mode}`;
    const oldKey = `stats:day:${day}`;

    const key = useNewFormat ? newKey : oldKey;

    const [attempts, total, wins] = await Promise.all([
      redis.hgetall(`${key}:attempts`),
      redis.get<number>(`${key}:total`),
      redis.get<number>(`${key}:wins`),
    ]);

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { day, attempt, won, mode = "rap" } = body;

    if (!day) {
      return NextResponse.json({ error: "Missing day" }, { status: 400 });
    }

    const dayNum = parseInt(day);
    const useNewFormat = dayNum >= 17 || mode !== "rap";
    const key = useNewFormat ? `stats:day:${day}:${mode}` : `stats:day:${day}`;

    const pipeline = redis.pipeline();

    pipeline.incr(`${key}:total`);

    if (won) {
      pipeline.incr(`${key}:wins`);
    }

    const attemptKey = won && attempt !== null ? String(attempt) : "X";
    pipeline.hincrby(`${key}:attempts`, attemptKey, 1);

    await pipeline.exec();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Redis POST error:", err);
    return NextResponse.json({ error: "Failed to save stats" }, { status: 500 });
  }
}