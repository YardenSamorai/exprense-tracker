import { pgTable, serial, varchar, boolean, timestamp, integer, text, numeric } from "drizzle-orm/pg-core";  
import { Relation } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";

export const Budget=pgTable('budget',{
    id:serial().primaryKey(),
    name:varchar("name").notNull(),
    amount:varchar("amount").notNull(),
    icon:varchar("icon"),
    createdBy: varchar("createdBy").notNull(),
})


export const Expenses = pgTable('expenses', {
    id:serial().primaryKey(),
    name:varchar("name").notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull().default('0'),
    budgetId:integer("budgetId").references(() => Budget.id),
    createdBy: varchar("createdBy").notNull()
})