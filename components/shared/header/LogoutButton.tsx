"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  return (
    <div>
      <Button
        onClick={() => {
          toast.promise(signOut({ callbackUrl: "/" }), {
            loading: "Logging out...",
            success: <b>Logged out successfully!</b>,
            error: <b>Could not logout.</b>,
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
