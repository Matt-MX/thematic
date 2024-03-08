import { getAccountById } from "$lib/server/db";
import type { RequestEvent } from "./$types";

export async function GET(req: RequestEvent) {
  const id = parseInt(req.params.id);

  const account = id ? await getAccountById(id) : undefined;

  if (account) {
    account.token = undefined;
    account.password = undefined;
  }

  const res = account ? account : { error: "Account not found" }

  return new Response(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
