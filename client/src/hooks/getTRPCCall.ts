import { trpc } from "../trpc/trpcClient"

const getTRPCCall = ()=>{
    const {data: todoList , refetch} = trpc.getTodo.useQuery()

    const getTodoList = ()=>{
        return todoList 
    }

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

    return {
        addTodo,
        deleteTodo,
        updateTodo,
        refetch,
        getTodoList
    }
}

export default getTRPCCall