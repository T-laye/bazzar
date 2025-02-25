import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import { Phone } from "lucide-react";
import Navbar from "./NavBar/Navbar";
import MobileNav from "./NavBar/MobileNav";

const Header = () => {
  return (
    <header className="">
      <div className="pt-2">
        <div className="flex justify-between items-center container max-sm:hidden max-sm:flex-col max-sm:items-start">
          <Logo css="h-12 md:h-16 " />
          <div className="flex flex-col items-end gap-2 bgred-400 w-full ">
            <div className="font-bold flex items-center max-sm:justify-end flex-wrap gap-2 text-black-line bg-green500">
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
        <Navbar />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
