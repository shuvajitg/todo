"use client"
import CreateTodo from "../components/CreateTodo";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '../trpc/trpcClient';
import { useEffect, useState } from "react";
import Card from "../components/TodoCard";
import getTRPCCall from "../hooks/getTRPCCall";
import { RiTodoFill } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


interface TodoType {
    id: number,
    title: string,
    issueDate: string,
    lastDateOfSubmission: string,
    status: string
}
type TodoState = {
    needodo: TodoType[];
    inProgress: TodoType[];
    done: TodoType[];
};
const Todo = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null); 
    const { getTodoList } = getTRPCCall()
    const [todolist, setTodoList] = useState<TodoState>({
        needodo: [],
        inProgress: [],
        done: []
    });


    useEffect(() => {
        const fetchTodo = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            try {
                const todolistData: TodoType[] = await getTodoList() as TodoType[]
                const needTodo = todolistData?.filter(todo => todo.status === 'Need Todo')
                const inProgress = todolistData?.filter((todo) => todo.status === 'In Progress')
                const done = todolistData?.filter((todo) => todo.status === 'Done')
                setTodoList({
                    needodo: needTodo,
                    inProgress: inProgress,
                    done: done
                })
            } catch (error) {
                console.error(error);

            } finally {
                clearTimeout(timeoutId)
            }
        }
        fetchTodo()
    }, [getTodoList])




    return (
        <div className="flex flex-col bg-gradient-to-tr from-slate-50 to-slate-100 shadow-md w-auto h-screen">
            <div className="ml-2">
                <CreateTodo element={"+ Add Todos"} />
            </div>
            <div className="flex justify-between p-14">
                <div className="flex flex-col items-center">
                    <div className="text-xl flex items-center gap-1 font-semibold mb-2"><RiTodoFill className="text-red-800" /> Todo List</div>
                    {
                        todolist?.needodo?.map((todo) => (
                            <div key={todo.id}>
                                <Card
                                    className={""}
                                    todo={todo}
                                    setactiveCard={setActiveCard}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-xl flex items-center gap-1 font-semibold mb-2"><GrInProgress className="text-yellow-500" /> In progress</div>
                    {
                        todolist?.inProgress?.map((todo) => (
                            <div key={todo.id}>
                                <Card
                                    className={""}
                                    todo={todo}
                                    setactiveCard={setActiveCard}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-xl flex items-center gap-1 font-semibold mb-2"><IoCheckmarkDoneCircleSharp className="text-green-700" /> Done</div>
                    {
                        todolist?.done?.map((todo) => (
                            <div key={todo.id}>
                                <Card
                                    className={""}
                                    todo={todo}
                                    setactiveCard={setActiveCard}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <h1>Active Card - {activeCard}</h1>
        </div>
    )
}

const TodoPage = () => {
    const queryClient = new QueryClient();

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Todo />
            </QueryClientProvider>
        </trpc.Provider>
    )
}


export default TodoPage;