import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AdminButton from "@/components/profile/AdminButton";
import { Button } from "@/components/ui/button";
import { isAdminRole } from "@/utils/server/isAdminRole";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const isAdmin = await isAdminRole();

  if (id !== session?.user?.name)
    return (
      <div className="padding-container">
        <p>Unauthorized user</p>
      </div>
    );
  return (
    <div className="padding-container">
      <p>Profile</p>

      {isAdmin && <AdminButton />}
    </div>
  );
};

export default ProfilePage;
