import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import superjson from "superjson";
import { renderTrpcPanel } from "trpc-panel";

const prisma = new PrismaClient();

// created for each request
const createContext = async ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const getUserFromHeader = async () => {
        // if (req.headers.authorization) {
        //     const user = await decodeAndVerifyJwtToken(
        //         req.headers.authorization.split(" ")[1]
        //     );
        //     return user;
        // }
        return null;
    };
    const user = await getUserFromHeader();
    return {
        user,
    };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
    // if (!ctx.user?.isAdmin) {
    //     throw new TRPCError({ code: "UNAUTHORIZED" });
    // }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});

// you can reuse this for any procedure
const protectedProcedure = t.procedure.use(isAuthed);

const appRouter = t.router({
    createUser: protectedProcedure
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
    getUsers: t.procedure.query(async ({ input }) => {
        const users = await prisma.user.findMany();
        return users;
    }),
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());

app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.use("/api/panel", (_, res) => {
    return res.send(
        renderTrpcPanel(appRouter, {
            url: "http://localhost:4000/api/trpc",
            transformer: "superjson",
        })
    );
});

app.listen(4000, () =>
    console.log("REST API server ready at: http://localhost:4000")
);
