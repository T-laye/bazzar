import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import CaliberationCard from "@/components/ui/CalibrationCard";
import { CaliberationContents } from "@/utilities/Contents";
import React from "react";

export default function Page() {
  return(
  <CaliberationLayout>
   <p className="mb-[10px]">Nicol Scales & Measurement has climate-controlled calibration laboratories located in Dallas and Houston, and our team of technicians have an average of 15 years of experience to handle your calibration needs. Most equipment calibrations can also be performed on-site at your location if you prefer.</p>
   <p>NSM offers ISO/IEC 17025:2017 accredited and NIST traceable calibrations depending upon the equipment and customer needs, and customers can access our password protected on-line calibration certificate system as well.</p>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
    {
      CaliberationContents.map((card, index) => {
        return <CaliberationCard title={card.title} icon={card.image} description={card.description} key={index} />;
      })
    }
   </div>
  </CaliberationLayout>
  ) 
}
