import React, { FC } from "react";

interface CategoryProps {
  style?: string;
  children: React.ReactNode;
}

const Category: FC<CategoryProps> = ({ style, children }) => {
  return (
    <div
      className={` ${style} absolute  text-black-secondary-bg bg-white   shadow rounded p-4 z-10 `}
    >
      <div
        className={`  grid sm:grid-cols-3 lg:grid-cols-4 gap-4 hide-scroll mx-auto  w-[520px] overflow-y-auto lg:w-[720px] max-h-[520px] `}
      >
        {children}
      </div>
    </div>
  );
};

export default Category;
