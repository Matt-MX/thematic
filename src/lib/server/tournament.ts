import type TournamentInformation from "$lib/schema/TournamentInformation"
import { db } from "./db"

export const getTournamentInfo = (id: string) =>
    new Promise<TournamentInformation>((resolve, reject) => {
        db.get(
            `
            SELECT * 
            FROM tournaments 
            WHERE id = ?
            `,
            [id],
            (err, result) => {
              resolve(result as TournamentInformation)
            }
        )
    })

export const createTournament = (accountId: number, body: any) => 
    new Promise<any>((resolve, reject) => {
        db.run(
            `
            INSERT INTO tournaments
            (owner_id, title, game, desc, type, date_start, date_end, currentStatus)
            VALUES(?, ?, ?, ?, ?, datetime(?), ${body.date_end ? "datetime(?)" : "?"}, NULL)
            `,
            [
              accountId,
              body.name,
              body.game,
              body.desc,
              body.type,
              body.date_start,
              body.date_end || "NULL"
            ],
            function (err) {
              console.log(err)
              if (err) {
                resolve({ error: err})
              } else {
                resolve({ id: this.lastID })
              }
            }
          )
    })

export const addTeam = (tournamentId: number, team: string) => 
  new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO teams
      VALUES(?, ?)
      `,
      [tournamentId, team],
      function (err) {
        if (err) {
          resolve({ error: err })
        } else {
          resolve({ id: this.lastID })
        }
      }
    )
  })

export const removeTeam = (tournamentId: number, team: string) =>
  new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM teams
      WHERE tournament_id = ? AND team = ?
      `,
      [tournamentId, team],
      function (err) {
        if (err) {
          resolve({ error: err })
        } else {
          resolve({})
        }
      }
    )
  })

export const getTeams = (tournamentId: number) =>
  new Promise((resolve, reject) => {
    db.all(
      `
      SELECT team
      FROM teams
      WHERE tournament_id = ?
      `,
      [tournamentId],
      function (err, rows) {
        if (err) {
          resolve({ error: err })
        } else {
          resolve(rows.map((row: any) => row.team))
        }
      }
    )
  })
