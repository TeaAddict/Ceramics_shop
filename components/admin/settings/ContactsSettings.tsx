"use client";

import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { updateContactSettings } from "@/utils/server/settings/updateContactSettings";
import { Contacts } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactsSchema } from "@/utils/server/settings/types";
import FormInput from "@/components/form/FormInput";
import toast from "react-hot-toast";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";

const ContactsSettings = ({ contacts }: { contacts: Contacts | null }) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "admin");
  const { t: tt } = useTranslation(lng, "shared");
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactsSchema),
    defaultValues: contacts || {},
  });

  async function onSubmit(data: Contacts) {
    toast.promise(updateContactSettings(data), {
      loading: tt("saving.loading"),
      success: tt("saving.success"),
      error: tt("saving.error"),
    });
  }

  return (
    <div className="bg-background p-5 rounded-md">
      <h2 className="pb-3">{t("contacts.h2")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[90vh] flex flex-col gap-5 max-w-72"
      >
        <div className="flex flex-col gap-5 p-1">
          <FormInput
            label={t("contacts.phone")}
            name="phone"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
          <FormInput
            label={t("contacts.email")}
            name="email"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
          <FormInput
            label={t("contacts.physicalLocation")}
            name="physicalLocation"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
        </div>
        <Button disabled={isSubmitting}>{t("update")}</Button>
      </form>
    </div>
  );
};

export default ContactsSettings;
