import AboutTxt from "@/components/aboutPage/AboutTxt";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="padding-container flex flex-col sm:flex-row md:gap-4 xl:gap-40">
      <div className="md:w-[50vw]">
        <AboutTxt />
      </div>
      <div className="relative w-[50vw] hidden md:block">
        <Image
          alt="about-img"
          src={"/assets/about3.jpg"}
          fill
          className="object-cover object-left"
        />
      </div>
    </div>
  );
};

export default AboutPage;
