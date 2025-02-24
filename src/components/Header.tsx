import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="">
      <div className="">
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
        <nav className="py-3">
          <div className="bg-primary flex justify-center gap-4 text-white container items-center font-semibold">
            <Link href="">Products</Link>
            <div className="h-10 w-[1px] bg-neutral-line"></div>
            <Link href="">Caliberation</Link>
            <div className="h-10 w-[1px] bg-neutral-line"></div>
            <Link href="">Services</Link>
            <div className="h-10 w-[1px] bg-neutral-line"></div>
            <Link href="">Search</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
