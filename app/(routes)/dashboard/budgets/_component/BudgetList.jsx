'use client'
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import { db } from '@/utils/db';
import { getTableColumns } from 'drizzle-orm';
import { Expenses } from '@/utils/db/schema';
import { useUser } from '@clerk/nextjs';
import {Budget} from '@/utils/db/schema';
import { sql, eq } from 'drizzle-orm';
import { Skeleton } from "../../../../../components/ui/skeleton";


const BudgetList = () => {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBudgetList();
  }, [user])

  const getBudgetList = async () => {
    setIsLoading(true);
    const result = await db
      .select({
        ...getTableColumns(Budget),
        totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budget)
      .leftJoin(Expenses, eq(Budget.id, Expenses.budgetId))
      .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budget.id);

    setBudgetList(result);
    setIsLoading(false);
  };
  const refrashData= () => {
    getBudgetList();
  }
  

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refrashData={refrashData}/>
          {isLoading? (
            <div>
              <div className="space-y-2">
      </div>
            </div>
          ):
          (<>
        {budgetList?.map((budget, index) => 
            <BudgetItem key={index} budget={budget} linkPath={"expenses/"+budget.id}/>
        )}
          </>)}
        </div>
    </div>
  )
}

export default BudgetList
