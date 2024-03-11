import { db, getAccountIDFromToken } from "$lib/server/db";
import Joi from "joi";
import type { RequestEvent } from "./$types";
import type Account from "$lib/schema/Account";

const tournamentCreationSchema = Joi.object({
  t_name: Joi.string()
    .min(3)
    .max(32)
    .required(),
  t_game: Joi.string()
    .optional()  
    .max(32),
  t_desc: Joi.string()
    .optional()
    .max(512),
  t_date: Joi.date()
    .required(),
  t_time: Joi.string()
    .optional(),
  t_type: Joi.string()
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

  // todo need to use a promise callback here
  db.run(
    `
    INSERT INTO tournaments
    (owner_id, title, game, description, type, date_start)
    VALUES(?, ?, ?, ?, ?, datetime(?))
    `,
    [
      accountId,
      body.t_name,
      body.t_game,
      body.t_desc,
      body.t_type,
      body.t_date + " " + body.t_time
    ],
    function(err) {
      if (err) {
        return new Response(JSON.stringify(err), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        return new Response(JSON.stringify(this.lastID), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    }
  )
}