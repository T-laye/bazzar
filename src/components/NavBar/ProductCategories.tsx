import React from "react";
import Category from "../Categories";
import CategoryCard from "../ui/CategoryCard";
import { productCategoriesContents } from "@/utilities/Contents";

const ProductCategories = () => {
  return (
    <Category style="top-10 left-0 dropDown place-items-center ">
      {productCategoriesContents.map((p, i) => (
        <CategoryCard key={i} title={p.title} image={p.img} route={p.route} />
      ))}
    </Category>
  );
};

export default ProductCategories;
