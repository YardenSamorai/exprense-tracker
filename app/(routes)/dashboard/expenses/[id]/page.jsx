'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { db } from '@/utils/db';
import { Budget, Expenses } from '@/utils/db/schema';
import { eq, sql, desc, getTableColumns } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_component/BudgetItem';
import AddExpense from '../_comonent/AddExpense';
import ExpenseListTable from '../_comonent/ExpenseListTable';
import { Button } from "../../../../../components/ui/Button";
import { PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import EditBudget from "../_comonent/EditBudget"

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const { id: budgetId } = React.use(params); // Unwrapping params with React.use()
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expenseList, setExpenseList] = useState([]);

  // Fetch budget information
  const getBudgetInfo = useCallback(async () => {
    if (!user || !budgetId) return;

    try {
      const result = await db
        .select({
          ...getTableColumns(Budget),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budget)
        .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
        .where(eq(Budget.createdBy, user.primaryEmailAddress?.emailAddress))
        .where(eq(Budget.id, budgetId))
        .groupBy(Budget.id);

      setBudgetInfo(result[0] || null);
      getExpensesList();
    } catch (error) {
      console.error('Error fetching budget info:', error);
    }
  }, [budgetId, user]);

  // Fetch budget info on component mount and when dependencies change
  useEffect(() => {
    getBudgetInfo();
  }, [getBudgetInfo]);

  // Callback for refreshing the budget info after adding an expense
  const handleRefresh = () => {
    getBudgetInfo();
  };

  const getExpensesList = async () => {
    const result = await db.select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, budgetId))
      .orderBy(desc(Expenses.id));

    setExpenseList(result);
  }

  const deleteBudget = async() => {
    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, budgetId))
    .returning();
    if(deleteExpenseResult){
      try { 
        console.log("here 1")
        const result = await db.delete(Budget)
        .where(eq(Budget.id, budgetId))
        .returning();
        console.log("here after returning result:", result);
        if(result){
          toast("Budget Deleted ! ");
        }

      } catch(e){
        console.log(e)
      }
    } else{
      toast("Failed to delete Budget");
    }
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">My Expenses
      <div className='flex gap-2 items-center'>

        <EditBudget budgetInfo={budgetInfo}/>

        <AlertDialog>
          <AlertDialogTrigger>
          <Button className="bg-red-500 h-8 text-white hover:bg-red-400 "> <Trash /> Delete</Button>
            
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your current budget along with all expenses
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-300 hover:bg-black text-white">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> deleteBudget()} className="bg-red-500 text-white hover:bg-red-400">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense budgetId={budgetId} onRefresh={handleRefresh} />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expenseList={expenseList}
          refrashData={() => {
            handleRefresh();
          }} />
      </div>
    </div>
  );
};

export default ExpensesScreen;
