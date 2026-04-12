// app/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Cache w pamięci serwera - działa dla wszystkich graczy
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minut

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const day = searchParams.get("day");
  const mode = searchParams.get("mode") || "rap";

  if (!day) {
    return NextResponse.json({ error: "Missing day param" }, { status: 400 });
  }

  const cacheKey = `${day}:${mode}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const dayNum = parseInt(day);
    const key =
      dayNum >= 17 || mode !== "rap"
        ? `stats:day:${day}:${mode}`
        : `stats:day:${day}`;

    const pipeline = redis.pipeline();
    pipeline.hgetall(`${key}:attempts`);
    pipeline.get(`${key}:total`);
    pipeline.get(`${key}:wins`);
    const [attempts, total, wins] = await pipeline.exec();

    const data = {
      attempts: (attempts as Record<string, number>) ?? {},
      total: (total as number) ?? 0,
      wins: (wins as number) ?? 0,
    };

    cache.set(cacheKey, { data, timestamp: Date.now() });

    return NextResponse.json(data);
  } catch (err) {
    console.error("Redis GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
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
    const key =
      dayNum >= 17 || mode !== "rap"
        ? `stats:day:${day}:${mode}`
        : `stats:day:${day}`;

    const pipeline = redis.pipeline();
    pipeline.incr(`${key}:total`);
    if (won) pipeline.incr(`${key}:wins`);
    const attemptKey = won && attempt !== null ? String(attempt) : "X";
    pipeline.hincrby(`${key}:attempts`, attemptKey, 1);
    await pipeline.exec();

    // Wyczyść cache po zapisie
    cache.delete(`${day}:${mode}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Redis POST error:", err);
    return NextResponse.json(
      { error: "Failed to save stats" },
      { status: 500 },
    );
  }
}