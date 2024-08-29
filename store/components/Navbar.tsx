import { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { BsCarFrontFill } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";
import Link from "next/link";
import MainNavbar from "./MainNavbar";

import getCategories from "@/actions/get-categories";
import CartActions from "./ui/cartActions";
import globalStyles from "../styles/styles";
import Container from "./ui/container";
// import { signOut, useSession } from 'next-auth/react';

// revalidate to uncatch
export const revalidate = 0;

const Navbar = async () => {
  // const [open, setOpen] = useState(false)
  // const [loggedUser, setLoggedUser] = useState(true)

  const categories = await getCategories();
  // console.log("CATEGORIES", categories);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
      <MainNavbar data={categories} />
    </nav>
  );
};

export default Navbar;
