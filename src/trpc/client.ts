import { createTRPCReact } from "@trpc/react-query";
import { Approuter } from "./index";

export const trpc = createTRPCReact<Approuter>({});
