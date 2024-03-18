import { getServerSession } from "next-auth";
import { isAdminRole } from "@/utils/server/isAdminRole";
import VerticalMenu from "@/components/shared/VerticalMenu";
import { ADMIN_MENU } from "@/constants";
import TabContent from "@/components/admin/TabContent";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";

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

  if (!isAdmin)
    return <CustomReturnMessage text="Admin required for this page" />;
  if (isAdmin)
    return (
      <section className="padding-container flex-col gap-5">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:pt-20">
            <VerticalMenu menuList={ADMIN_MENU} paramName="tab" />
          </div>

          <div className="padding-container rounded-md bg-accent overflow-auto">
            <TabContent searchParams={searchParams} />
          </div>
        </div>
      </section>
    );
};

export default AdminPage;
