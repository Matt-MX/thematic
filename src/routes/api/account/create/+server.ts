import { createNewAccount } from "$lib/server/db";
import type { RequestEvent } from "./$types";

export async function POST(req: RequestEvent) {
  const body = await req.request.json();

  const result = await createNewAccount({
    username: body.username,
    password: body.password,
  })
    .catch(
      (error) =>
        new Response(JSON.stringify(error), {
          headers: {
            "Content-Type": "application/json",
          },
        })
    )
    .then(
      (id) =>
        new Response(JSON.stringify(id), {
          headers: {
            "Content-Type": "application/json",
          },
        })
    );
  return result
}
