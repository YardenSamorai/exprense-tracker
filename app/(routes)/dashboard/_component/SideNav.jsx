import React from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

const Sidenav = () => {

    const menuList = [{
        id:1,
        name:"Dashboard",
        icon:LayoutGrid,
        path:'/dashboard'
    },{
        id:2,
        name:"Budgets",
        icon:PiggyBank,
        path:'/dashboard/budgets'
    },{
        id:3,
        name:"Expenses",
        icon:ReceiptText,
        path:'/dashboard/expenses'
    },{
        id:4,
        name:"Upgrade",
        icon:ShieldCheck,
        path:'/dashboard/upgrade'
        
    },]

  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Image src={'/YardenLOGO.png'} alt='logo' width={200} height={100}/>
        <div>
            {menuList.map((menu,key)=> {
                return(
                    
                    <h2 index={key} className='flex gap-1 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100'>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                )
            })}
        </div>
        <div className='fixed bottom-10 p-5 gap-2 flex items-center'>
            <UserButton />
            Profile
        </div>
    </div>
    
  )
}

export default Sidenav