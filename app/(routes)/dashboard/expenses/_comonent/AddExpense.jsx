import React, { useState, useEffect } from 'react';
import { Input } from "../../../../../components/ui/Input.jsx";
import { Button } from '../../../../../components/ui/Button.jsx';
import { Expenses } from '../../../../../utils/db/schema.ts';
import { db } from '@/utils/db';
import { eq, desc } from 'drizzle-orm';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const AddExpense = ({ budgetId, onRefresh }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { user } = useUser();

    useEffect(() => {
        
    },[])

  const AddNewExpense = async () => {
    try {
      // Ensure amount is a valid number and parse it from string
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        toast("Please enter a valid amount.");
        return;
      }

      // Prepare expense data
      const expenseData = {
        name: name,
        amount: parsedAmount, // Ensure this is a number
        budgetId: budgetId, // Ensure this is an integer
        createdBy: moment().format('DD/MM/yyy') // Ensure this matches the column name
      };

      const result = await db
        .insert(Expenses)
        .values(expenseData)
        .returning({
          insertedId: Expenses.id, // This should be the exact field you want to return
        });

      if (result) {
        toast("New Expense Added!");
        setName(''); // Clear name input
        setAmount(''); // Clear amount input
        onRefresh(); // Refresh the parent component's state
      }
    } catch (error) {
      console.error("Error adding expense:", error.message);
      toast("Failed to add expense. Please check your input.");
    }
  };


  return (
    <div className='border p-5 rounded'>
      <h2>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-md my-1'>Expense Name</h2>
        <Input
          placeholder="e.g Bedroom decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-md my-1'>Expense Amount</h2>
        <Input
          placeholder="e.g 150₪"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount && !isNaN(amount))}
        className="mt-5 w-full bg-blue-400 hover:bg-blue-300"
        variant="outline"
        onClick={AddNewExpense}
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;
