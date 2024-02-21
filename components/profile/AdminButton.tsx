import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AdminButton = () => {
  return (
    <Link href={"/admin"}>
      <Button>Admin</Button>
    </Link>
  );
};

export default AdminButton;
