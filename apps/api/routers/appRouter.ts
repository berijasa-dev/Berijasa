import { t } from "../trpc";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

export const appRouter = t.router({
    user: userRouter,
    auth: authRouter,
});
