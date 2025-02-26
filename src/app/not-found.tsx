"use client";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const route = useRouter();

  return (
    <>
      <Header />
      <section className="pt-32 sm:pt-20">
        <div className="container mx-auto ">
          <div className="flex items-center flex-col justify-center">
            <h2 className="text-5xl font-extrabold">Oops!</h2>
            <div className="max-w-[280px] sm:max-w-[460px] h-[196px] sm:mt-20">
              <Image
                src="/not-found.svg"
                alt="404"
                height={500}
                width={500}
                className="h-full w-full object-contain"
              />
            </div>
            <h3 className="font-extrabold text-2xl sm:text-3xl mb-2 sm:mb-5 sm:mt-14">
              Something went wrong!
            </h3>
            <p className="text-sm sm:text-base">
              Sorry, We can&apos;t find the page you are looking for.
            </p>
            <Button
              style="primary"
              type="button"
              css="mt-7 w-full max-w-[320px]"
              fn={() => route.push("/")}
            >
              Go Back Home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
