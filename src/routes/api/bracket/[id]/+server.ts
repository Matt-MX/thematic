import { manager, testBracket } from "$lib/server/test";
import type { RequestEvent } from "./$types";


export async function GET(req: RequestEvent) {
    const id = parseInt(req.params.id)

    if (id == undefined || id == null) {
        return new Response(null, { status: 404 })
    }

    const data = await manager.get.stageData(id)

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}