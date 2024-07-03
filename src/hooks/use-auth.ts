import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const signout = async () => {
    try {
      const res = await fetch(`${process.env.PUBLIC_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error();

      toast.success("signed out successfully");

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("could'nt sign out , please try again.");
    }
  };

  return { signout };
};
