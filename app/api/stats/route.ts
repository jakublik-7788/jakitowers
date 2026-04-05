// app/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const day = searchParams.get("day");
  const mode = searchParams.get("mode") || "rap"; // domyślnie rap

  if (!day) {
    return NextResponse.json({ error: "Missing day param" }, { status: 400 });
  }

  try {
    const [attempts, total, wins] = await Promise.all([
      redis.hgetall(`stats:day:${day}:${mode}:attempts`),
      redis.get<number>(`stats:day:${day}:${mode}:total`),
      redis.get<number>(`stats:day:${day}:${mode}:wins`),
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
    const { day, attempt, won, mode } = body as {
      day: number;
      attempt: number | null;
      won: boolean;
      mode?: string;
    };

    if (!day) {
      return NextResponse.json({ error: "Missing day" }, { status: 400 });
    }

    const modeKey = mode || "rap";

    const pipeline = redis.pipeline();
    pipeline.incr(`stats:day:${day}:${modeKey}:total`);

    if (won && attempt !== null) {
      pipeline.incr(`stats:day:${day}:${modeKey}:wins`);
      pipeline.hincrby(`stats:day:${day}:${modeKey}:attempts`, String(attempt), 1);
    } else {
      pipeline.hincrby(`stats:day:${day}:${modeKey}:attempts`, "X", 1);
    }

    await pipeline.exec();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Redis POST error:", err);
    return NextResponse.json({ error: "Failed to save stats" }, { status: 500 });
  }
}