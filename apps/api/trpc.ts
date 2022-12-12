import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import * as trpcExpress from "@trpc/server/adapters/express";

// created for each request
export const createContext = async ({
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

export const t = initTRPC.context<Context>().create({
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
export const protectedProcedure = t.procedure.use(isAuthed);
