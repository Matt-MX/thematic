import sqlite from "sqlite3";
import argon2 from "argon2";
import Joi from "joi";
import type Account from "$lib/schema/Account";
import type TournamentInformation from "$lib/schema/TournamentInformation";
export const db = new sqlite.Database("./data.db");

export function createTables() {

  const tables = [`
    CREATE TABLE IF NOT EXISTS accounts
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      token TEXT,
      CONSTRAINT username_unique UNIQUE(username)
    );`,

    `CREATE TABLE IF NOT EXISTS tournaments
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER,
      title TEXT,
      game TEXT,
      desc TEXT,
      type TEXT,
      date_start DATE,
      date_end DATE DEFAULT NULL,
      currentStatus TEXT DEFAULT NULL,
      FOREIGN KEY(owner_id) REFERENCES accounts(owner_id)
    );`,

    `CREATE TABLE IF NOT EXISTS helpers
    (
      tournament_id INTEGER,
      account_id INTEGER,
      PRIMARY KEY(tournament_id, account_id),
      FOREIGN KEY(tournament_id) REFERENCES tournaments(id),
      FOREIGN KEY(account_id) REFERENCES accounts(id),
      CONSTRAINT unique_helper UNIQUE(tournament_id, team)
    );`,
    
    `
    CREATE TABLE IF NOT EXISTS teams
    (
      tournament_id INTEGER,
      team TEXT,
      PRIMARY KEY(tournament_id, team),
      FOREIGN KEY(tournament_id) REFERENCES tournaments(id),
      CONSTRAINT unique_team UNIQUE(tournament_id, team)
    )
    `,

    `
    CREATE TABLE IF NOT EXISTS brackets
    (
      tournament_id INTEGER,
      json TEXT,
      PRIMARY KEY(tournament_id),
      FOREIGN KEY(tournament_id) REFERENCES tournaments(id)
    )`
  ]

  for (const statement of tables) {
    db.run(
      statement,
      (err) => {
        if (err) {
          console.error(err)
        }
      }
    );
  }
}

export const getAccountIDFromToken = (token: string | null) =>
  new Promise<number | undefined>((resolve, reject) => {
    if (!token) resolve(undefined);

    db.get(
      `
      SELECT id
      FROM accounts
      WHERE token = ?
      `,
      [token],
      (err, result) => {
        if (!err && result) {
          resolve((result as Account).id);
        } else resolve(undefined);
      }
    );
  });

export const getAccountByUsername = (username: string) =>
  new Promise<Account | undefined>((resolve, reject) => {
    db.get(
      `
      SELECT * 
      FROM accounts
      WHERE username = ?
      `,
      [username],
      (err, result) => {
        if (result) {
          resolve(result as Account)
        } else {
          resolve(undefined)
        }
      }
    )
  })

export const getAccountById = (id: number) =>
  new Promise<Account | undefined>((resolve, reject) => {
    db.get(
      `
      SELECT * 
      FROM accounts
      WHERE id = ?
      `,
      [id],
      (err, result) => {
        if (result) {
          resolve(result as Account)
        } else {
          resolve(undefined)
        }
      }
    )
  })

export const getTournamentsByAccount = (id: number) =>
  new Promise<TournamentInformation[]>((resolve, reject) => {
    // todo include "helpers"
    db.all(
      `
      SELECT *
      FROM tournaments
      WHERE owner_id = ?
      ORDER BY date_start ASC
      `,
      [id],
      (err, results) => {
        if (results) {
          resolve(results.map((result) => result as TournamentInformation))
        } else resolve(results)
      }
    )
  })

export const accountExists = (id: number) =>
  new Promise<boolean>((resolve, reject) => {
    db.get(
      `
      SELECT id
      FROM accounts
      WHERE id = ?
      `,
      [id],
      (err, result) => {
        if (err || !result) resolve(false)
        else if (result) resolve(true)
      }
    )
  });

export const getTokenFromAccountID = (id: number) =>
  new Promise<string | undefined>(async (resolve, reject) => {
    if (!await accountExists(id)) {
      return resolve(undefined)
    }

    db.get(
      `
      SELECT token
      FROM accounts
      WHERE id = ?
      `,
      [id],
      (err, result) => {
        if (err || !result) return reject(err)

        const account = result as Account
        console.log(result)
        if (!account.token) {
          setToken(id).then(resolve).catch(reject);
        } else resolve(account.token);
      }
    );
  });

export function setToken(id: number): Promise<string | undefined> {
  const token = crypto.getRandomValues(new Uint16Array(16)).toString();
  return setTokenProvided(id, token);
}

export function setTokenProvided(
  id: number,
  token: string | undefined
): Promise<string | undefined> {
  return new Promise<string | undefined>((resolve, reject) => {
    db.run(
      `
      UPDATE accounts
      SET token = ?
      WHERE id = ?
      `,
      [token, id],
      (err) => {
        if (err) {
          reject(err)
        } else resolve(token)
      }
    );
  });
}

export const resetToken = (id: number) => setTokenProvided(id, undefined);

export interface AccountCreation {
  username: string;
  password: string;
}

const accountCreationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(16)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

export const createNewAccount = (creation: AccountCreation) =>
  new Promise<number>(async (resolve, reject) => {

    const validation = accountCreationSchema.validate(creation)
    if (validation.error) {
      return reject(validation.error)
    }

    const hash = await getHash(creation.password);

    db.run(
      `
      INSERT INTO accounts
      (username, password)
      VALUES(
        ?, ?
      )
      `,
      [creation.username, hash],
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.lastID)
        }
      }
    )
  });

export const getHash = async (password: string) => await argon2.hash(password)
