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
            })
        })
    }),

    // *****************add todo list****************** \\
    addTodo: trpc.procedure.input(z.object({
        id: z.number(),
        title: z.string(),
        issueDate: z.string(),
        lastDateOfSubmission: z.string(),
        isComplete: z.boolean()
    })).mutation(async({ input }) => {
        const { title, issueDate, lastDateOfSubmission, isComplete } = input
        return await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO todos ( title, issueDate, lastDateOfSubmission, isComplete)  VALUES (?, ?, ?, ?)', [ title, issueDate, lastDateOfSubmission, isComplete ],
                function (err: any,result: any) {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(result);
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
        isComplete: z.boolean()
    })).mutation(({input})=>{
        const { id, title, issueDate, lastDateOfSubmission, isComplete } = input
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE todos SET title =?, issueDate =?, lastDateOfSubmission =?, isComplete =? WHERE id =?', 
                [title, issueDate, lastDateOfSubmission, isComplete, id],
                function (err: any,result: any) {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(result)
                }
            )
        });
    }),

    // *****************delete Todo******************* \\
    deleteTodo: trpc.procedure.input(z.object(({
        id: z.number()
    }))).mutation(async({input})=>{
        const {id} = input
        return await new Promise ((resolve,reject) => {
            db.run('DELETE FROM todos WHERE id = ?'),
            [id],
            function (err:any,result:any){
                if (err){
                    reject(err.message)
                }
                resolve(result)
            }
        })
    })
})


export default appRouter
