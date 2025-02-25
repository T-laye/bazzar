import Image from "next/image";
import React from "react";

const CategoryCard = () => {
  return (
    <div className="h-48 w-40 rounded overflow-hidden">
      <div className="w-full h-2/3">
        <Image
          alt="image"
          src="/Loaded-Platform-Left-Side-Included-1-scaled.jpg"
          height={500}
          width={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-black-base-bg h-1/3 flex justify-center items-center text-center text-sm">
        Lorem ipsum dolor sit amet.
      </div>
    </div>
  );
};

export default CategoryCard;
