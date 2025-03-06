import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

const ExpandSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0 ), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4) 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex justify-between items-center rounded-lg min-h-[45vh] flex-col gap-10 md:flex-row overflow-hidden py-10 px-5 md:px-10"
        >
          <div className="flex-1 text-white max-md:flex max-md:flex-col max-md:items-center  w-full">
            <h3 className="text-3xl lg:text-4xl leading-8 7lg:leading-[52px] max-md:text-center max-md:max-w-lg">
              <span className="text-2xl lg:text-3xl">Expanded Dimensional</span>{" "}
              <br className="max-md:hidden" /> Calibration Capabilities{" "}
              <br className="max-md:hidden" />
              <span className="text-2xl lg:text-3xl">
                With our brand new ULM
              </span>
            </h3>
            <p className=" lg:text-lg mt-5 max-md:max-w-xl max-w-[350px] max-md:text-center">
              Learn more about our new ISO/IEC17025:2017 accredited dimensional
              calibration capabilities with industry leading turnaround times
            </p>
            <Button style="primary" css="mt-7" type="button">
              Read More
            </Button>
          </div>

          <div className="flex-1">
            <div className="overflow-hidden rounded-lg">
              <Image
                width={500}
                height={500}
                src="/Loaded-Platform-Left-Side-Included-1-scaled.jpg"
                alt="image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandSection;
