import { UserButton } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/Input'
import {Button} from '../../../../components/ui/Button';

const DashboardHeader = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user } = useUser();
  const nameByEmail = user?.primaryEmailAddress?.emailAddress;


  return (
    <div className='p-5 shadow-sm border-b flex justify-end'>
      <div>
      </div>
      <div className='flex items-center gap-2 text-slate-500' >
        <UserButton />
        <h2 className='text-xs'>{user?.fullName}</h2>
      {user?.fullName ? "" :nameByEmail}
      </div>
      <div>
      </div>
    </div>
  )
}

export default DashboardHeader