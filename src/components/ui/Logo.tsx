import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="h-[90px] -ml-2">
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
