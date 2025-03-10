"use client";
import { useProductsCategory } from "@/store/Variables";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  title?: string;
  image?: string;
  route?: string;
}

const CategoryCard: FC<Props> = ({ title, image, route }) => {
  const { setCategory } = useProductsCategory();

  const handleClick = () => {
    if (setCategory) {
      setCategory("hello");
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={route || ""}
      className="h-40 w-40 rounded overflow-hidden hover:border-primary border-2 duration-150 cursor-pointer"
    >
      <div className="w-full h-2/3">
        <Image
          alt="image"
          // src="/Loaded-Platform-Left-Side-Included-1-scaled.jpg"
          src={image || "/Loaded-Platform-Left-Side-Included-1-scaled.jpg"}
          height={500}
          width={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-black-base-bg h-1/3 flex justify-center px-2 items-center text-center  text-sm">
        {title}
      </div>
    </Link>
  );
};

export default CategoryCard;
