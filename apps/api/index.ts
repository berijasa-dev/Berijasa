import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";
import cors from "cors";
// created for each request
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();
const appRouter = t.router({
    getUser: t.procedure.query((req) => {
        req.input; // string
        return { id: 123, name: "Bilbo" };
    }),
});
export type AppRouter = typeof appRouter;
const app = express();
app.use(cors());
app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);
app.listen(4000);
