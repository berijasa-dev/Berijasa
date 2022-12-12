import { z } from "zod";
import { prisma } from "../prisma-client";
import { protectedProcedure, t } from "../trpc";
import { OAuth2Client } from "google-auth-library";
import * as dotenv from "dotenv";
import { TRPCError } from "@trpc/server";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const IOS_Google_Client_ID =
    "285791189129-q0hu15n0n53ulgc7kn75le3dlsm9lful.apps.googleusercontent.com";
const Android_Google_Client_ID =
    "285791189129-v3kgpsj1s1ooajld0uufh55vh67i81r5.apps.googleusercontent.com";

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
                    audience: [IOS_Google_Client_ID, Android_Google_Client_ID],
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
