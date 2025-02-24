import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Industry = () => {
  return (
    <div className="border flex py-4 px-2 flex-col items-center justify-center w-full">
      <GiForkKnifeSpoon className="text-[100px] text-primary hover:text-primary-hover" />
      <div className="text-center">Food & Beverage</div>
    </div>
  );
};

const IndustryServedSection = () => {
  return (
    <section>
      <div className="container">
        <div className="bg-red300 rounded-lg overflow-hidden border-l border-r border-b">
          <div className="bg-black-base-bg px-4 py-3 text-center text-lg">
            INDUSTRIES SERVED
          </div>
          <div className="min-h-52 grid max-[350px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-9">
            <Industry />
            <Industry />
            <Industry />
            <Industry />
            <Industry />
            <Industry />
            <Industry />
            <Industry />
            <Industry />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryServedSection;
