"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  return (
    <div>
      <Button onClick={() => signIn()}>Login</Button>
    </div>
  );
};

export default LoginButton;
