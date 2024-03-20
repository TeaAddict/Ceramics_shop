"use client";

import { SelectCn } from "@/components/shared/SelectCn";
import FormInput from "@/components/form/FormInput";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { GeneralSettings as SettingsModel } from "@prisma/client";
import { updateGeneralSettings } from "@/utils/server/settings/updateGeneralSettings";
import toast from "react-hot-toast";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { useTranslation } from "@/app/i18n/client";
import { translateSortOptions } from "@/utils/functions/translateSortOptions";
import { transtaleSoldOptions } from "@/utils/functions/transtaleSoldOptions";

const GeneralSettings = ({ settings }: { settings: SettingsModel | null }) => {
  const lng = useCurrentLanguage();
  const { t } = useTranslation(lng, "admin");
  const { t: tt } = useTranslation(lng, "shared");
  const translatedOptions = translateSortOptions(t);
  const translateSoldOptions = transtaleSoldOptions(t);
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: settings || {},
  });

  async function onSubmit(data: SettingsModel) {
    toast.promise(updateGeneralSettings(data), {
      loading: tt("saving.loading"),
      success: tt("saving.success"),
      error: tt("saving.error"),
    });
  }

  return (
    <div className="flex flex-col h-fit bg-background rounded-md p-5">
      <h2 className="pb-3">{t("general.h2")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[90vh] flex flex-col gap-5 max-w-72"
      >
        <div className="flex flex-col gap-5 p-1">
          <FormInput
            label={t("general.itemsPerPage")}
            name="itemsPerPage"
            labelSize="2"
            inputSize="2"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
            type="number"
          />

          <div className="flex flex-col md:flex-row gap-3">
            <p>{t("general.featuredSort")}</p>
            <Controller
              control={control}
              name="featuredSort"
              render={({ field: { onChange, value } }) => (
                <SelectCn
                  selectOptions={translatedOptions}
                  onChange={onChange}
                  initialSelection={value}
                />
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <p>{t("general.featuredSoldOut")}</p>
            <Controller
              control={control}
              name="displaySold"
              render={({ field: { onChange, value } }) => (
                <SelectCn
                  selectOptions={translateSoldOptions}
                  onChange={onChange}
                  initialSelection={String(value)}
                />
              )}
            />
          </div>
        </div>
        <Button disabled={isSubmitting}>{t("update")}</Button>
      </form>
    </div>
  );
};

export default GeneralSettings;
