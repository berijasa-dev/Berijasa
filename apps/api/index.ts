import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// created for each request
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
    createUser: t.procedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const response = await prisma.user.create({
                data: { email: `${input.name}@gmail.com`, name: input.name },
            });
            return response;
        }),
    getUser: t.procedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .query(async ({ input }) => {
            const user = await prisma.user.findFirst({
                where: { name: input.name },
            });
            return user;
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

app.listen(4000, () =>
    console.log("REST API server ready at: http://localhost:4000")
);
