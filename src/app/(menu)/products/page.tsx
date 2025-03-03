import ProductsLayout from "@/components/layouts/ProductsLayout";
import PageLoading from "@/components/ui/PageLoading";
import React from "react";

export default function Page() {
  return (
    <ProductsLayout>
      <PageLoading />
    </ProductsLayout>
  );
}
