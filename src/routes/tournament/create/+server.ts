import { db, getAccountIDFromToken } from "$lib/server/db";
import Joi from "joi";
import type { RequestEvent } from "./$types";
import { createTournament } from "$lib/server/tournament";

const tournamentCreationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(32)
    .required(),
  game: Joi.string()
    .optional()
    .max(32),
  desc: Joi.string()
    .optional()
    .allow(null, "")
    .max(512),
  date_start: Joi.date()
    .required(),
  date_end: Joi.date()
    .allow(null, "")
    .optional(),
  type: Joi.string()
    .valid("single_elim", "double_elim")
    .required()
})

export async function POST(req: RequestEvent) {
  const accountId = await getAccountIDFromToken(req.request.headers.get('X-Authorization'))

  if (!accountId) {
    return new Response(null, {
      status: 400
    });
  }

  // todo Create tournament
  const body = await req.request.json();

  const validation = tournamentCreationSchema.validate(body)
  if (validation.error) {
    return new Response(JSON.stringify(validation.error), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const tournamentId = await createTournament(accountId, body)

  if (tournamentId.error) {
    return new Response(JSON.stringify(tournamentId.error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response(JSON.stringify(tournamentId.id), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}