import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Program() {
  // Array of image details for easier mapping
  const imageDetails = [
    { 
      src: "/weighing.jpg", 
      alt: "Weighing Equipment", 
      title: "Weighing Solutions" 
    },
    { 
      src: "/force-materials-hero.jpg", 
      alt: "Force Materials", 
      title: "Force & Materials Testing" 
    },
    { 
      src: "/services-repair-1.jpg", 
      alt: "Repair Services", 
      title: "Repair & Calibration Services" 
    }
  ];

  return (
    <CaliberationLayout>
      <h1 className="text-[36px] font-semibold leading-[1.1] mb-[10px]">
        Online Calibration Certificates
      </h1>
      <p className="text-[14px] font-normal mb-[10px]">
        <span className="font-semibold">CertFlo</span> is NSM's custom and
        completely paperless calibration management and instrument tracking
        software. 24/7 Access to CertFlo is included for our customers who have
        signed EasyCal Calibration Agreements. Certificates are PDF Files and
        can be printed out for your records or retrieved for online viewing at
        any time.
      </p>
      <p className="text-[14px] font-normal mb-[10px]">
        Easy Cal customers can access their calibration certificates, their
        history of calibrations and a master lists of assets supported by NSM.
        They can also track the dates in which their equipment is due to be
        serviced.
      </p>
      <p className="text-[14px] font-normal mb-[10px]">
        Batch download/printing capability is now available for all users. The
        equipment search functionality has been updated with additional filters,
        making it easier to locate specific assets. Let us know what you think
        about these changes and what else you would like to see in CertFlo by{" "}
        <span className="text-primary hover:underline font-semibold">
          {" "}
          contacting us.
        </span>
      </p>
      <div className="flex flex-col md:flex-col lg:flex-row items-start justify-start gap-x-3">
        <Button type="button" style="google">
          Learn more about CertFlo
        </Button>
        <Button type="button" style="google">
          Contact us with any questions
        </Button>
      </div>
      <div className="my-[20px]">
        <Link
          href="/"
          className="text-primary text-[14px] hover:underline mb-[10px]"
        >
          Click here to see a sample online certificate.
        </Link>
        <p className="text-[14px]">
          In addition to calibrations, we also sell and repair a wide variety of
          weighing, testing and inspection equipment. We also{" "}
          <span className="text-primary hover:underline">
            stock some items{" "}
          </span>{" "}
          in our 4 warehouses for quick delivery.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-4">
        {imageDetails.map((image, index) => (
          <div 
            key={index} 
            className="w-full h-[117px] md:h-[192px] lg:h-[257px] relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4"
            >
              <span className="text-[clamp(1rem,4vw,1.5rem)] font-bold leading-tight text-center text-white">
                {image.title}
              </span>
            </div>
            <Image 
              src={image.src} 
              alt={image.alt} 
              width={500} 
              height={500} 
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          </div>
        ))}
      </div>
    </CaliberationLayout>
  );
}