import React from "react";
import AdminVerticalMenu from "@/components/admin/AdminVerticalMenu";
import Dashboard from "@/components/admin/Dashboard";
import Account from "@/components/shared/Account";
import Shopboard from "@/components/admin/Shopboard";
import { getServerSession } from "next-auth";
import { isAdminRole } from "@/utils/server/isAdminRole";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { tab: string; category: string; sortBy: string; page: string };
}) => {
  const { tab } = searchParams;
  const session = await getServerSession();
  let isAdmin = false;
  if (session?.user?.name) isAdmin = await isAdminRole(session?.user?.name);

  if (!isAdmin) return <p className="padding-container">Admin required</p>;
  if (isAdmin)
    return (
      <>
        <section className="padding-container gap-5">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:pt-20">
              <AdminVerticalMenu />
            </div>

            <div className=" w-full rounded-md bg-accent">
              {tab === "dashboard" && <Dashboard />}
              {tab === "shopboard" && <Shopboard searchParams={searchParams} />}
              {tab === "account" && <Account />}
            </div>
          </div>
        </section>
      </>
    );
};

export default AdminPage;
