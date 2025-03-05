import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import { SafetyContents } from "@/utilities/Contents";
import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <CaliberationLayout title="Safety">
      <h1 className="text-[36px] font-medium mt-[10px] mb-[20px]">Safety</h1>
      <p className="text-[14px] text-[#333333] mb-[10px] font-medium">
        In our industry it’s a matter of life and death. Period. Nicol Scales &
        Measurement is serious about safety. How safe is your current
        measurement service and calibration provider? You can rest assured that
        when we are on site at your location, safety is one of our primary
        goals.
      </p>
      <ul className="px-8 list-disc mb-[10px]">
        {SafetyContents.map((items, index) => {
          return (
            <li key={index} className="text-[14px] font-medium">
              {items.description}
            </li>
          );
        })}
      </ul>
      <p className="mb-[10px] font-medium">
        NSM is registered and qualified with the following third party sites
        that require said information in order to support their customers
        Compliance and Regulatory standards. This includes insurance
        certificates, written procedures and training documentation.
      </p>
      <div className="flex items-center justify-center w-full mb-[12px]">
        <div className="w-full h-full flex-1 text-[14px] font-medium">
          IsNet <br /> Avetta <br /> Browz <br /> DISN <br /> Textura <br />{" "}
          Contractor Compliance <br /> SAM C3 <br />
          C3 (Construction Career Collaborative)
        </div>
        <div className="w-full h-full flex-1 text-[14px] font-medium">
          Exostar <br /> PSC (Purchasing Services Co.) <br /> Appruv <br /> MSHA <br /> Oracle Engineering &
          Construction <br /> COUPA – order processing and invoicing <br /> Ariba- order
          processing and invoicing <br /> Tungsten Network – order processing and
          invoicing
        </div>
      </div>
      <div className="flex items-center justify-center  mx-auto max-w-[1200px] h-[68px]">
        <Image src="/Logos.png" width={500} height={500} alt="logos" className="object-contain w-full h-full" />
      </div>
    </CaliberationLayout>
  );
}
