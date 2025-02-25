import React from "react";

const CategoryCard = () => {
  return (
    <div className=" border border-black-light-bg min-w-[192px] h-[312px] lg:h-[445px] w-full rounded overflow-hidden">
      <div className="h-2/3 overflow-hidden bg-red-300  ">
        <div
          className="h-full w-full pb-8 px-2 hover:scale-105 duration-150 flex flex-col items-center justify-end  text-white font-bold text-lg"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) 70%), url('/weighing.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span>Hello world</span>
        </div>
      </div>

      <div className="bg-secondary-background h-1/3 p-4 text-sm text-center line-clamp-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, magnam.
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  return (
    <section>
      <div className="container">
        <div className=" grid grid-cols-1 gap-4 mt-5 max-sm:pt-5 min-[500px]:grid-cols-2 min-[850px]:grid-cols-4">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
