'use client'
import React, { useEffect, useState } from 'react'
import EmojiPicker  from 'emoji-picker-react';
import { Button } from "../../../../../components/ui/Button.jsx"
import { Input } from "../../../../../components/ui/Input.jsx"
import { DialogClose, DialogFooter } from "../../../../../components/ui/dialog.jsx"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { PenBox } from 'lucide-react';
import { useUser } from '@clerk/nextjs';


const EditBudget = ({budgetInfo}) => {

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const [emojiIcon,setEmojiIcon] = useState(budgetInfo?.icon);
    const {user} = useUser();


    useEffect(()=> {
        if(budgetInfo){
             setEmojiIcon(budgetInfo.icon);
             setName(budgetInfo.name);
             setAmount(budgetInfo.amount);
        }
    },[budgetInfo])
    
    const onUpdateBudget = async () => {
        const result = await db.update(Budget).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        })
    }

    return (
        <div>     
             <Dialog>
            <DialogTrigger>
            <Button className="bg-blue-500 flex gap-2 h-8 w-24 text-white hover:bg-blue-400"><PenBox /> Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update / Change Budget</DialogTitle>
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
                                <Input placeholder="e.g home decor"
                                defaultValue={budgetInfo?.name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>

                            <div className='mt-2'>
                                <h2 className='text-black font-md my-1'>Budget Amount</h2>
                                <Input type="number" placeholder="e.g 5000₪"
                                defaultValue={budgetInfo?.amount} onChange={(e) => {
                                    setAmount(e.target.value)
                                }} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <Button disabled={!(name && amount)} onClick={() => onUpdateBudget()} className="mt-5 w-full bg-blue-600 text-white hover:bg-blue-500">Update Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    )
}

export default EditBudget