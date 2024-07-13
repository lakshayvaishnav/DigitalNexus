import Link from "next/link";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import Cart from "./Cart";
import { Button, buttonVariants } from "./ui/button";
import { cookies } from "next/headers";
import { getServerSideUser } from "../lib/payload-utils";
import UserAccountNav from "../components/UserAccountnav";
import { User } from "lucide-react";
import "../../public/ninja.jpg";
import Image from "next/image";
const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("user from navbar is :  " + JSON.stringify(user));

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 text-white">
      <header className="relative bg-black px-2">
        <MaxWidthWrapper>
          <div className="border-b border-black">
            <div className="flex h-16 items-center">
              {/* todo : mobile nav  */}

              <div className="ml-4 flex lg:ml-0 ">
                <Link href="/">
                  <Image src={"/dog.png"} alt="logo" width={32} height={32} />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center  ">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}

                  {user ? (
                    //@ts-ignore
                    <UserAccountNav user={user} />
                  ) : null}

                  {user ? (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6 pr-4">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
