import trpc from "../trpc";
import db from "./db";
import { z } from "zod"

const appRouter = trpc.router({
    // *****************show todo list****************** \\
    getTodo: trpc.procedure.query(async() => {
        return await new Promise((resolve, reject) => {
            db.all('select * from todos', (error, result) => {
                if (error) {
                    reject(error.message);
                }
                resolve(result)
                return {success: true}
            })
        })
    }),

    // *****************add todo list****************** \\
    addTodo: trpc.procedure.input(z.object({
        id: z.number(),
        title: z.string(),
        issueDate: z.string(),
        lastDateOfSubmission: z.string(),
        // isComplete: z.boolean(),
        status: z.string()
    })).mutation(async({ input }) => {
        const { title, issueDate, lastDateOfSubmission, status } = input
        return await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO todos ( title, issueDate, lastDateOfSubmission, status)  VALUES (?, ?, ?, ?)', [ title, issueDate, lastDateOfSubmission, status],
                function (err: any,result: any) {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(result);
                    return {success: true}
                }
            )
        });
    }),

    // *****************update todo list****************** \\
    updateTodo: trpc.procedure.input(z.object({
        id:z.number(),
        title: z.string(),
        issueDate: z.string(),
        lastDateOfSubmission: z.string(),
        status: z.string()
    })).mutation(({input})=>{
        const { id, title, issueDate, lastDateOfSubmission,status } = input
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE todos SET title =?, issueDate =?, lastDateOfSubmission =?, status =? WHERE id =?', 
                [title, issueDate, lastDateOfSubmission, status, id],
                function (err: string,result: string) {
                    if (err) {
                        reject(err);
                    }
                    resolve({result})
                    return {success: true}
                    
                }
            )
        });
    }),

    // *****************delete Todo******************* \\
    deleteTodo: trpc.procedure.input(z.object(({
        id: z.number()
    }))).mutation(({input})=>{
        const {id} = input
        return new Promise ((resolve,reject) => {
            db.run('DELETE FROM todos WHERE id = ?',
                [id],
                function (err:any,result:any){
                    if (err){
                        reject(err.message)
                    }
                    resolve({changes: result})
                    return {success: true}
                    
                })
        })
    })
})


export default appRouter
