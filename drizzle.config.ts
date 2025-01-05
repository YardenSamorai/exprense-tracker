import {defineConfig} from "drizzle-kit";

export default defineConfig({
    schema:"./utils/db/schema.ts",
    out: "./utils/db/migrations",
    dialect: "postgresql",
    dbCredentials:{
        url: "postgresql://neondb_owner:nNvDIRXH1P6J@ep-morning-art-a5r49r96.us-east-2.aws.neon.tech/expense-tracker?sslmode=require",
    }
});