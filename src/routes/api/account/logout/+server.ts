import { getAccountIDFromToken, setToken, setTokenProvided } from "$lib/server/db";
import type { RequestEvent } from "./$types";

export async function GET(req: RequestEvent) {
    const token = req.request.headers.get("X-Authorization")

    if (!token) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 400 })
    }

    const accountId = await getAccountIDFromToken(token)

    if (accountId == undefined) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 400 })
    }

    await setTokenProvided(accountId, undefined)
    
    return new Response(JSON.stringify({}), { status: 200 })
}