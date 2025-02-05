import React, { useEffect } from 'react'
import {Trash} from "lucide-react"
import { db } from '@/utils/db'; // Your database instance
import { Expenses } from '@/utils/db/schema'; // Your table schema
import { eq } from 'drizzle-orm'; // Comparison helper from Drizzle
import { toast } from 'sonner'; // Toast notifications (optional)
  

const ExpenseListTable = ({expenseList, refrashData}) => {

    const deleteExpense = async (expenses) => {
        const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expenses.id))
        .returning();

        if(result){
            toast('Expense Deleted !');
            refrashData();
        }
    }
  return (
    <div className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
        </div>
        
        {expenseList.map((expenses, index)=> { return (
                    <div className='grid grid-cols-4 border-b p-2'>
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdBy}</h2>
                    <h2 className='flex flex-row w-20 gap-2'> <Trash className='text-red-600 cursor-pointer ' onClick={() => deleteExpense(expenses)}/></h2>
                    </div>
        )})}
    </div>
  )
}

export default ExpenseListTable