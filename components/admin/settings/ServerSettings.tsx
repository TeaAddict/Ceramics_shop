import React from "react";
import { getContacts } from "@/utils/server/settings/getContacts";
import ContactsSettings from "./ContactsSettings";
import GeneralSettings from "./GeneralSettings";
import { getGeneralSettings } from "@/utils/server/settings/getGeneralSettings";

const ServerSettings = async () => {
  const contacts = await getContacts();
  const generalSettings = await getGeneralSettings();

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center">
      <GeneralSettings settings={generalSettings} />
      <ContactsSettings contacts={contacts} />
    </div>
  );
};

export default ServerSettings;
