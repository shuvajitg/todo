import express from "express";
import cors from "cors"
import appRouter from "./todo/trpcRouter";
import * as trpcExpress from '@trpc/server/adapters/express';

const app = express();
app.use(cors());


// Logging Middleware
app.use((req, _, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  console.log('Request Body:', req.body); // You might want to use a body parser to see this
  next();
});

app.use('/trpc',trpcExpress.createExpressMiddleware({
  router:appRouter
}))


const port = 3000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter
