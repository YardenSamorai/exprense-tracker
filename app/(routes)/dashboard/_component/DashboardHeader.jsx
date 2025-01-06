import { UserButton } from '@clerk/nextjs'
import React from 'react'
import {useUser} from '@clerk/nextjs'

const DashboardHeader = () => {

  const {user} = useUser();
  console.log({user});

  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
        <div>
        </div>
        <div className='flex items-center gap-2 text-slate-500' >
            <UserButton/>
            <h2 className='text-xs'>{user.fullName}</h2>
        </div>
    </div>
  )
}

export default DashboardHeader