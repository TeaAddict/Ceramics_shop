"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative">
      <Image
        alt="Hero bg"
        src="/assets/hero2.png"
        className="object-cover bg-center bg-no-repeat"
        sizes="100vw"
        fill
      />

      <div className="relative bg-white/80 md:bg-white/0">
        <div className="absolute inset-0 md:bg-gradient-to-r md:from-white" />

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-2xl text-start">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Discover the Elegance of
              <strong className="block font-extrabold text-orange-400">
                {" "}
                Handmade Ceramics.{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Whether you&apos;re looking for a statement piece or a thoughtful
              gift, you&apos;ll find it here.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Button
                size="lg"
                onClick={() => {
                  router.push("/shop");
                }}
              >
                Get Started
              </Button>

              <Button
                onClick={() => router.push("/about")}
                variant="secondary"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
