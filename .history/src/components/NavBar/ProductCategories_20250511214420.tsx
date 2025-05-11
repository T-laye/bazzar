import React, { useState } from "react";
import Category from "../Categories";
import CategoryCard from "../ui/CategoryCard";
import { productCategoriesContents } from "@/utilities/Contents";
import Link from "next/link";

const ProductCategories = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll
    ? productCategoriesContents
    : productCategoriesContents.slice(0, 5);

  return (
    <Category style="top-10 left-0 dropDown place-items-center z-[777]">
      {visibleCategories.map((p, i) => (
        <CategoryCard key={i} title={p.title} image={p.img} route={p.route} />
      ))}

      {!showAll && productCategoriesContents.length > 5 && (
        <Link
          href="/categories"
          className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
          See More
        </Link>
      )}
    </Category>
  );
};

export default ProductCategories;
