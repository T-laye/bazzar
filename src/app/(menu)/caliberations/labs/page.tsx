"use client";
import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import LabCard from "@/components/ui/lab";
import { CaliberationContent } from "@/utilities/Contents";
import React from "react";

export default function Page() {
  return (
    <CaliberationLayout title="Our Caliberation Labs" >
      <h1 className="text-[36px] mb-[10px] font-medium text-[#000000]">
        Our Calibration Labs
      </h1>
      <p className="text-[14px] text-[#000000] font-medium mb-[10px]">
        Both our Dallas and our Houston Calibration Labs offer on-site, in
        house, depot and ship-in calibrations as well as local pick-up and
        delivery services. In addition NSM covers the entire United States,
        Puerto Rico and the Dominican Republic for force measurement and
        materials testing system calibrations.
      </p>
      <p className="mb-[10px] text-[14px] text-[#000000] font-medium">
        Both of our Calibration Labs also offer ISO/IEC 17025:2017 and ANSI Z540
        accredited calibrations on a wide variety of metrology equipment, scales
        and other weighing and measurement devices.
      </p>
      <div>
        {CaliberationContent.map((p,i)=>{
        return <LabCard key={i} image={p.image} title={p.title} text={p.text} />
        })}
      </div>
    </CaliberationLayout>
  );
}
