"use client";

import { SelectCn } from "@/components/shared/SelectCn";
import FormInput from "@/components/form/FormInput";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { sortOptions } from "@/constants";
import { Button } from "@/components/ui/button";
import { GeneralSettings as SettingsModel } from "@prisma/client";
import { updateGeneralSettings } from "@/utils/server/settings/updateGeneralSettings";

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
    await updateGeneralSettings(data);
  }

  return (
    <div className="flex flex-col h-fit bg-background rounded-md p-5">
      <h2 className="pb-3">General</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[90vh] flex flex-col gap-5 w-72"
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

          <div className="flex">
            <p>&quot;Featured&quot; sort</p>
            <Controller
              control={control}
              name="featuredSort"
              render={({ field: { onChange, value } }) => (
                <SelectCn
                  selectOptions={sortOptions}
                  onChange={onChange}
                  initialSelection={value}
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
