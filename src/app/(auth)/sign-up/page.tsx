"use client";

import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Page = () => {
  const router = useRouter();
  const AuthCreadentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be atleast 8 charachters long.",
    }),
  });

  type TAuthCredentialsValidator = z.infer<typeof AuthCreadentialsValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCreadentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPaylodUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This Emaill is already in use. Sign in instead ?");

        return;
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      toast.error("something went wrong. Please try again");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`verification email sent to ${sentToEmail}`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            {/* todo add logo here */}
            <h1 className="text-2xl font-bold">Create An Account</h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account ? Sign-In
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
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  ></Input>
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input {...register("password")}></Input>
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <Button>Sign Up</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
