import { getServerSession } from "next-auth";
import { isAdminRole } from "@/utils/server/isAdminRole";
import VerticalMenu from "@/components/shared/VerticalMenu";
import TabContent from "@/components/admin/TabContent";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";
import { useTranslation } from "@/app/i18n";
import { translateAdminMenu } from "@/utils/functions/translate/translateAdminMenu";

export type SearchParams = {
  tab: string;
  category: string;
  sortBy: string;
  page: string;
};

const AdminPage = async ({
  searchParams,
  params: { lng },
}: {
  searchParams: SearchParams;
  params: { lng: string };
}) => {
  const { t } = await useTranslation(lng, "admin");
  const translatedMenu = translateAdminMenu(t);
  const session = await getServerSession();
  let isAdmin = false;
  if (session?.user?.name) isAdmin = await isAdminRole(session?.user?.name);

  if (!isAdmin) return <CustomReturnMessage text={t("adminReq")} />;
  if (isAdmin)
    return (
      <section className="padding-container flex-col gap-5">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:pt-20">
            <VerticalMenu menuList={translatedMenu} paramName="tab" />
          </div>

          <div className="padding-container rounded-md bg-accent overflow-auto">
            <TabContent searchParams={searchParams} lng={lng} />
          </div>
        </div>
      </section>
    );
};

export default AdminPage;
