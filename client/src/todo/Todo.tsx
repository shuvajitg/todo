import { useState } from "react"
import { trpc } from "../trpc/trpcClient"


function Todo() {
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [lastDateOfSubmission, setLastDateOfsubmitions] = useState('')
    const [isComplete, setisComplete] = useState(false)

    interface type {
        id: number,
        title: string,
        issueDate: string,
        lastDateOfSubmission: string,
        isComplete: boolean
    }

    const { data: getTodos, refetch } = trpc.getTodo.useQuery()
    const addTodo = trpc.addTodo.useMutation({
        onSuccess: () => {
            refetch()
        }
    })

    const deleteTodo = trpc.deleteTodo.useMutation({
        onSuccess: () => {
            refetch()
        }
    })
    const updateTodo = trpc.updateTodo.useMutation({
        onSuccess: () => {
            refetch()
        }
    })

    const handelTodo = async (e) => {
        e.preventDefault();
        if (!title || !issueDate || !lastDateOfSubmission) {
            alert("Please fill all fields")
            return
        }
        if (id === 0) {
            addTodo.mutate({
                id,
                title,
                issueDate,
                lastDateOfSubmission,
                isComplete
            })
        } else {
            updateTodo.mutate({
                id,
                title,
                issueDate,
                lastDateOfSubmission,
                isComplete
            })
            setId(0)
        }
        setId(Number)
        setTitle('')
        setIssueDate('')
        setLastDateOfsubmitions('')
        setisComplete(false)
    }

    const handelDelet = async (id: number) => {
        try {
            await deleteTodo.mutate({ id });
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handelEdit = (todo: type) => {
        setId(todo.id)
        setTitle(todo.title)
        setIssueDate(todo.issueDate)
        setLastDateOfsubmitions(todo.lastDateOfSubmission)
        setisComplete(todo.isComplete)
    }

    return (
        <>
            <h1 className="text-center text-xl underline underline-offset-4 font-semibold pt-3">{id === 0 ? "Add Todo" : "Update your todo"}</h1>
            <div className="flex justify-center">
                <form onSubmit={handelTodo} className="flex gap-3 p-4 items-center">
                    <input
                        className="w-6"
                        type="number"
                        placeholder="id"
                        value={id}
                        readOnly />

                    <input
                        className="bg-slate-200 h-8 w-auto rounded border border-slate-800 text-center capitalize"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        className="bg-slate-200 h-8 w-auto rounded border border-slate-800 text-center uppercase"
                        type="date"
                        placeholder="Issu Date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />

                    <input
                        className="bg-slate-200 h-8 w-auto rounded border border-slate-800 text-center uppercase"
                        type="date"
                        placeholder="Last Date of submition"
                        value={lastDateOfSubmission}
                        onChange={(e) => setLastDateOfsubmitions(e.target.value)}
                    />

                    <div className="flex flex-row gap-2">
                        <span>Complite</span>
                        <input 
                        type="checkbox"
                            checked={isComplete}
                            onChange={(e) => setisComplete(e.target.checked)} />
                    </div>
                    <button
                        className={`p-2 pt-1 pb-1 rounded-md shadow-lg text-slate-100 ${id === 0 ? "bg-green-800 px-4" : "bg-indigo-800 "}`}
                        type="submit"
                    >{id === 0 ? "Add" : "Update"}</button>
                </form>
            </div>
            <li className="flex flex-col list-none items-center">
                <h1 className="flex-auto mt-8 mb-2 font-extrabold text-xl">Todo List</h1>
                <div >{
                    getTodos?.map((todo: any) => (
                        <div key={todo.id} className="flex gap-3 mt-2 items-center">
                            <h3 className="">
                                <span className="font-bold">ID: </span>
                                {todo.id}
                            </h3>
                            <h3>
                                <span className="font-bold">Title: </span>
                                {todo.title.toUpperCase()}
                            </h3>
                            <p>
                                <span className="font-bold">Issu Date: </span>
                                {todo.issueDate}
                            </p>
                            <p>
                                <span className="font-bold">Last Date Of Submition: </span>
                                {todo.lastDateOfSubmission}
                            </p>
                            <h4>
                                <span className="font-bold">Status: </span>
                                {todo.isComplete ? "true" : "false"}
                            </h4>
                            <button
                                className="bg-red-800 p-2 pt-1 pb-1 rounded-md shadow-lg text-slate-100"
                                onClick={() => handelDelet(todo.id)}
                            >Delete</button>
                            <button
                                className="bg-indigo-800 p-2 pt-1 pb-1 rounded-md shadow-lg text-slate-100"
                                onClick={() => handelEdit(todo)}
                            >Update</button>
                        </div>
                    ))
                }</div>
            </li>
        </>
    )
}

export default Todo
