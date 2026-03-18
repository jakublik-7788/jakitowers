// app/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const day = searchParams.get("day");

  if (!day) {
    return NextResponse.json({ error: "Missing day param" }, { status: 400 });
  }

  try {
    const [attempts, total, wins] = await Promise.all([
      redis.hgetall(`stats:day:${day}:attempts`),
      redis.get<number>(`stats:day:${day}:total`),
      redis.get<number>(`stats:day:${day}:wins`),
    ]);

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
    const { day, attempt, won } = body as {
      day: number;
      attempt: number | null;
      won: boolean;
    };

    if (!day) {
      return NextResponse.json({ error: "Missing day" }, { status: 400 });
    }

    const pipeline = redis.pipeline();
    pipeline.incr(`stats:day:${day}:total`);

    if (won && attempt !== null) {
      pipeline.incr(`stats:day:${day}:wins`);
      pipeline.hincrby(`stats:day:${day}:attempts`, String(attempt), 1);
    } else {
      pipeline.hincrby(`stats:day:${day}:attempts`, "X", 1);
    }

    await pipeline.exec();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Redis POST error:", err);
    return NextResponse.json({ error: "Failed to save stats" }, { status: 500 });
  }
}