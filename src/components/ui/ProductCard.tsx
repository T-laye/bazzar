import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Button from "./Button";

interface Props {
  title?: string;
  image?: string;
  route?: string;
}

const ProductCard: FC<Props> = ({  image, route }) => {
  return (
    <Link
      href={route || ""}
      className="min-h-80  w-full rounded overflow-hidden hover:border-primary border-2 border-white shadow duration-150 cursor-pointer"
    >
      <div className="w-full h-3/4 ">
        <Image
          alt="image"
          // src="/Loaded-Platform-Left-Side-Included-1-scaled.jpg"
          src={image || "/Loaded-Platform-Left-Side-Included-1-scaled.jpg"}
          height={500}
          width={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" flex h-1/4 justify-between px-2 items-center text-sm bggreen-400">
        {/* {title} */}
        <div className="">
          <h4 className="font-bold text-lg line-clamp-1 ">Project</h4>
          <p className="text-lg font-bold text-primary">N300,000</p>
        </div>
        <Button style="primary" type="button" css="">
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
