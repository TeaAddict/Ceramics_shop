import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileButton = ({
  image,
  name,
  route,
}: {
  image: string;
  name: string;
  route: string;
}) => {
  return (
    <Link href={route} className="flex items-center gap-2">
      <p>{name}</p>
      <div className="relative w-14 aspect-square">
        <Image
          alt="profile_icon"
          src={image}
          fill
          className="object-cover rounded-full"
        />
      </div>
    </Link>
  );
};

export default ProfileButton;
