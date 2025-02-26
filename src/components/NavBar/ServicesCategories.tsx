import React from "react";
import Category from "../Categories";
import CategoryCard from "../ui/CategoryCard";
import { servicesContents } from "@/utilities/Contents";

const ServicesCategories = () => {
  return (
    <Category style="top-10 -right-32 dropDown place-items-center ">
      {servicesContents.map((p, i) => (
        <CategoryCard key={i} title={p.title} image={p.img} />
      ))}
    </Category>
  );
};

export default ServicesCategories;
