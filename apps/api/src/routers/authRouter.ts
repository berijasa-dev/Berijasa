import { z } from "zod";
import { protectedProcedure, t } from "../lib/trpc";
import { OAuth2Client } from "google-auth-library";
import { TRPCError } from "@trpc/server";
import { prisma } from "../lib/prisma";

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID!;
const IOS_GOOGLE_AUTH_CLIENT_ID = process.env.IOS_GOOGLE_AUTH_CLIENT_ID!;
const ANDROID_GOOGLE_AUTH_CLIENT_ID =
    process.env.ANDROID_GOOGLE_AUTH_CLIENT_ID!;

const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID);

export const authRouter = t.router({
    loginWithGoogle: t.procedure
        .input(
            z.object({
                idToken: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            async function verifyIdTokenWithGoogle() {
                const ticket = await client.verifyIdToken({
                    idToken: input.idToken,
                    audience: [
                        IOS_GOOGLE_AUTH_CLIENT_ID,
                        ANDROID_GOOGLE_AUTH_CLIENT_ID,
                    ],
                });
                const payload = ticket.getPayload();
                return payload;
            }
            const googleUser = await verifyIdTokenWithGoogle();
            const userDBLookup = await prisma.user.findUnique({
                where: { googleId: googleUser?.sub },
            });
            if (!!userDBLookup) {
                return userDBLookup;
            } else if (!!googleUser?.email && !!googleUser.name) {
                const newUser = await prisma.user.create({
                    data: {
                        email: googleUser.email,
                        name: googleUser.name,
                        googleId: googleUser.sub,
                        image: googleUser.picture,
                    },
                });
                return newUser;
            } else {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message:
                        "An unexpected error occurred, please try again later.",
                });
            }
        }),
});
