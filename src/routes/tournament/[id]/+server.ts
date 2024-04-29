import { getAccountById } from "$lib/server/db";
import { getTournamentInfo } from "$lib/server/tournament";
import type { RequestEvent } from "./$types";

export async function GET(req: RequestEvent) {
    const info = await getTournamentInfo(req.params.id)

    if (!info) {
        return new Response(null, { status: 404 })
    }
    const account = await getAccountById(info.owner_id)

    info.owner = account

    return new Response(JSON.stringify(info), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}