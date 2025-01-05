import React from 'react'

const BudgetItem = ({budget}) => {

    console.log(budget);

  return (
    <div>
        <div>
            <h2>{budget?.icon}</h2>
        </div>
    </div>
  )
}

export default BudgetItem