"use client"
import { useState } from 'react'
import UpdateTodo from './UpdateTodo'
import { FiEdit } from "react-icons/fi";
import dayjs from 'dayjs';


function Card({ todo, className }: {
    todo: {
        id: number,
        title: string,
        issueDate: string,
        lastDateOfSubmission: string,
        status: string
    };
    className?: string;
}) {

    const [editFrom, setIsEditFrom] = useState(false)

    const handelEdit = () => {
        setIsEditFrom(true)
    }


    return (
        <>
            <div className={`${className} h-auto w-60 bg-transparent rounded-md flex flex-col mb-3 shadow-md border border-slate-200`} draggable >
                <div className="h-auto w-48 m-2 text-xs uppercase rounded-sm font-semibold">
                    {todo.title}
                </div>
                <div className="flex flex-row justify-between items-center ml-2 mb-2 mr-2">
                    <div className='flex gap-2'>
                        <p className='bg-indigo-600 text-stone-50 text-xs mt-1 px-2 py-0.5 rounded'>{dayjs(todo.issueDate, "DD-MM-YYYY").format("DD MMM")}</p>
                        <p className='bg-red-600 text-stone-50 text-xs mt-1 px-2 py-0.5 rounded'>{dayjs(todo.lastDateOfSubmission, "DD-MM-YYYY").format("DD MMM")}</p>
                    </div>

                    <div
                        onClick={handelEdit}
                        className='text-slate-600 text-xl'>
                        <button
                        >
                            <FiEdit />
                        </button>
                    </div>

                </div>
                {
                    editFrom &&
                    <UpdateTodo
                        todo={todo}
                    />
                }
            </div>
        </>

    )
}

export default Card
