import {
  db,
  getTokenFromAccountID,
  getHash,
  getAccountByUsername,
} from "$lib/server/db";
import argon2 from "argon2";
import type { RequestEvent } from "./$types";

export async function POST(req: RequestEvent) {
  const body = await req.request.json();
  // todo joi validation

  const account = await getAccountByUsername(body.username);
  if (!account) {
    // not exists
    return new Response(
      JSON.stringify({
        error: "That account does not exist",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (!(await argon2.verify(account.password, body.password))) {
    // not valid
    return new Response(
      JSON.stringify({
        error: "Invalid password",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const accountId = account.id;
  const token = await getTokenFromAccountID(accountId);

  let res = {};

  if (!token) {
    res = { error: "Account not found" };
  } else {
    res = {
      account_id: accountId,
      token: token,
    };
  }

  const response = new Response(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
