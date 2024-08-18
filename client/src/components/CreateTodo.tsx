"use client"
import { useState } from "react"
import getTRPCCall from "../hooks/getTRPCCall";
import toast from 'react-hot-toast';
import { Button } from "@headlessui/react";
import clsx from 'clsx'

const CreateTodo = ({ element }: { element: any }) => {

    const { addTodo } = getTRPCCall();

    const [todo, setTodo] = useState({
        id: 0,
        title: '',
        issueDate: '',
        lastDateOfSubmission: '',
        status: "Need Todo",
        add: false
    })

    const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTodo(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const handelTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const { id, title, issueDate, lastDateOfSubmission, status } = todo;
            if (!title || !issueDate || !lastDateOfSubmission) {
                toast("Please fill all the felds", {
                    icon: "⚠️"
                })
                return
            }
            if (todo.id === 0) {
                addTodo.mutate({
                    id,
                    title,
                    issueDate,
                    lastDateOfSubmission,
                    status
                })
            }
            setTodo({
                id: 0,
                title: '',
                issueDate: '',
                lastDateOfSubmission: '',
                status: 'Need Todo',
                add: false,
            })
            toast.success('Todo Added Sucessfully!', {
                icon: "👏"
            });
        } catch (error) {
            console.error(error)
            toast.error('Error Adding Todo', {
                icon: "��"
            });
        }
    }

    const addTodos = () => {
        setTodo(pre => ({
            ...pre,
            add: true
        }))
    }
    const handelClose = () => {
        setTodo(pre => ({
            ...pre,
            add: false
        }))
    }

    return (
        <>
            <button
                className="mt-2 inline-flex items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[open]:bg-gray-700 data-[focus]:outline-1"
                onClick={addTodos}>
                {element}
            </button>
            <hr className="mt-3" />
            {todo.add &&
                <div className={todo.add ? "absolute transition-all w-96 max-w-screen px-4  bg-gradient-to-r from-slate-100 to-slate-50 overflow-hidden -translate-y-14 -translate-x-5 rounded-r-md shadow-2xl " : "hidden"}>
                    <div className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">

                        <div className="flex justify-between items-center">
                            <label htmlFor="">Todo details</label>
                            <span className="text-4xl font-extrabold cursor-pointer -mt-1" onClick={handelClose}>&times;</span>
                        </div>
                        <div>
                            <label className="text-sm/6 font-medium text-black">Title</label>
                            <div className="text-sm/6 text-slate-500">Set Your Project Title Hear.</div>
                            <textarea
                                className={clsx(
                                    'mt-3 block w-full rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 text-black border border-slate-800',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                // type="text"
                                placeholder="Title"
                                value={todo.title}
                                onChange={handelChange}
                                name="title"
                            />
                        </div>
                        <div>
                            <label className="text-sm/6 font-medium text-black">Issue Date</label>
                            <div className="text-sm/6 text-slate-500">Set Your Project Issue Date Hear.</div>
                            <input
                                className={clsx(
                                    'mt-3 block rounded-lg uppercase bg-white/5 py-1.5 px-3 text-sm/6 text-black border border-slate-800 w-auto',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                type="date"
                                placeholder="Issu Date"
                                value={todo.issueDate}
                                onChange={handelChange}
                                name="issueDate"
                            />
                        </div>

                        <div>
                            <label className="text-sm/6 font-medium text-black">Last Date Of Submition</label>
                            <div className="text-sm/6 text-slate-500">Set Your Project Submition Date Hear.</div>
                            <input
                                className={clsx(
                                    'mt-3 block rounded-lg uppercase bg-white/5 py-1.5 px-3 text-sm/6 text-black border border-slate-800 w-auto',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                type="date"
                                placeholder="Last Date of submition"
                                value={todo.lastDateOfSubmission}
                                onChange={handelChange}
                                name="lastDateOfSubmission"
                            />
                        </div>

                        <div>
                            <label className="text-sm/6 font-medium text-black">Status</label>
                            <div className="text-sm/6 text-slate-500">Select Your Project Status Hear.</div>
                            <div className="relative">
                                <select
                                    className={clsx(
                                        'mt-3 w-full rounded-lg border border-slate-500 bg-white/5 py-1.5 px-3 text-sm/6 text-black',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 ',
                                        '*:text-black'
                                    )}
                                    name="status"
                                    value={todo.status}
                                    onChange={handelChange}
                                >
                                    <option value="Need Todo">Need Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>

                        <Button
                            onClick={handelTodo}
                            className={`inline-flex translate-x-48 items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-whit`}
                            type="submit"
                        >Add</Button>
                    </div>
                </div>

            }
        </>

    )
}

export default CreateTodo;