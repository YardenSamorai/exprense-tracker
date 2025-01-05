import {drizzle} from "drizzle-orm/neon-http";
import {neon} from '@neondatabase/serverless';
import {config} from "dotenv";

config({path:".env.local:"});

const sql = neon("postgresql://neondb_owner:nNvDIRXH1P6J@ep-morning-art-a5r49r96.us-east-2.aws.neon.tech/expense-tracker?sslmode=require");

// logger
//const db = drizzle(sql, {logger: true});
const db = drizzle(sql);

export {db};