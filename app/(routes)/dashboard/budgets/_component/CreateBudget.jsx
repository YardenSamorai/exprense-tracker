'use client'
import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { Button } from "../../../../../components/ui/Button.jsx"
import { Input } from "../../../../../components/ui/Input.jsx"
import { DialogClose, DialogFooter } from "../../../../../components/ui/dialog.jsx"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Budget } from '@/utils/db/schema';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';

const CreateBudget = ({setBudgetList}) => {
    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const { user } = useUser();

    const onCreateBudget = async () => {
        const newBudget = {
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon
        }
        const result = await db.insert(Budget).values(newBudget).returning({ insertedId: Budget.id })

        if (result) {
            toast("New Budget Created!");
            setBudgetList(prev => [...prev, {...newBudget}]);
        }
    }
    return (
        <Dialog>
            <DialogTrigger>
                <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                    <h2 className='text-3xl'>+</h2>
                    <h2 className=''>Create New Budget</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        <div className='mt-5'>
                            <Button className="text-lg" size="lg" variant="outline" onClick={() => {
                                setOpenEmojiPicker(!openEmojiPicker)
                            }}>{emojiIcon}</Button>
                            <div className='absolute'>
                                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                    setEmojiIcon(e.emoji)
                                    setOpenEmojiPicker(false)
                                }} />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-md my-1'>Budget Name</h2>
                                <Input placeholder="e.g home decor" onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-md my-1'>Budget Amount</h2>
                                <Input type="number" placeholder="e.g 5000$" onChange={(e) => {
                                    setAmount(e.target.value)
                                }} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className="mt-5 w-full bg-blue-600 text-white hover:bg-blue-500">Create Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBudget
