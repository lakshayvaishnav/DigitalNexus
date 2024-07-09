import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
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
export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="relative">hello testing bithc</section>
    </>
  );
}
