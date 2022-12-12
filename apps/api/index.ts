import express from "express";
import cors from "cors";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "./routers/appRouter";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc";

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
