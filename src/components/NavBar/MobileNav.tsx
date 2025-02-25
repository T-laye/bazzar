"use client";
import React from "react";
import Logo from "../ui/Logo";
import { AlignJustify, ChevronDown } from "lucide-react";
import { useNavStore } from "@/store/NavStore";

const MobileNav = () => {
  const { closeNav, isNavOpen, openNav } = useNavStore();
  return (
    <nav className="sm:hidden flex justify-between items-center container fixed top-0 left-0 right-0 bg-white py-2 px-4 z-50">
      <Logo css="h-12" />
      <AlignJustify
        onClick={openNav}
        className="text-primary cursor-pointer"
        size={24}
      />

      <div
        onClick={closeNav}
        className={`  ${
          isNavOpen ? "translate-x-0" : "translate-x-[200%]"
        } fixed h-screen bg-[#ffffff60] backdrop-blur top-0 left-0 right-0 bottom-0 duration-150`}
      ></div>
      <div
        className={` ${
          isNavOpen ? "translate-x-0" : "-translate-x-[200%]"
        } pt-10 fixed flex flex-col items-start h-screen bg-white top-0 left-0 w-2/3 duration-150`}
      >
        <Logo css="h-12 px-2" />
        <div className="mt-10 w-full flex flex-col gap-[1px] text-white font-semibold">
          <div className="flex items-end justify-between bg-primary py-2 w-full px-2 ">
            <span>Products</span>
            <ChevronDown size={22} />
          </div>

          <div className="flex items-end justify-between bg-primary py-2 w-full px-2 ">
            <span>Caliberations</span>
            <ChevronDown size={22} />
          </div>

          <div className="flex items-end justify-between bg-primary py-2 w-full px-2 ">
            <span>Services</span>
            <ChevronDown size={22} />
          </div>

          <div className="flex items-end justify-between bg-primary py-2 w-full px-2 ">
            <span>Search</span>
            <ChevronDown size={22} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
