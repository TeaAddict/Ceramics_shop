import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AdminButton = () => {
  return (
    <div>
      <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </div>
  );
};

export default AdminButton;
