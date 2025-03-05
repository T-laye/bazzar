import CaliberationLayout from "@/components/layouts/CaliberationLayout";
import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CaContent, CaContent2 } from "@/utilities/Contents";

export default function capability() {
  return (
    <CaliberationLayout>
      <h1 className="text-[36px] mb-[10px] text-[#000000] font-semibold leading-none">
        ISO/IEC 17025:2017 Force Gauge Calibration
      </h1>
      <p className="font-normal text-[14px] mb-[10px]">
        Most manufacturers recommend handheld force gauges to be calibrated at
        least once every 12 months. Not every calibration lab, however, has the
        correct standards or procedures to calibrate force gauges effectively
        and efficiently. That’s why we created a quick and easy mail in force
        gauge calibration program. Here’s how it works:
      </p>
      <ul className="px-8 list-disc mb-[10px]">
        {CaContent.map((p, i) => {
          return (
            <li key={i} className="text-[14px]">
              {p.text}
            </li>
          );
        })}
      </ul>
      <p className="text-center mb-[10px] max-w-[200px] mx-auto text-[14px]">
        Nicol Scales & Measurement 7239 Envoy Court Dallas, TX 75247
      </p>
      <p className="text-center mb-[10px] max-w-[200px] mx-auto text-[14px]">
        Nicol Scales & Measurement 14850 Woodman Drive Suites B-135 and B-120
        Houston, TX 77073
      </p>
      <p className="list-disc text-[14px] mb-[10px]">
        Expect your force gauge to be calibrated and on its way back to you
        within 5 working days (or faster if you need expedited service.)
      </p>
      <p className="text-[14px] mb-[10px]">
        At NSM, we want to make your calibrations easy by offering the following
        services:
      </p>
      <ul className="px-8 list-disc mb-[10px]">
        {CaContent2.map((p, i) => {
          return (
            <li key={i} className="text-[14px]">
              {p.text}
            </li>
          );
        })}
      </ul>
      <p className="text-[14px] mb-[10px]">
        <span className="hover:underline text-primary  font-semibold">CertFlo</span> is our new custom, completely paperless calibration management
        and instrument tracking software. 24/7 Access to CertFlo is included for
        customers with signed EasyCal Calibration Agreements. Certificates are
        PDF Files that can be printed out for your records or retrieved for
        online viewing at any time.
      </p>
      <Link href="/" className="text-primary hover:underline text-[14px]">Click here to see a sample force gauge calibration certificate.</Link>
    </CaliberationLayout>
  );
}
