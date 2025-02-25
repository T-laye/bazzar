import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface LogoProps {
  css?: string;
}

const Logo: FC<LogoProps> = ({ css = "h-[90px]" }) => {
  return (
    <Link href="/">
      <div className={` ${css}  -ml-2`}>
        <Image
          height={100}
          width={100}
          className="w-full h-full object-contain"
          src="/logo.svg"
          alt="logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
