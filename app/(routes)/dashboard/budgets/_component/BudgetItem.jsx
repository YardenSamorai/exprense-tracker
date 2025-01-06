import React from 'react'

const BudgetItem = ({budget}) => {
  return (
    <div className='p-5 border rounded-lg hover:shadow-lg transition duration-300 ease-in-out'>
      <div className='flex gap-2 items-center justify-between mt-5'>
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 bg-slate-100 rounded-full px-4'>{budget?.icon}</h2>
            <div>
              <h2 className='font-bold'>{budget.name}</h2>
              <h2 className='text-sm text-gray-500'>{budget.totalItem} item</h2>
            </div>
        </div>
        <h2 className='font-bold text-blue-500 text-lg'>₪{budget.amount}</h2>
        </div>

        <div className='mt-5 rounded-full'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xs text-slate-400'>₪{budget.totalSpend?budget.totalSpend:0} Spend</h2>
            <h2 className='text-xs text-slate-400'>₪{(budget.amount)-(budget?.totalSpend || 0)} Remaining</h2>
          </div>
          <div className='w-full bg-slate-300 h-2 '>
            <div className='bg-blue-500 h-2' style={{width: `${(budget.totalSpend / budget.amount) * 100}%`}}></div>
          </div>
        </div>
    </div>
  )
}

export default BudgetItem