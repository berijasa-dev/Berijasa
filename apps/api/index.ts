import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "./src/routers/appRouter";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./src/trpc";

const PORT = process.env.PORT!;
const ENVIRONMENT = process.env.ENVIRONMENT!;
const SERVER_URL =
    ENVIRONMENT === "DEV"
        ? `http://localhost:${PORT}`
        : `https://berijasa-production.up.railway.app`;

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
            url: `${SERVER_URL}/api/trpc`,
            transformer: "superjson",
        })
    );
});

app.listen(Number(PORT), () =>
    console.log(`REST TRPC API server ready at: ${SERVER_URL}`)
);
