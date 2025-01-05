"use client";
import React, {useEffect} from 'react'
import SideNav from './_component/Sidenav';
import DashBoardHeader from'./_component/DashboardHeader';
import {useUser} from '@clerk/nextjs';
import { Budget } from '../../../utils/db/schema';
import {eq} from 'drizzle-orm';
import { db } from '../../../utils/db';
import { useRouter } from 'next/navigation';


const DashBoardLayout = ({children}) => {

  const {user} = useUser();
  const router = useRouter();
  const checkUserBudget = async () => {
    const result = await db
  .select()
  .from(Budget) // Corrected to use the `budget` table object
  .where(eq(Budget.createdBy, user?.primaryEmailAddress?.emailAddress));
    if(result.length === 0){
      router.replace('/dashboard/budgets');
    }
  }


  useEffect(() => {
    if(user){
      checkUserBudget();
    }
  }, [user])

  return (
    <div>
        
        <div className='fixed md:w-64 hidden md:block '>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            <DashBoardHeader />
        {children}
        </div>
    </div>
  )
}

export default DashBoardLayout