import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import ForceCard from "@/components/ui/ForceCard";
import { Flexible } from "@/utilities/Contents";
import React from "react";


export default function Force() {
    return (
        <CaliberationLayout>
            <h1 className="text-[36px] mb-[10px]">Flexible Calibration Capabilities</h1>
            <p className="text-[14px] font-normal">At Nicol Scales & Measurement we know that one size does not fit all. Our goal is to offer the most flexible calibration capabilities in the industry, therefore we are consistently expanding our calibration capabilities.</p>
            <div className="w-full">
        <div className="">
          {
            Flexible.map((p,i)=>{
             return <ForceCard key={i} image={p.image} text={p.text} title={p.title} />
            })
          }
        </div>
      </div>
        </CaliberationLayout>
    )
}