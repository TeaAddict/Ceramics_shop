"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const Hero = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "home");
  const router = useRouter();

  return (
    <section className="relative">
      <Image
        alt="Hero bg"
        src="/assets/hero2.png"
        className="object-cover bg-center bg-no-repeat"
        sizes="(max-width: 500px) 100px"
        fill
      />

      <div className="relative bg-white/80 md:bg-white/0">
        <div className="absolute inset-0 md:bg-gradient-to-r md:from-white" />

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-2xl text-start">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              {t("heading.h1_1")}
              <strong className="block font-extrabold text-orange-400">
                {t("heading.h1_2")}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              {t("heading.subheading")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Button
                size="lg"
                onClick={() => {
                  router.push("/shop");
                }}
              >
                {t("heading.button1")}
              </Button>

              <Button
                onClick={() => router.push("/about")}
                variant="secondary"
                size="lg"
              >
                {t("heading.button2")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
