"use client";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="padding-container">
      <CustomReturnMessage text="Something went wrong!">
        <Button onClick={() => reset()}>Try again</Button>
      </CustomReturnMessage>
    </div>
  );
}
