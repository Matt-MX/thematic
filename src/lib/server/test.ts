import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";
import { getNearestPowerOfTwo } from "brackets-manager/dist/helpers";
import type { StageType } from "brackets-model/dist/unions"

const storage = new InMemoryDatabase();
export const manager = new BracketsManager(storage);

export const createBracket = (tournamentId: number, type: StageType, seeding: string[]) => 
    new Promise(async (resolve, reject) => {
        const stage = await manager.create.stage({
            name: "*",
            tournamentId: tournamentId,
            type: type,
            seeding: seeding,
            settings: {
                seedOrdering: ["inner_outer"],
                size: getNearestPowerOfTwo(seeding.length)
            }
        })

        resolve(stage)
    })

export let testBracket: any

(async function() {
    const players = ["MattMX", "Gabby", "John", "Chris", "Mohammed"]

    testBracket = await createBracket(0, "double_elimination", players)
}());

function powerOfTwo(x: number) {
    return Math.log2(x) % 1 === 0;
}