import express from "express";
import cors from "cors"
import appRouter from "./todo/trpcRouter";
import * as trpcExpress from '@trpc/server/adapters/express';

const app = express();

app.use('/trpc',trpcExpress.createExpressMiddleware({
  router:appRouter
}))

app.use(cors());

const port = 3000

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

console.log("hello typescript");
