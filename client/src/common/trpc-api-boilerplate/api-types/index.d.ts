import * as _trpc_server from '@trpc/server';

declare const appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: object;
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: _trpc_server.DefaultDataTransformer;
}>, {
    getTodo: _trpc_server.BuildProcedure<"query", {
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _ctx_out: object;
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }, unknown>;
    addTodo: _trpc_server.BuildProcedure<"mutation", {
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id: number;
            title: string;
            issueDate: string;
            lastDateOfSubmission: string;
            status: string;
        };
        _input_out: {
            id: number;
            title: string;
            issueDate: string;
            lastDateOfSubmission: string;
            status: string;
        };
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
    }, unknown>;
    updateTodo: _trpc_server.BuildProcedure<"mutation", {
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id: number;
            title: string;
            issueDate: string;
            lastDateOfSubmission: string;
            status: string;
        };
        _input_out: {
            id: number;
            title: string;
            issueDate: string;
            lastDateOfSubmission: string;
            status: string;
        };
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
    }, unknown>;
    deleteTodo: _trpc_server.BuildProcedure<"mutation", {
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id: number;
        };
        _input_out: {
            id: number;
        };
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
    }, unknown>;
}>;

type AppRouter = typeof appRouter;

type Square = {
    shape: 'square';
    size: number;
};
type Rectangle = {
    shape: 'rectangle';
    width: number;
    height: number;
};
type Shape = Square | Rectangle;
declare const SharedSquareObject: Shape;

export { type AppRouter, type Shape, SharedSquareObject };
