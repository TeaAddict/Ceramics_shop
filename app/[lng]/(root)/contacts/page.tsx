import React from "react";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { getContacts } from "@/utils/server/settings/getContacts";
import CustomReturnMessage from "@/components/shared/CustomReturnMessage";
import FacebookButton from "@/components/shared/socialMedia/FacebookButton";
import { useTranslation } from "@/app/i18n";

const ContactPage = async ({
  params: { lng },
}: {
  params: { lng: string };
}) => {
  const { t } = await useTranslation(lng, "contacts");
  const contacts = await getContacts();

  if (!contacts) return <CustomReturnMessage text={t("error")} />;
  return (
    <div className="padding-container flex-col">
      <h1>{t("title")}</h1>

      <div className="flex justify-around">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <div className="text-3xl border-[1px] rounded-full inline-block p-2">
                <LuPhone />
              </div>

              <div>
                <p>{t("phone")}</p>
                <p>{contacts.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-3xl border-[1px] rounded-full inline-block p-2">
                <MdOutlineEmail />
              </div>
              <div>
                <p>{t("email")}</p>
                <p>{contacts.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-3xl border-[1px] rounded-full inline-block p-2">
                <IoLocationOutline />
              </div>
              <div>
                <p>{t("physicalLocation")}</p>
                <p>{contacts.physicalLocation}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[40vw] flex flex-col gap-5">
          <p>{t("p1")}</p>

          <div className="flex gap-3 items-center">
            <p>{t("p2")}</p>
            <FacebookButton size={45} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
