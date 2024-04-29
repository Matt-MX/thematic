import { getAccountById, getTournamentsByAccount } from "$lib/server/db";
import type { RequestEvent } from "./$types";

export async function GET(req: RequestEvent) {
  const id = parseInt(req.params.id);

  if (!id) {
    return new Response(null, { status: 400 })
  }
  const account = id ? await getAccountById(id) : undefined;

  if (account) {
    account.token = undefined;
    account.password = undefined;
  } else {
    return new Response(null, { status: 404 })
  }

  const tournaments = await getTournamentsByAccount(id)

  account.tournaments = tournaments

  return new Response(JSON.stringify(account), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
