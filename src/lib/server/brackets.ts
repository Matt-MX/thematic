import type TournamentInformation from "$lib/schema/TournamentInformation";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";
import { getNearestPowerOfTwo } from "brackets-manager/dist/helpers";
import type { StageType } from "brackets-model/dist/unions"

const storage = new InMemoryDatabase();
export const manager = new BracketsManager(storage);

export const createBracket = (tournament: TournamentInformation, teams: string[]) =>
    new Promise(async (resolve, reject) => {
        const stage = await manager.create.stage({
            name: "*",
            tournamentId: tournament.id,
            type: tournament.type as StageType,
            seeding: teams,
            settings: {
                seedOrdering: ["inner_outer"],
                size: getNearestPowerOfTwo(teams.length)
            }
        })

        resolve(stage)
    })