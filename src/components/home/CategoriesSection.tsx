import React, { FC } from "react";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const CategoryCard: FC<Props> = ({ title, image, description }) => {
  return (
    <div className=" border border-black-light-bg min-w-[192px] h-[312px] lg:h-[445px] w-full rounded overflow-hidden">
      <div className="h-2/3 overflow-hidden bg-red-300  ">
        <div
          className="h-full w-full pb-8 px-2 hover:scale-105 duration-150 flex flex-col items-center justify-end  text-white font-bold text-xl  text-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) 70%), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span>{title?.toUpperCase()}</span>
        </div>
      </div>

      <div className="bg-secondary-background h-1/3 p-4 text-sm flex justify-center items-center ">
        <p className="text-center xl:text-lg line-clamp-4 lg:line-clamp-6">
          {description}
        </p>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const content = [
    {
      title: "Scales and Weighing",
      img: "/weighing.jpg",
      description:
        "Everything from a basic floor to an automated aircraft weighing system.",
    },
    {
      title: "Force Measurement & Material Testing",
      img: "/force-materials-hero.jpg",
      description: "From basic force measurement to advanced materials testing",
    },
    {
      title: "Metrology Caliberation Services",
      img: "/home-metro-cal.jpg",
      description:
        "Your single source caliberation provider - save time and money while meeting the latest international standards.",
    },
    {
      title: "Reapair, Maintenance and Specialty Services",
      img: "/services-repair-1.jpg",
      description:
        "Installation, repair, caliberation and many other services on everything that we sell.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className=" grid grid-cols-1 gap-4 mt-5 max-sm:pt-5 min-[500px]:grid-cols-2 min-[850px]:grid-cols-4">
          {content.map((p, i) => (
            <CategoryCard
              key={i}
              title={p.title}
              image={p.img}
              description={p.description}
            />
          ))}
          {/* <CategoryCard />
          <CategoryCard />
          <CategoryCard /> */}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
