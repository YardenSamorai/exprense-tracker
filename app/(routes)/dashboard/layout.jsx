import React from 'react'
import SideNav from './_component/Sidenav';
import DashBoardHeader from'./_component/DashboardHeader';


const DashBoardLayout = ({children}) => {
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