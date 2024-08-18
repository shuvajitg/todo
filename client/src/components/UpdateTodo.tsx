'use client'

import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from "react"
import getTRPCCall from "../hooks/getTRPCCall"
import { BiEdit } from 'react-icons/bi'
import toast from 'react-hot-toast';
import clsx from 'clsx'


const UpdateTodo = ({ todo }:{todo: {id:number,title:string,issueDate:string,lastDateOfSubmission:string,status:string}}) => {

    const [formData, setFormData] = useState({
        id: todo.id,
        title: todo.title,
        issueDate: todo.issueDate,
        lastDateOfSubmission: todo.lastDateOfSubmission,
        status: todo.status || "Need Todo"
    })
    const [open, setOpen] = useState(true);

    const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(pre => ({
            ...pre,
            [name]: value
        }))
    }
    const { updateTodo, deleteTodo } = getTRPCCall();

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const { id, title, issueDate, lastDateOfSubmission, status } = formData;

            if (!title || !issueDate || !lastDateOfSubmission) {
                toast("Please fiff all the fields", {
                    icon: "⚠️"
                })
                return
            }
            if (formData.id > 0) {
                await updateTodo.mutate({
                    id,
                    title,
                    issueDate,
                    lastDateOfSubmission,
                    status
                });
                toast.success(
                    "Todo updated successfully!", {
                    icon: "🤝"
                }
                )
            }
            setOpen(!open);
        } catch (error) {
            console.error("Error updating todo:", error);
            toast.error(
                "Failed to update todo. Try again later!", {
                icon: "🚫"
            }
            )
        }
    }

    const handelDelet = async (id: number) => {
        try {
            await deleteTodo.mutate({ id });
            toast.success(
                "Todo deleted successfully!", {
                icon: "👏"
            }
            )
            setOpen(false);
        } catch (error) {
            console.error("Error deleting todo:", error);
            toast.error(
                "Failed to delete todo. Try again later!", {
                icon: "🚫"
            }
            )
        }
    };
    
    const handelOpen = () => {
        setOpen(!open);
    }
    return (
        <>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                <div className="fixed inset-0 z-10 w-auto overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8  sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className='flex items-center gap-2'>
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <BiEdit onClick={handelOpen} aria-hidden="true" className="h-6 w-6 text-green-600" />
                                        </div>
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Edit Todo
                                        </DialogTitle>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <div className="mt-2 ">
                                            <div className="flex flex-col items-center">
                                                <form
                                                    className="mt-10 flex flex-col gap-3 ">
                                                    <div className={``}>
                                                        <div className="text-sm/6 text-slate-500">Sellected todo id</div>
                                                        <input
                                                            className="w-6"
                                                            type="number"
                                                            placeholder="id"
                                                            value={formData.id}
                                                            readOnly />
                                                    </div>

                                                    <div>
                                                        <div className="text-sm/6 text-slate-500">Update your todo title</div>
                                                        <textarea
                                                            value={formData.title}
                                                            onChange={handelChange}
                                                            className={clsx(
                                                                'mt-3 block w-full rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 text-black border border-slate-800',
                                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                            )}
                                                            placeholder="title"
                                                            name="title" />
                                                    </div>

                                                    <div>
                                                        <div className="text-sm/6 text-slate-500">Update Your Project Issue Date Hear.</div>
                                                        <input
                                                            name='issueDate'
                                                            value={formData.issueDate}
                                                            onChange={handelChange}
                                                            className={clsx(
                                                                'mt-3 block rounded-lg uppercase bg-white/5 py-1.5 px-3 text-sm/6 text-black border border-slate-800 w-auto',
                                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                            )}
                                                            type="date" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm/6 text-slate-500">Set Your Project Submition Date Hear.</div>
                                                        <input
                                                            name='lastDateOfSubmission'
                                                            value={formData.lastDateOfSubmission}
                                                            onChange={handelChange}
                                                            className={clsx(
                                                                'mt-3 block rounded-lg uppercase bg-white/5 py-1.5 px-3 text-sm/6 text-black border border-slate-800 w-auto',
                                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                            )}
                                                            type="date" />
                                                    </div>


                                                    <div>
                                                        <div className="text-sm/6 text-slate-500">Select Your Project Status Hear.</div>
                                                        <select name="status"
                                                        className={clsx(
                                                            'mt-3 w-full rounded-lg border border-slate-500 bg-white/5 py-1.5 px-3 text-sm/6 text-black',
                                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 ',
                                                            '*:text-black'
                                                        )}
                                                            value={formData.status} onChange={handelChange} required>
                                                            <option
                                                                value="Need Todo" >Need Todo</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option
                                                                value="Done">Done</option>
                                                        </select>
                                                    </div>


                                                    <Button onClick={handleUpdate}
                                                        className="p-2 pt-1 pb-1 rounded-md shadow-lg text-slate-100 bg-indigo-800 "
                                                        type="submit">Update</Button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-ged-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 md:flex md:gap-2 mx">
                                <div className=''>
                                    <Button
                                        onClick={() => handelDelet(todo.id)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-slate-50 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-900 sm:mt-0 sm:w-auto"
                                    >Delete</Button>
                                </div>
                                <Button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default UpdateTodo;
