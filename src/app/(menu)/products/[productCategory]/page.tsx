import ProductsLayout from "@/components/layouts/ProductsLayout";
import ProductCard from "@/components/ui/ProductCard";
import React from "react";

export default function Page() {
  return (
    <ProductsLayout>
      <div className="grid min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4  xl:gridcols-4 gap-10 mt-10 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        {/* <ProductCard /> */}
      </div>
    </ProductsLayout>
  );
}
