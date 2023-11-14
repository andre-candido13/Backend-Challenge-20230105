import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg;

type configDatabaseType = {
    connectionString: string,
    ssl: boolean
};

const configDatabase: configDatabaseType = {
    connectionString: process.env.DATABASE_URL,
    ssl: false
}

if (process.env.mode === "prod") configDatabase.ssl = true

export const db = new Pool(configDatabase)