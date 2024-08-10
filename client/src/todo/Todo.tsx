import { useState } from "react"
import { trpc } from "../trpc/trpcClient"

function Todo() {
    const [id, setId] = useState(Number)
    const [title, setTitle] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [lastDateOfSubmission, setLastDateOfsubmitions] = useState('')
    const [isComplete, setisComplete] = useState(false)

    const {data: getTodos, refetch} = trpc.getTodo.useQuery()
    const addTodo = trpc.addTodo.useMutation({
        onSuccess: ()=>{
            refetch()
        }
    })
    const deleteTodo = trpc.deleteTodo.useMutation({
        onSuccess: ()=>{
            refetch()
        }
    })
    const updateTodo = trpc.updateTodo.useMutation({
        onSuccess: ()=>{
            refetch()
        }
    })

    const handelTodo = async (e) => {
        e.preventDefault();
        if(!title || !issueDate || !lastDateOfSubmission ){
            alert("Please fill all fields")
            return
        }

        addTodo.mutate({
            id,
            title,
            issueDate,
            lastDateOfSubmission,
            isComplete 
        })
        setId(Number)
        setTitle('')
        setIssueDate('')
        setLastDateOfsubmitions('')
        setisComplete(false)
    }


    return (
        <>
            <form onSubmit={handelTodo} className="flex gap-3 p-4">
                <input 
                type="text" 
                placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />

                <input 
                type="date" 
                placeholder="Issu Date" 
                value={issueDate}
                onChange={(e)=>setIssueDate(e.target.value)}
                />

                <input 
                type="date" 
                placeholder="Last Date of submition" 
                value={lastDateOfSubmission}
                onChange={(e)=>setLastDateOfsubmitions(e.target.value)}
                />
                
                <button type="submit">Submit</button>
            </form>
            <li className="flex flex-col list-none items-center">
            <h1 className="flex-auto mb-5">Todo List</h1>
            <div>{
                    getTodos?.map((todo:any) => (
                        <div key={todo.id} className="flex gap-3 mt-2">
                            <h3>ID: {todo.id}</h3>
                            <h3>Title: {todo.title}</h3>
                            <p>Issu Date: {todo.issueDate}</p>
                            <p>Last Date Of Submition: {todo.lastDateOfSubmission}</p>
                            <h4>{todo.isComplete ? "true" : "false"}</h4>
                            <button onClick={()=>( 
                                deleteTodo.mutate({
                                    id: todo.id
                                })
                            )}>Delete</button>
                            <button onClick={() => updateTodo.mutate(todo.id)}>Update</button>
                        </div>
                    ))
                }</div>
                
            </li>
        </>
    )
}

export default Todo
