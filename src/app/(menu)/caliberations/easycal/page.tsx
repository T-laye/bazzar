import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import EasyCard from "@/components/ui/easyCard";
import { EasyContent } from "@/utilities/Contents";
import Link from "next/link";
import React from "react";

export default function Progam() {
  return (
    <CaliberationLayout title="EasyCal Programs">
      <h1 className="text-[36px] font-medium mb-[10px] text-[#000000] leading-tight">Our EasyCal Program</h1>
      <p className="text-[14px] text-[#333333] leading-1 mb-[10px] font-medium">
        EasyCal is a comprehensive calibration program that assures all your
        measurement & test equipment calibrations are managed and executed to
        national and international standards of operation. Our goal is to make
        your calibration process as easy as possible. The EasyCal program is
        customizable to meet each specific customer’s needs including multiple
        calibration location options. We offer on-site, in climate-controlled
        lab, mail-in depot and embedded calibration services to all customers.
      </p>
      <Link href="/" className="text-primary hover:underline mb-[10px] font-medium">Download our EasyCal Brochure</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10">
        {EasyContent.map((p,i)=>{
          return <EasyCard key={i} image={p.image} title={p.title} desc={p.desc} text={p.text}   />
        })
        }
      </div>
    </CaliberationLayout>
  );
}
