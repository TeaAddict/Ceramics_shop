"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.back();
        }}
        variant={"secondary"}
        className="gap-1"
      >
        <IoMdArrowBack />
        Go back
      </Button>
    </div>
  );
};

export default BackButton;
