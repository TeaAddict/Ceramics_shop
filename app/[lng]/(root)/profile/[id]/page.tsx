import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AdminButton from "@/components/profile/AdminButton";
import Favourites from "@/components/profile/Favourites";
import BackButton from "@/components/shared/BackButton";
import { isAdminRole } from "@/utils/server/isAdminRole";
import { getServerSession } from "next-auth";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const isAdmin = await isAdminRole();

  if (id !== session?.user?.name)
    return (
      <div className="padding-container flex flex-col gap-5">
        <BackButton />
        <p>Unauthorized user</p>
      </div>
    );
  return (
    <div className="padding-container flex flex-col">
      <div className="flex justify-between">
        <h1>Profile</h1>
        {isAdmin && <AdminButton />}
      </div>
      <Favourites />
    </div>
  );
};

export default ProfilePage;
