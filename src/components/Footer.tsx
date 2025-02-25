import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black-base-bg min-h-[15vh] pt-3 max-lg:pb-10 mt-10 border-t-2 border-primary ">
      <div className="container">
        <div className="flex justify-between max-lg:flex-col max-lg:items-center gap-5">
          <div className="flex gap-5 max-lg:flex-col max-lg:items-center">
            <Logo css="h-14" />
            <div className="flex flex-col gap-3 max-lg:items-center">
              <nav className="pt-2">
                <div className="font-bold flex-wrap max-lg:justify-center flex items-center gap-3 text-black-line">
                  <Link href="">Home</Link>
                  <div className="h-6 w-[1px] bg-black-line"></div>
                  <Link href="">Certificate Retrieval</Link>
                  <div className="h-6 w-[1px] bg-black-line"></div>
                  <Link href="">Contact</Link>
                  <div className="h-6 w-[1px] bg-black-line"></div>
                  <Link href="">About</Link>
                  <div className="h-6 w-[1px] bg-black-line"></div>
                  <Link href="">ACCREDITATION</Link>
                </div>
              </nav>
              <p className="text-xs max-w-md max-lg:text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi
                asperiores deserunt, quasi velit eligendi magni aliquam ipsam
                ipsum placeat.
              </p>
            </div>
          </div>
          <div className="flex gap-5 pt-2">
            <div>
              <Linkedin />
            </div>
            <div>
              <Linkedin />
            </div>
            <div>
              <Linkedin />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
