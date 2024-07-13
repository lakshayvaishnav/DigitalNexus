import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import HeroSection from "../components/HeroSection";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { any } from "zod";
import Herosection2 from "@/components/HeroSection-2";

export default async function Home() {
  const nextcookies = cookies();
  const { user } = await getServerSideUser(nextcookies);

  return <>{user ? <Herosection2 /> : <HeroSection />}</>;
}
