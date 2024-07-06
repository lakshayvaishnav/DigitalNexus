import { ExpressContext } from "@/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { User } from "payload/dist/auth";
import { PayloadRequest } from "payload/types";

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest;

  const { user } = req as { user: User | null };

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;

// public procedure these routes can be called by anybody...
export const publicProcedure = t.procedure;

// private procedure routes can be called by signed in user only.
export const privateProcedure = t.procedure.use(isAuth);
