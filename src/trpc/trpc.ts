import { initTRPC } from "@trpc/server";

const t = initTRPC.context().create();

const middleware = t.middleware;

export const router = t.router;

// public procedure these rouotes can be called by anybody
export const publicProcedure = t.procedure;

//todo create private procedure.
