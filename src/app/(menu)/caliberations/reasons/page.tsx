import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import ReasonsCard from "@/components/ui/ReasonsCard";
import { ReasonsContent, ReasonsReadMore } from "@/utilities/Contents";
import React from "react";

export default function Page() {
  return (
    <CaliberationLayout title="Reasons to Caliberate">
      <h1 className="text-[36px] font-medium mb-[10px]">
        Reasons to Calibrate
      </h1>
      <p className="text-[14px] text-[#333333] font-medium mb-[10px]">
        No matter what kind of weighing or measurement equipment you are using,
        routine calibration is very important. Here are just a few reasons to
        calibrate your weighing and measurement equipment:
      </p>
      <ul className="px-8 list-disc mb-[10px]">
        {ReasonsContent.map((p, i) => {
          return (
            <li key={i} className="text-[14px] text-[#333333] font-medium">
              {p.description}
            </li>
          );
        })}
      </ul>
      <p className="text-[14px] text-[#333333] font-medium">
        Today’s weighing and measurement equipment is more accurate and
        sensitive than in years past. Routine calibration services and general
        preventative maintenance ensure that you save money and minimize
        downtime.
      </p>
      <div className="w-full">
        <div className="">
          {
            ReasonsReadMore.map((p,i)=>{
             return <ReasonsCard key={i} image={p.image} text={p.text} title={p.title} />
            })
          }
        </div>
      </div>
    </CaliberationLayout>
  );
}
