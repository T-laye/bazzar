import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
