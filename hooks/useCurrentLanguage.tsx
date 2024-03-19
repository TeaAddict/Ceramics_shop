import {
  LANGUAGES,
  Languages,
} from "@/components/shared/header/LanguageButton";
import { usePathname } from "next/navigation";

const useCurrentLanguage = (languages: Languages[] = LANGUAGES) => {
  const path = usePathname();
  const { countryCode } =
    languages.find((val) => path.includes(val.countryCode)) ?? languages[0];
  return countryCode;
};

export default useCurrentLanguage;
