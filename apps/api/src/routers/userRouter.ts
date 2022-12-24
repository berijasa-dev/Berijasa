import { z } from "zod";
import { prisma } from "../prisma-client";
import { protectedProcedure, t } from "../trpc";

export const userRouter = t.router({
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
