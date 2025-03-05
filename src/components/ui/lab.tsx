import Image from "next/image";
import React, { FC, useState } from "react";

interface CaliberationContents {
  title?: string;
  image?: string;
  text?: string;
}

const LabCard: FC<CaliberationContents> = ({ title, image = "", text }) => {
  const [expanded, setExpanded] = useState(false);
  // Default text if none provided
  const displayText =
    text ||
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, asperiores!";

  // Truncate text for preview (approximate one line)
  const previewText = displayText.slice(0, 100) + "...";
  return (
    <div className="flex items-center flex-col gap-6 md:flex-row lg:flex-row justify-center w-full border-b-[1px] border-[#e0e0e0] py-8 hover:bg-[#f0f0f0] cursor-pointer">
      <div className="w-full md:w-[15%] lg:w-[15%] flex justify-center md:justify-start lg:justify-start mb-4 md:mb-0 lg:mb-0">
        {image && (
          <div className="h-[98px] rounded-[6px] shadow-2xl w-[150px] flex items-center justify-center">
            <Image
              src={image}
              alt={title || "Reason image"}
              width={150}
              height={98}
              className="w-full h-full rounded-[6px]"
            />
          </div>
        )}
      </div>
      <div className=" w-full md:w-[85%] lg:w-[85%]">
        <h1 className="text-[30px] font-medium leading-[1.1] mb-[5px] text-[#444]">
          {title || "Two"}
        </h1>
        <p className="text-[14px] text-[#444] font-medium">
          {expanded ? displayText : previewText}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary ml-1 hover:underline font-medium"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LabCard;
