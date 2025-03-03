"use client";
import React, { FC } from "react";

interface CalProps {
  children: React.ReactNode;
  title?: string;
}

const ProductsLayout: FC<CalProps> = ({ children, title }) => {
  return (
    <div className="pt-5 pb-20">
      <div className="container">
        <div
          className="flex items-end min-h-[20vh]"
          style={{
            backgroundImage: `url('/lab_equipment.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-[#ffffff90] text-primary font-medium text-xl px-2 py-0.5 sm:text-3xl mb-2 w-full backdrop-blur">
            {title || "All Products"}
          </div>
        </div>
        <div className="min-h-[60vh] relative w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProductsLayout;
