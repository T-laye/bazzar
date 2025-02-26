"use client";

import { useToastStore } from "@/store/Variables";
import { Check, OctagonAlert, TriangleAlert, X } from "lucide-react";

const Toast = () => {
  const { message, visibility, type, hideToast } = useToastStore();

  return (
    <>
      {/* {visibility && ( */}
      <div
        className={`fixed z-[1000] top-5 right-0 left-0  flex items-center justify-end px-4 sm:px-8 gap-4 ${
          visibility
            ? "translate-x-0 duration-200"
            : "translate-x-[200%] duration-200"
        }`}
      >
        <div
          className={` border-[1.5px] ${
            type === "success"
              ? "bg-[#F3F9F7]  border-[#19966C]"
              : type === "error"
              ? "bg-[#FFF2F3] border-[#FF0318]"
              : "bg-[#FFF2F3] border-[#BCAC1B]"
          } text-center justify-between gap-2 items-top flex text-[#212529] py-2 px-2 max-w-[200px] w-full rounded`}
        >
          <div>
            {type === "success" && <Check className="text-[#19966C]" />}
            {type === "error" && <TriangleAlert className="text-[#FF0318]" />}
            {type === "warning" && <OctagonAlert className="text-[#BCAC1B]" />}
          </div>
          <div className="flex flex-col flex-1 items-start">
            <h4 className="font-semibold text-sm lg:text-base">
              {type === "error"
                ? "Error"
                : type === "success"
                ? "Success"
                : "Warning"}
            </h4>
            <p className="text-sm lg:text-base font-medium">{message}</p>
          </div>
          <X className="cursor-pointer" size={14} onClick={hideToast} />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Toast;
