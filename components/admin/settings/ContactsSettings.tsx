"use client";

import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { updateSettings } from "@/utils/server/settings/updateSettings";
import { Contacts } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactsSchema } from "@/utils/server/settings/types";
import FormInput from "@/components/form/FormInput";

const ContactsSettings = ({ contacts }: { contacts: Contacts | null }) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactsSchema),
    defaultValues: contacts || {},
  });

  async function onSubmit(data: Contacts) {
    await updateSettings(data);
  }

  return (
    <div className="bg-background p-5 rounded-md">
      <h2 className="pb-3">Contacts</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[90vh] flex flex-col gap-5 w-72"
      >
        <div className="flex flex-col gap-5 p-1">
          <FormInput
            label="phone"
            name="phone"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
          <FormInput
            label="email"
            name="email"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
          <FormInput
            label="physical location"
            name="physicalLocation"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
        </div>
        <Button disabled={isSubmitting}>Update</Button>
      </form>
    </div>
  );
};

export default ContactsSettings;
