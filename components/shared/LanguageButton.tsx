"use client";
import React, { createElement, useState } from "react";
import { FlagComponent, LT, US } from "country-flag-icons/react/3x2";

export const LANGUAGES = [
  { countryCode: "lt", icon: LT },
  {
    countryCode: "en",
    icon: US,
  },
];

type Languages = {
  countryCode: string;
  icon: FlagComponent;
}[];

const LanguageButton = () => {
  const [language, setLanguage] = useState(LANGUAGES[0]);

  return (
    <div className="relative group w-14 cursor-pointer">
      <div className="border-2 rounded-md  p-1 bg-background">
        {createElement(language.icon)}
      </div>
      <div className="absolute hidden top-full w-full group-hover:block border-2 rounded-md bg-background">
        {LANGUAGES.map((val) => (
          <div
            className="hover:bg-gray-300 justify-center flex p-2"
            key={val.countryCode}
            onClick={() => setLanguage(val)}
          >
            {createElement(val.icon)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageButton;
