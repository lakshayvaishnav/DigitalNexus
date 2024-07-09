import Image from "next/image";
import { WavyBackground } from "@/acertinity-components/wavy-backgroung";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
export default function Home() {
  return (
    <>
      <MaxWidthWrapper classname="overflow-x-hidden">
        <div className="absolute py-20 mx-auto text-center flex flex-col items-center max-w-screen-xl top-20 left-10 right-10 z-10">
          <h1 className="text-xl font-bold tracking-tight sm:text-6xl">
            Your MarketPlace for high-qualtiy <br />
            <span className="text-red-500">digital assets</span>
          </h1>
        </div>
        <WavyBackground className="absolute`" />
      </MaxWidthWrapper>
    </>
  );
}
