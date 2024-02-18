import type { RequestEvent } from "./$types";
import { db } from "$lib/server/db";

export async function GET(req: RequestEvent) {
  const q = req.url.searchParams.get("q") || "";
  const p = parseInt(req.url.searchParams.get("p") || "0") || 0;

  const statement = db.prepare(
    `
    SELECT * FROM tournaments
    WHERE title LIKE ?
    ORDER BY date_start ASC
    LIMIT(10)
    OFFSET(?)
    `
  );
  
  const results = statement.all([q + "%", p]);

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}