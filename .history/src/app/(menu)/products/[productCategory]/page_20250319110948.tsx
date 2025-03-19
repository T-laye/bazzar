"use client";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import PageLoading from "@/components/ui/PageLoading";
import ProductCard from "@/components/ui/ProductCard";
import { useGetProductsByCategory } from "@/hooks/useProducts";
import { Product } from "@/types";
import { productIdRoute } from "@/utilities/Routes";
import { useParams } from "next/navigation";
// import { cartService } from "@/hooks/useCart";

export default function Page() {
  const { productCategory } = useParams();
  const { data, isLoading } = useGetProductsByCategory(
    productCategory as string
  );

  // console.log(data, productCategory);
  // const addToCart = cartServic

  return (
    <ProductsLayout
      title={decodeURIComponent(productCategory as string).toUpperCase()}
    >
      {isLoading ? (
        <PageLoading />
      ) : (
        <div className="grid min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4  xl:gridcols-4 gap-10 mt-10 ">
          {data?.length === 0 ? (
            <div className="text-xl font-semibold">No Products Found</div>
          ) : (
            data?.map((p: Product, i: number) => (
              <ProductCard
                // category={category}
                
                key={i}
                product={p._id}
                quantity={1}
                title={p.product_name}
                price={p.pricing.unit_price}
                image={p.product_media[0]}
                route={productIdRoute(productCategory as string, p._id)}
              />
              // <ProductCard />
            ))
          )}

          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
          {/* <ProductCard /> */}
          {/* <ProductCard /> */}
        </div>
      )}
    </ProductsLayout>
  );
}
