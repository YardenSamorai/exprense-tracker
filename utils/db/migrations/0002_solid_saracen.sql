-- Change column type with a USING clause
ALTER TABLE "expenses" 
ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2) 
USING "amount"::numeric(10, 2);

-- Set the default value for the column
ALTER TABLE "expenses" 
ALTER COLUMN "amount" SET DEFAULT 0;