import React from "react";

export default function AuthPageLayout({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  return (
    <div className="flex h-screen ">
      <div className="flex-1 px-4 hide-scroll sm:px-8 relative  overflow-y-auto">
        <div className="py-20 flex justify-center min-h-full md:items-center">
          {children}
        </div>
      </div>
      <div className="bg-primary max-lg:hidden flex justify-center items-center flex-1 px-10">
        <div className="text-white bggreen-300 wfull">
          <h2 className="text-6xl font-bold">Welcome!</h2>
          <p className="text-2xl font-medium mt-5">{message}</p>
        </div>
      </div>
    </div>
  );
}
