'use client'
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import { db } from '@/utils/db';
import { getTableColumns, sql } from 'drizzle-orm';
import { Expenses, Budget } from '@/utils/db/schema';
import { useUser } from '@clerk/nextjs';

const BudgetList = () => {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState();

  useEffect(() => {
    getBudgetList();
    console.log(budgetList);
  }, [user])

  const getBudgetList = async () => {
    const result = db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budget).leftJoin(Expenses,eq(Budget.id,Expenses.budgetId)).where(eq(Budget.createdBy,user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id);
    setBudgetList(result)
    console.log(result);
  }

  return (


    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CreateBudget />
        {budgetList?.map((budget, index) => {
          // <BudgetItem budget={budget}/>
          console.log(budgetList);
        })}
        </div>
    </div>
  )
}

export default BudgetList
