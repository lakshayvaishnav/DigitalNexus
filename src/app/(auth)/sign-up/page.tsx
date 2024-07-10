import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

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
    // todo add verification email
    // onSuccess : ({})
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };
};

export default Page;
