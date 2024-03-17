"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const LoginButton = () => {
  return (
    <div>
      <Button
        onClick={() =>
          toast.promise(signIn(), {
            loading: "Logging in...",
            success: <b>Logged in!</b>,
            error: <b>Could not log in.</b>,
          })
        }
      >
        Login
      </Button>
    </div>
  );
};

export default LoginButton;
