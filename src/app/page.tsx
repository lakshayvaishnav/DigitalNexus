import MaxWidthwrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthwrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Marketplace for high-quality{"  "}
            <span className="text-blue-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            welcome to HippoByte. Every asset on our platform is verified by our
            team to ensure out highest quality standards
          </p>
          <div className="flex flex-col sm:flex-row  gap-4 mt-6 ">
            <Link href={"/products"} className={buttonVariants()}>
              Browse Products
            </Link>
            <Button variant={"outline"}>Our Quality Promise &rarr; </Button>
          </div>
        </div>

        {/* rodo : list products */}
      </MaxWidthwrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthwrapper className="py-20">
          <div className=""></div>
        </MaxWidthwrapper>
      </section>
    </>
  );
}
