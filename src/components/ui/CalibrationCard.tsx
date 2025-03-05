import { caliberationsContents } from "@/utilities/Contents";
import Image from "next/image";
import React, { FC } from "react";

interface CaliberationContents {
  title?: string;
  icon?: string;
  description?: string;
}

const CalibrationCard: FC<CaliberationContents> = ({ title, icon, description }) => {
  return (
    <div className="group cursor-pointer">
      {/* Card Container */}
      <div className="border border-[#666] mb-6 [border-radius:30px_0_30px_0] flex flex-row md:flex-row lg:flex-col items-center text-center w-full h-full md:w-full lg:w-[284px] md:h-full lg:h-[215px] p-6 group-hover:border-black group-hover:bg-[#eeeeee]">
        {/* Image */}
        <div className="mb-4 lg:mb-2 flex justify-center">
          <Image
            src={icon || "/box.png"}
            alt={title || "Calibration"}
            width={50}
            height={50}
            priority
            className="w-[70px] h-[70px]"
          />
        </div>
        {/* Title & Description */}
        <div className="text-left lg:text-center">
          <h3 className="text-black group-hover:text-black font-bold text-[24px]">{title}</h3>
          <p className="text-[14px] text-[#999] mt-2 group-hover:text-black">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CalibrationCard;