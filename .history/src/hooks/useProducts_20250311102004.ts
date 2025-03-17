import { axiosInstance } from "@/config/axios";
// import { useProductsCategory } from "@/store/Variables";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsByCategory = (category: string) => {
  //   const { category } = useProductsCategory(); // Ensure sensible defaults
  
//   console.log(category);
  const fetchProducts = async (category: string) => {
    const params = new URLSearchParams();

    if (category) params.append("category", category);


    //   const url = `/api/admin/space?${params.toString()}`;
    const url = `/products/by-category?${params.toString()}`;

    // console.log(url);
    const response = await axiosInstance.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category || ""),
  });
};

export const useGetProductsById = (productId: string) => {
  //   const { category } = useProductsCategory(); // Ensure sensible defaults
  
  console.log(productId);
  const fetchProduct = async (productId: string) => {
    const params = new URLSearchParams();

    if (productId) params.append("productId", productId);

    //   const url = `/api/admin/space?${params.toString()}`;
    const url = `/products/product?${params.toString()}`;

    console.log(url);
    const response = await axiosInstance.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId || ""),
  });
};
