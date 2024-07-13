"use client";

import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import ProductReel from "./ProductRee";
import Ripple from "./magicui/ripple";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },

  {
    name: "Guranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to insure highest quality standards. Not Happy ? wee offer 30 days refund guranteed",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We have pledged 1% sales to the preservation and restoration of the natural environment.",
  },
];

const Herosection2 = () => {
  return (
    <>
      <MaxWidthWrapper classname="w-full px-10  flex flex-col justify-center items-center ">
        <div className="relative top-2 bg-black border-black shadow-white shadow-xl flex h-[400px] w-[1000px]   flex-col items-center justify-center overflow-hidden rounded-lg  border bg-background md:shadow-xl ">
          <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter top-2 text-white">
            <span>Browse </span> <span className="text-red-500">Products</span>
          </p>

          <p className="z-10 mt-8 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter top-2 text-white">
            Featured <span> </span>
            <span className="text-blue-500">Digital Assets</span>
          </p>
          <Ripple />
        </div>

        <ProductReel
          query={{ sort: "asc", limit: 4 }}
          href="/products?sort=recent"
          title="Brand new"
        />
      </MaxWidthWrapper>
    </>
  );
};

export default Herosection2;
