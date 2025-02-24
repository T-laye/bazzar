import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import { ChevronDown, Phone, Search } from "lucide-react";
import Category from "./Categories";

const Header = () => {
  return (
    <header className="">
      <div className="pt-2">
        <div className="flex justify-between items-center container">
          <Logo />
          <div className="flex flex-col items-end gap-2">
            <div className="font-bold flex items-center gap-2 text-black-line">
              <Link href="">Certificate Retrieval</Link>
              <div className="h-6 w-[1px] bg-black-line"></div>
              <Link href="">Contact</Link>
              <div className="h-6 w-[1px] bg-black-line"></div>
              <Link href="">About</Link>
            </div>
            <Link href="/">
              <div className="flex gap-2 py-1 items-center bg-primary rounded text-white font-bold text-center w-fit px-3">
                <span>
                  <Phone size={20} />
                </span>
                <span>080-234-4321</span>
              </div>
            </Link>
          </div>
        </div>
        <nav className=" bg-primary mt-6">
          <div className=" flex justify-center gap4 text-white container items-center font-semibold">
            <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
              <Link
                href="/"
                className="flex w-full items-end justify-center gap-1"
              >
                <span>Products</span>
                <ChevronDown size={20} />{" "}
              </Link>
              <Category style="top-10 left-0 dropDown" />
            </div>

            <div className="h-10 w-[1px]  bg-neutral-line"></div>

            <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
              <Link
                href="/"
                className="flex w-full items-end justify-center gap-1"
              >
                <span>Caliberation</span>
                <ChevronDown size={20} />{" "}
              </Link>
              <Category style="top-10 left-0 dropDown" />
            </div>

            <div className="h-10  w-[1px] bg-neutral-line"></div>

            <div className="items w-1/4 py-2 relative text-center hover:bg-primary-hover duration-150">
              <Link
                href="/"
                className="flex w-full items-end justify-center gap-1"
              >
                <span>Services</span>
                <ChevronDown size={20} />{" "}
              </Link>
              <Category style="top-10 right-0 dropDown" />
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
              <Category style="top-10 right-0 dropDown" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
