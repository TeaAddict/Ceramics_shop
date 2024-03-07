import { getServerSession } from "next-auth";
import { isAdminRole } from "@/utils/server/isAdminRole";
import VerticalMenu from "@/components/shared/VerticalMenu";
import { ADMIN_MENU } from "@/constants";
import TabContent from "@/components/admin/TabContent";

export type SearchParams = {
  tab: string;
  category: string;
  sortBy: string;
  page: string;
};

const AdminPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getServerSession();
  let isAdmin = false;
  if (session?.user?.name) isAdmin = await isAdminRole(session?.user?.name);
  if (!isAdmin) return <p className="padding-container">Admin required</p>;
  if (isAdmin)
    return (
      <section className="padding-container flex-col gap-5">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:pt-20">
            <VerticalMenu menuList={ADMIN_MENU} paramName="tab" />
          </div>

          <div className=" w-full rounded-md bg-accent">
            <TabContent searchParams={searchParams} />
          </div>
        </div>
      </section>
    );
};

export default AdminPage;
