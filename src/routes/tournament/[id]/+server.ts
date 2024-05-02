import { getAccountById } from "$lib/server/db";
import { getHelpers, getTeams, getTournamentInfo } from "$lib/server/tournament";
import type { RequestEvent } from "./$types";

export async function GET(req: RequestEvent) {
    const info = await getTournamentInfo(req.params.id) as any

    if (!info) {
        return new Response(null, { status: 404 })
    }
    const account = await getAccountById(info.owner_id)
    const teams = await getTeams(info.id)
    const helpers = await getHelpers(info.id)

    info.owner = account
    info.teams = teams
    info.helpers = helpers

    return new Response(JSON.stringify(info), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}