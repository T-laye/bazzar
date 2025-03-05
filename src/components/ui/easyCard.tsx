import Image from "next/image";
import React, { FC } from "react";

interface EasyContent {
  title?: string;
  image?: string;
  text?: string;
  desc?: string;
}

const EasyCard: FC<EasyContent> = ({ title, image = "/default-image.png", desc, text }) => {
  return (
    <div className="flex items-center gap-6 flex-col md:flex-row py-[20px]">
      <div className="w-[100px] h-full flex items-start justify-center mb-4 md:mb-0 ">
        <Image 
          src={image} 
          width={100} 
          height={100} 
          alt="icons" 
          className="object-contain max-w-full max-h-full" 
        />
      </div>
      <div className="flex-1">
        <h1 className="text-[30px] font-semibold mb-2 text-[#444] leading-[1.1]">{title}</h1>
        <p className="text-sm text-[#444] mb-2">{text}</p>
        <p className="text-sm text-[#444]">{desc}</p>
      </div>
    </div>
  );
};

export default EasyCard;