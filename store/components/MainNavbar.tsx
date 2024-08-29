"use client";

import { cn } from "@/lib/utilis";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CartActions from "./ui/cartActions";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface MainNavbarProps {
  data: Category[];
}

const MainNavbar = ({ data }: MainNavbarProps) => {
  const pathname = usePathname();
  // const [active, setActive] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    name: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Gostore
          </span>
        </a>

        <div className="flex md:order-2">
          <div>

          <CartActions />
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
           <div onClick={()=>setShowMobileMenu(!showMobileMenu)} 
            className="inline-flex items-center p-2 w-12 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
           >
            {
                showMobileMenu ? <XMarkIcon/> : <Bars3BottomRightIcon />
            }
        </div>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {routes.map((route) => (
              <li>
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block py-2 pl-3 pr-4 text-black",
                  route.active ? "text-blue-700" : "text-neutral-500"
                )}
              >
                {route.name}
              </Link>
             
            </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* mobile burger menu */}
      <div className="md:hidden">
        {showMobileMenu && (
          <ul className="px-2 py-3 space-y-2 font-medium text-slate-700">
            {routes.map((route) => (
              <Link
              key={route.href}
              href={route.href}
              className={cn(
                "block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700",
                route.active ? "text-white" : "text-neutral-500"
                )}
                >
                {route.name}
              </Link>
            ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default MainNavbar;
