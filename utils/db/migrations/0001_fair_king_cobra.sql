CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" varchar NOT NULL,
	"budgetId" integer,
	"createdBy" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budgetId_budget_id_fk" FOREIGN KEY ("budgetId") REFERENCES "public"."budget"("id") ON DELETE no action ON UPDATE no action;