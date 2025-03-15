"use client";
import { ChevronDown, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
// import Category from "../Categories";
import ProductCategories from "./ProductCategories";
import Caliberations from "./Caliberations";
import ServicesCategories from "./ServicesCategories";
import { signInRoute } from "@/utilities/Routes";
import { useSessionStore } from "@/store/SessionStore";
import CartDrawer from "../cart/drawer";

const Navbar = () => {
  const { session } = useSessionStore();
  const user = session?.user;

  return (
    <nav className=" bg-primary mt-6 hidden sm:block ">
      <div className=" flex justify-center gap4 text-white container items-center font-semibold">
        <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
          <Link href="/" className="flex w-full items-end justify-center gap-1">
            <span>Products</span>
            <ChevronDown size={20} />{" "}
          </Link>
          <ProductCategories />
        </div>

        <div className="h-10 w-[1px]  bg-neutral-line"></div>

        <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
          <Link href="/" className="flex w-full items-end justify-center gap-1">
            <span>Caliberation</span>
            <ChevronDown size={20} />{" "}
          </Link>
          <Caliberations />
        </div>

        <div className="h-10  w-[1px] bg-neutral-line"></div>

        <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
          <Link href="/" className="flex w-full items-end justify-center gap-1">
            <span>Services</span>
            <ChevronDown size={20} />{" "}
          </Link>
          <ServicesCategories />
        </div>

        <div className="h-10 w-[1px]  bg-neutral-line"></div>

        <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-1"
          >
            <span>Search</span>
            <Search size={16} />{" "}
          </Link>
          {/* <Category style="top-10 right-0 dropDown" /> */}
        </div>

        <div className="flex w-1/4 py-2 relative text-center bgblue-300 justify-end gap-3  duration-150">
          <Link
            href="/"
            title="Cart"
            className="flex justify-center items-center bg-white rounded-full p-1.5"
          >
            <ShoppingCart size={20} className="text-primary" />
          </Link>
          {user ? (
            <Link
              href="/account"
              title="My Account"
              className="bg-white rounded-full flex justify-center items-center p-1.5"
            >
              <UserRound size={20} className="text-primary" />
            </Link>
          ) : (
            <Link
              href={signInRoute}
              title="My Account"
              className="text-primary bg-white rounded-xl flex justify-center items-center p-1.5"
            >
              Sign In
            </Link>
          )}
        </div>
        <CartDrawer/>
      </div>
    </nav>
  );
};

export default Navbar;
