"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");
  const router = useRouter();

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.push("/sign-in", undefined);
  };

  const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be atleast 8 characters long.",
    }),
  });

  type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Signed in successfully");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }
      router.push("/");
    },

    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalild email or password");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your {isSeller ? "seller" : ""} account
          </h1>
          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/sign-in"
          >
            don&apos;t have an account? sign-up
            <ArrowRight />
          </Link>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  className={cn({ "focus-visible:ring-red-500": errors.email })}
                  placeholder="you@example.com"
                ></Input>
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="password"
                ></Input>
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>

          {/* divider ----or---- */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {" "}
                or
              </span>
            </div>
          </div>

          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              variant={"secondary"}
              disabled={isLoading}
            >
              Continue as customer
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              variant={"secondary"}
              disabled={isLoading}
            >
              Continue as seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
