import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '../common/trpc-api-boilerplate/api-types';
// import superjson from 'superjson';
// import {AppRouter} from "../../../server/src/index"


export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: import.meta.env.VITE_TRPC })],
    // transformer: superjson,
  });