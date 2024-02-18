import { Database } from "sqlite3";
import { pbkdf2Sync } from "node:crypto";
export const db = new Database("./data.db");

export function createTables() {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS accounts
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      salt TEXT,
      token TEXT,
      CONSTRAINT username_unique UNIQUE(username)
    );
    
    CREATE TABLE IF NOT EXISTS tournaments
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER,
      title TEXT,
      type TEXT,
      FOREIGN KEY(owner_id) REFERENCES accounts(owner_id)
    );

    CREATE TABLE IF NOT EXISTS teams
    (
      name TEXT,
      tournament_id INTEGER,
      FOREIGN KEY(tournament_id) REFERENCES tournaments(id)
    );

    CREATE TABLE IF NOT EXISTS helpers
    (
      tournament_id INTEGER,
      account_id INTEGER,
      date DATE,
      PRIMARY KEY(tournament_id, account_id),
      FOREIGN KEY(tournament_id) REFERENCES tournaments(id),
      FOREIGN KEY(account_id) REFERENCES accounts(id)
    );
    `,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Database initialized");
      }
    }
  );
}

export const getAccountIDFromToken = (token: number) =>
  new Promise<string | undefined>((resolve, reject) => {
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
          resolve(result.id);
        } else resolve(undefined);
      }
    );
  });

export const getTokenFromAccountID = (id: number) =>
  new Promise<string | undefined>((resolve, reject) => {
    db.get(
      `
    SELECT token
    FROM accounts
    WHERE id = ?
    `,
      [id],
      (err, result) => {
        if (err) reject(err);
        else if (!result.token) {
          setToken(id).then(resolve).catch(reject);
        } else resolve(result.token);
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
      SET token = $token
      WHERE id = $id
      `,
      { $token: token, $id: id },
      (err) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
}

export const resetToken = (id: number) => setTokenProvided(id, undefined);

export interface AccountCreation {
  username: string,
  password: string,
}

export const createNewAccount = (creation: AccountCreation) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(64);
  const hash = getHash(creation.password, salt)
})

const getHash = (password: string, salt: string) => pbkdf2Sync(password, salt, 100000, 256, "sha256").toString("hex");