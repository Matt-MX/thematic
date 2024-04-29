import { db } from "./db"

export const getTournamentInfo = (id: string) =>
    new Promise<any>((resolve, reject) => {
        db.get(
            `SELECT * FROM tournaments WHERE id = ?`,
            [id],
            (err, result) => {
                resolve(result)
            }
        )
    })

export const createTournament = (accountId: number, body: any) => 
    new Promise<any>((resolve, reject) => {
        db.run(
            `
            INSERT INTO tournaments
            (owner_id, title, game, desc, type, date_start)
            VALUES(?, ?, ?, ?, ?, datetime(?))
            `,
            [
              accountId,
              body.name,
              body.game,
              body.desc,
              body.type,
              body.date_start
            ],
            function (err) {
              if (err) {
                resolve({ error: err})
              } else {
                resolve({ id: this.lastID})
              }
            }
          )
    })