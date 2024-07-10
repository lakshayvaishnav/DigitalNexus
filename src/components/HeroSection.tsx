import { WavyBackground } from "@/acertinity-components/wavy-backgroung";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

const HeroSection: React.FC = () => {
  return (
    <>
      <WavyBackground className=" bottom-5 h-screen ">
        <div className="relative  top-16  py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your Marketplace for high-quality{"  "}
            <span className="text-red-500">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-white">
            welcome to DigitalNexus. Every asset on our platform is verified by
            our team to ensure out highest quality standards
          </p>
          <div className="flex flex-col sm:flex-row  gap-4 mt-6 ">
            <Link href={"/signup"}>
              <Button className="px-10 py-5" variant={"default"}>
                Sign Up
              </Button>
            </Link>
            <Link href={"/signin"}>
              <Button className="px-10 py-5" variant={"outline"}>
                Sign In &rarr;{" "}
              </Button>
            </Link>
          </div>
        </div>
      </WavyBackground>
    </>
  );
};

export default HeroSection;
