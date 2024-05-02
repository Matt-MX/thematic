import { getAccountIDFromToken } from "$lib/server/db";
import { manager, testBracket } from "$lib/server/test";
import { addTeam, getTournamentInfo, removeTeam } from "$lib/server/tournament";
import type { RequestEvent } from "./$types";


export async function POST(req: RequestEvent) {
    const accountId = await getAccountIDFromToken(req.request.headers.get("X-Authorization"))
    const id = req.params.id
    const team = req.request.headers.get("team")

    if (id == undefined || id == null) {
        return new Response(null, { status: 404 })
    }

    const info = await getTournamentInfo(id)
    if (!info) return new Response(null, { status: 404 })

    if (info.owner_id != accountId) {
        return new Response(null, { status: 400 })
    }

    if (!team) {
        return new Response(null, { status: 400 })
    }

    // add team member
    try {
        await addTeam(info.id, team)
    } catch (e) {
        return new Response(JSON.stringify(e), { status: 400 })
    }

    return new Response(null, { status: 200 })
}

export async function DELETE(req: RequestEvent) {
    const accountId = await getAccountIDFromToken(req.request.headers.get("X-Authorization"))
    const id = req.params.id
    const team = req.request.headers.get("team")

    if (id == undefined || id == null) {
        return new Response(null, { status: 404 })
    }

    const info = await getTournamentInfo(id)
    if (!info) return new Response(null, { status: 404 })

    if (!team) {
        return new Response(null, { status: 400 })
    }

    if (!team) {
        return new Response(null, { status: 400 })
    }

    // remove team member
    console.log(info.id, team)
    await removeTeam(info.id, team)

    return new Response(null, { status: 200 })
}