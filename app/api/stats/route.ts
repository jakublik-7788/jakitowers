// app/api/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Cache w pamięci serwera — działa dla wszystkich graczy na tej samej instancji
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minut (było 5)

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Nowy klucz (1 JSON = 1 komenda). Stary format: hgetall + get + get = 3 komendy
function newKey(day: string, mode: string) {
  return `stats2:${mode}:${day}`;
}

// Stary klucz — tylko do odczytu danych historycznych
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

const emptyStats = (): StatsData => ({ attempts: {}, total: 0, wins: 0 });

// ─── Migracja danych historycznych ───────────────────────────────────────────
// Jeśli nowy klucz nie istnieje, próbuje wczytać ze starego formatu (hgetall + get + get)
// i od razu zapisuje do nowego formatu — żeby następnym razem już była 1 komenda.
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

  // Jeśli są jakiekolwiek dane historyczne, zapisz do nowego formatu
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

  const cacheKey = `${day}:${mode}`;

  // 1. Sprawdź cache serwerowy
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" },
    });
  }

  try {
    // 2. Nowy format — 1 komenda Redis
    const raw = await redis.get<string>(newKey(day, mode));

    let data: StatsData;

    if (raw) {
      // Nowy format istnieje
      data = typeof raw === "string" ? JSON.parse(raw) : (raw as StatsData);
    } else {
      // Nowy format nie istnieje — sprawdź stary (migracja)
      data = await migrateIfNeeded(day, mode);
    }

    cache.set(cacheKey, { data, timestamp: Date.now() });

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" },
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

    // 1 komenda odczytu
    const raw = await redis.get<string>(key);

    let data: StatsData;

    if (raw) {
      data = typeof raw === "string" ? JSON.parse(raw) : (raw as StatsData);
    } else {
      // Brak nowego klucza — sprawdź czy są dane historyczne do migracji
      data = await migrateIfNeeded(String(day), mode);
    }

    // Aktualizuj dane
    data.total += 1;
    if (won) data.wins += 1;
    const attemptKey = won && attempt !== null ? String(attempt) : "X";
    data.attempts[attemptKey] = (data.attempts[attemptKey] ?? 0) + 1;

    // 1 komenda zapisu
    await redis.set(key, JSON.stringify(data));

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