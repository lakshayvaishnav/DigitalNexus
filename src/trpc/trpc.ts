import { initTRPC } from "@trpc/server";

const t = initTRPC.context().create();

export const router = t.router;

// public procedure these routes can be called by anybody...
export const publicProcedure = t.procedure;
