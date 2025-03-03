"use client";
import { caliberationsContents } from "@/utilities/Contents";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface CalProps {
  children: React.ReactNode;
}

const CaliberationLayout: FC<CalProps> = ({ children }) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="pt-5 pb-20">
      <div className="container">
        <div
          className="flex items-end min-h-[20vh]"
          style={{
            backgroundImage: `url('/lab_equipment.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-[#ffffff90] text-primary font-medium text-xl px-2 py-0.5 sm:text-3xl mb-2 w-full backdrop-blur">
            WHAT WE CALIBERATE
          </div>
        </div>
        <div className="flex mt-5 gap-4">
          <nav className="w-1/4 max-lg:hidden">
            <h3 className="text-primary text-2xl">
              Metrology <br /> Caliberation Services
            </h3>
            <div className="mt-2">
              {caliberationsContents.map((c, i) => (
                <div
                  key={i}
                  className={`py-3 md:text-xl border-b  hover:text-primary-pressed duration-150 hover:border-primary-pressed ${
                    // pathname.startsWith(c.route || "")
                    pathname === c.route
                      ? "border-primary text-primary"
                      : "text-black-line border-black-light-bg"
                  }  `}
                >
                  <Link href={c.route || ""} className=" ">
                    {c.title}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
          <div className="bg-green-400 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CaliberationLayout;
