"use client";

import { SelectCn } from "@/components/shared/SelectCn";
import FormInput from "@/components/form/FormInput";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FEATURE_SOLD, SORT_OPTIONS } from "@/constants";
import { Button } from "@/components/ui/button";
import { GeneralSettings as SettingsModel } from "@prisma/client";
import { updateGeneralSettings } from "@/utils/server/settings/updateGeneralSettings";
import toast from "react-hot-toast";

const GeneralSettings = ({ settings }: { settings: SettingsModel | null }) => {
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
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  }

  return (
    <div className="flex flex-col h-fit bg-background rounded-md p-5">
      <h2 className="pb-3">General</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[90vh] flex flex-col gap-5 max-w-72"
      >
        <div className="flex flex-col gap-5 p-1">
          <FormInput
            label="Items per page"
            name="itemsPerPage"
            labelSize="2"
            inputSize="2"
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
            type="number"
          />

          <div className="flex flex-col md:flex-row gap-3">
            <p>&quot;Featured&quot; sort</p>
            <Controller
              control={control}
              name="featuredSort"
              render={({ field: { onChange, value } }) => (
                <SelectCn
                  selectOptions={SORT_OPTIONS}
                  onChange={onChange}
                  initialSelection={value}
                />
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <p>&quot;Featured&quot; sold out</p>
            <Controller
              control={control}
              name="displaySold"
              render={({ field: { onChange, value } }) => (
                <SelectCn
                  selectOptions={FEATURE_SOLD}
                  onChange={onChange}
                  initialSelection={String(value)}
                />
              )}
            />
          </div>
        </div>
        <Button disabled={isSubmitting}>Update</Button>
      </form>
    </div>
  );
};

export default GeneralSettings;
