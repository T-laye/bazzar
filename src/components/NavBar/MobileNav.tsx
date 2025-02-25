"use client";
import React from "react";
import Logo from "../ui/Logo";
import { AlignJustify } from "lucide-react";
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
        } fixed h-screen bg-primary top-0 left-0 w-2/3 duration-150`}
      >
        hello
      </div>
    </nav>
  );
};

export default MobileNav;
