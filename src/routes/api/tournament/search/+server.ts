import type { RequestEvent } from "./$types";
import { db } from "$lib/server/db";

export async function GET(req: RequestEvent) {
  const q = req.url.searchParams.get("q") || "";
  const p = parseInt(req.url.searchParams.get("p") || "0") || 0;

  const response = await new Promise<Response>((resolve, reject) => {
    db.all(
      `
      SELECT * FROM tournaments
      WHERE title LIKE ?
      ORDER BY date_start ASC
      LIMIT(10)
      OFFSET(?)
      `,
      [q + "%", p],
      (err, results) => {
        resolve(
          new Response(JSON.stringify(err ? err : results), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        );
      }
    );
  });

  return response;
}
