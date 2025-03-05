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
    <div className="group cursor-pointer w-full">
      {/* Card Container */}
      <div className="border group-hover:border-[#000] border-[#eeeeee] mb-6 [border-radius:30px_0_30px_0] text-center w-full h-[92px] md:h-[92px] sm:h-[195px]  lg:h-[92px] group-hover:border-black group-hover:bg-[#eeeeee] flex items-center justify-center flex-row md:flex-row sm:flex-col lg:flex-row">
        {/* Image */}
        <div className="flex items-center justify-center w-[30%]">
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
        <div className="text-start md:text-start sm:text-center lg:text-start w-[70%]">
          <h3 className="text-black group-hover:text-black font-bold text-[24px]">{title}</h3>
          <p className="text-[14px] text-[#999] group-hover:text-black font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CalibrationCard;