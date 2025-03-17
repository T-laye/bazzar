import Header from "@/components/Header";
import AuthProvider from "@/providers/AuthProvider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Header />
      <div>{children}</div>
    </AuthProvider>
  );
}
