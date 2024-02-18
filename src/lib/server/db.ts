import Database from "better-sqlite3";
import { pbkdf2Sync } from "node:crypto";
export const db = Database("./data.db");

export function createTables() {
  db.exec(
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
      date_start DATE,
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
    `
  );
}

export const getAccountIDFromToken = (token: number) =>
  new Promise<string | undefined>((resolve, reject) => {
    if (!token) resolve(undefined);

    const statement = db.prepare(
      `
      SELECT id
      FROM accounts
      WHERE token = ?
      `
    ).bind(token);

    const result = statement.get();

    if (result) {
      resolve(result.id);
    } else resolve(undefined);
  });

export const getTokenFromAccountID = (id: number) =>
  new Promise<string | undefined>((resolve, reject) => {
    const statement = db.prepare(
      `
      SELECT token
      FROM accounts
      WHERE id = ?
      `
    ).bind(id);

    const result = statement.get();

    if (!result.token) {
      setToken(id).then(resolve).catch(reject);
    } else resolve(result.token);
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
    const statement = db.prepare(
      `
      UPDATE accounts
      SET token = $token
      WHERE id = $id
      `
    );

    const result = statement.run({
      token, id
    });

    if (result) {
      resolve(token)
    } else reject(result)
  });
}

export const resetToken = (id: number) => setTokenProvided(id, undefined);

export interface AccountCreation {
  username: string;
  password: string;
}

export const createNewAccount = (creation: AccountCreation) =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(creation.password, salt);
  });

const getHash = (password: string, salt: string) =>
  pbkdf2Sync(password, salt, 100000, 256, "sha256").toString("hex");
