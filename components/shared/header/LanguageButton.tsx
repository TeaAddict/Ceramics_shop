"use client";
import React, { createElement, useState } from "react";
import { FlagComponent, LT, GB } from "country-flag-icons/react/3x2";
import { usePathname, useRouter } from "next/navigation";

export const LANGUAGES = [
  { countryCode: "lt", icon: LT },
  { countryCode: "en", icon: GB },
];

export type Languages = {
  countryCode: string;
  icon: FlagComponent;
};

const LanguageButton = ({ lng }: { lng: string }) => {
  const initLanguage = LANGUAGES.find((val) => val.countryCode === lng);
  const [language, setLanguage] = useState(initLanguage ?? LANGUAGES[0]);
  const router = useRouter();
  const pathname = usePathname();

  function handleChangeLanguage(lang: Languages) {
    setLanguage(lang);
    const langObj =
      LANGUAGES.find((val) => pathname.includes(val.countryCode)) ??
      LANGUAGES[0];
    const newPath = pathname.replace(langObj?.countryCode, lang.countryCode);
    router.replace(newPath);
  }

  return (
    <div>
      <div className="relative group w-14 cursor-pointer">
        <div className="border-2 rounded-md  p-1 bg-background">
          {createElement(language.icon)}
        </div>
        <div className="absolute hidden top-full w-full group-hover:block border-2 rounded-md bg-white">
          {LANGUAGES.map((val) => (
            <div
              className="hover:bg-gray-300 justify-center flex p-2"
              key={val.countryCode}
              onClick={() => handleChangeLanguage(val)}
            >
              {createElement(val.icon)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageButton;
