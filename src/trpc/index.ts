import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyapiroute: publicProcedure.query(() => {
    return "hello";
  }),
});

export type Approuter = typeof appRouter;
