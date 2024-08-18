import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc,trpcClient } from '../trpc/trpcClient';
// import Todo from './Todo';

function Layout() {
    const queryClient = new QueryClient();
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {/* <Todo/> */}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Layout
