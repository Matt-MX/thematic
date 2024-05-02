import type { RequestEvent } from "./$types";
import { getAccountById, getAccountByUsername, getAccountIDFromToken } from "$lib/server/db";
import { getTournamentInfo, addHelper, removeHelper } from "$lib/server/tournament";

export async function POST(req: RequestEvent) {
    const accountId = await getAccountIDFromToken(req.request.headers.get("X-Authorization"))
    const id = req.params.id
    const username = req.request.headers.get("username")
    if (!username) {
        return new Response(null, { status: 400 })
    }
    
    const account = await getAccountByUsername(username)
    if (!account) {
        return new Response(null, { status: 404 })
    }

    const info = await getTournamentInfo(id)
    if (!info) {
        return new Response(null, { status: 404 })
    }

    if (info.owner_id !== accountId) {
        return new Response(null, { status: 401 })
    }

    try {
        await addHelper(info.id, account.id)
    } catch(e) {
        return new Response(null, { status: 400 })
    }
    
    return new Response(null, { status: 200 })
}

export async function DELETE(req: RequestEvent) {
    const accountId = await getAccountIDFromToken(req.request.headers.get("X-Authorization"))
    const id = req.params.id
    const account_id = req.request.headers.get("account_id")
    if (!account_id) {
        return new Response(null, { status: 400 })
    }
    
    const account = await getAccountById(parseInt(account_id))
    if (!account) {
        return new Response(null, { status: 404 })
    }

    const info = await getTournamentInfo(id)
    if (!info) {
        return new Response(null, { status: 404 })
    }

    if (info.owner_id !== accountId) {
        return new Response(null, { status: 401 })
    }

    try {
        await removeHelper(info.id, account.id)
    } catch(e) {
        return new Response(null, { status: 400 })
    }
    
    return new Response(null, { status: 200 })
}