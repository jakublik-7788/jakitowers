// app/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Cache w pamięci serwera — tylko dla starych dni
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_OLD = 24 * 60 * 60 * 1000; // 24h — stare dni się nie zmieniają

// ─── Helpers — identyczna logika jak w Usecalendar.ts ────────────────────────

// 19 marca 2026 23:00 UTC = 20 marca 00:00 polskiego czasu (zima)
const GAME_START_DATE = new Date(Date.UTC(2026, 2, 19, 23, 0, 0));

function getPolandOffset(): number {
  const now = new Date();
  const jan = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const jul = new Date(Date.UTC(now.getUTCFullYear(), 6, 1));
  const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  const isDST = now.getTimezoneOffset() < stdOffset;
  return isDST ? 2 : 1;
}

function todayPoland(): Date {
  const now = new Date();
  const polandOffset = getPolandOffset() * 60 * 60 * 1000;
  const polandNow = new Date(now.getTime() + polandOffset);
  return new Date(
    Date.UTC(
      polandNow.getUTCFullYear(),
      polandNow.getUTCMonth(),
      polandNow.getUTCDate(),
    ),
  );
}

function getTodayDayNumber(): number {
  const diff = Math.floor(
    (todayPoland().getTime() - GAME_START_DATE.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const dayNum = diff + 1;
  if (dayNum < 1) return 1;
  return dayNum;
}

// ─── Redis helpers ────────────────────────────────────────────────────────────

function newKey(day: string, mode: string) {
  return `stats2:${mode}:${day}`;
}

function legacyKey(day: string, mode: string) {
  const dayNum = parseInt(day);
  return dayNum >= 17 || mode !== "rap"
    ? `stats:day:${day}:${mode}`
    : `stats:day:${day}`;
}

interface StatsData {
  attempts: Record<string, number>;
  total: number;
  wins: number;
}

// ─── Migracja danych historycznych ───────────────────────────────────────────
async function migrateIfNeeded(day: string, mode: string): Promise<StatsData> {
  const legacy = legacyKey(day, mode);

  const pipeline = redis.pipeline();
  pipeline.hgetall(`${legacy}:attempts`);
  pipeline.get(`${legacy}:total`);
  pipeline.get(`${legacy}:wins`);
  const [attempts, total, wins] = await pipeline.exec();

  const data: StatsData = {
    attempts: (attempts as Record<string, number>) ?? {},
    total: (total as number) ?? 0,
    wins: (wins as number) ?? 0,
  };

  if (data.total > 0) {
    await redis.set(newKey(day, mode), JSON.stringify(data));
  }

  return data;
}

// ─── GET ─────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const day = searchParams.get("day");
  const mode = searchParams.get("mode") || "rap";

  if (!day) {
    return NextResponse.json({ error: "Missing day param" }, { status: 400 });
  }

  const isToday = parseInt(day, 10) >= getTodayDayNumber();
  const cacheKey = `${day}:${mode}`;

  // Stare dni — użyj cache serwera (dane niezmienne)
  // Dzisiejszy dzień — zawsze idź do Redis po świeże dane
  if (!isToday) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_OLD) {
      return NextResponse.json(cached.data, {
        headers: {
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=172800",
        },
      });
    }
  }

  try {
    const raw = await redis.get<string>(newKey(day, mode));

    let data: StatsData;

    if (raw) {
      data = typeof raw === "string" ? JSON.parse(raw) : (raw as StatsData);
    } else {
      data = await migrateIfNeeded(day, mode);
    }

    // Cache tylko stare dni
    if (!isToday) {
      cache.set(cacheKey, { data, timestamp: Date.now() });
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": isToday
          ? "no-store"
          : "s-maxage=86400, stale-while-revalidate=172800",
      },
    });
  } catch (err) {
    console.error("Redis GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}

// ─── POST ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { day, attempt, won, mode = "rap" } = body;

    if (!day) {
      return NextResponse.json({ error: "Missing day" }, { status: 400 });
    }

    const key = newKey(String(day), mode);

    const raw = await redis.get<string>(key);

    let data: StatsData;

    if (raw) {
      data = typeof raw === "string" ? JSON.parse(raw) : (raw as StatsData);
    } else {
      data = await migrateIfNeeded(String(day), mode);
    }

    data.total += 1;
    if (won) data.wins += 1;
    const attemptKey = won && attempt !== null ? String(attempt) : "X";
    data.attempts[attemptKey] = (data.attempts[attemptKey] ?? 0) + 1;

    await redis.set(key, JSON.stringify(data));

    // Wyczyść cache serwera
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