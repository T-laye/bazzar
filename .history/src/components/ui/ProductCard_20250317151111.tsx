/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
'use client'
import Link from "next/link";
import React, { FC, useContext } from "react";
import Button from "./Button";
import { capitalizeWords } from "@/utilities/Helpers";
import { cartService } from "@/hooks/useCart";
import { AppContext, IContext } from "@/providers/Context";


interface Props {
  title?: string;
  image?: string;
  price?: number;
  route?: string;
  quantity?: number;
  product?:string
}



const ProductCard: FC<Props> = ({ title, image, route, price,quantity = 0,product='s' }) => {
  const {setCartItems} = useContext(AppContext) as IContext
  return (
    <div className="min-h-80  w-full rounded overflow-hidden hover:border-primary border-2 border-white shadow duration-150 cursor-pointer">
      <div className="w-full h-3/4 ">
        <Link href={route || ""}>
          <img
            alt="image"
            // src="/Loaded-Platform-Left-Side-Included-1-scaled.jpg"
            src={image || "/Loaded-Platform-Left-Side-Included-1-scaled.jpg"}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className=" flex h-1/4 justify-between px-2 items-center text-sm bggreen-400">
        {/* {title} */}
        <div className="">
          <h4 className="font-bold text-lg line-clamp-1 ">
            {capitalizeWords(title ?? "")}
          </h4>
          <p className="text-lg font-bold text-primary">
            ₦{price?.toLocaleString("en-US")}
          </p>
        </div>
        <Button style="primary" type="button" css="" fn={()=>{
          cartService.addItemToCart({product,name:title as string,unit_price:price as number,quantity,picture:image as string})
          setCartItems([...cartService.loadCart()])
          }}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
