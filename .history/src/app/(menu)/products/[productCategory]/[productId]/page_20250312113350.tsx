/* eslint-disable @next/next/no-img-element */
"use client";
import PageLoading from "@/components/ui/PageLoading";
import { useGetProductsById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { productId } = useParams();
  const { data, isLoading } = useGetProductsById(productId as string);

  console.log(data, productId);

  return (
    <div className="min-h-[70vh]">
      {isLoading ? (
        <PageLoading />
      ) : (
        <div className="container">
          <div className="min-h-[50vh] bg-green-400">
            <div>
              <img src={data?.product_media[0]} alt="" className="" />
            </div>
            <div>hello</div>
          </div>
        </div>
      )}
    </div>
  );
}
