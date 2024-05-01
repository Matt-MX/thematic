import { manager, testBracket } from "$lib/server/test";
import type { RequestEvent } from "./$types";


export async function GET(req: RequestEvent) {
    const data = await manager.get.tournamentData(0)

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}