import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  message?: string;
}>) {
  return <div className="">{children}</div>;
}
