import { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import type { NonPostableEvt } from "evt";
import { useEvt } from "evt/hooks";
import type { FormData } from "core/usecases/softwareForm";
import { declareComponentKeys } from "i18nifty";
import { useTranslation } from "ui/i18n";

export type Step2Props = {
  className?: string;
  isCloudNativeSoftware: boolean;
  initialFormData: FormData["step3"] | undefined;
  onSubmit: (formData: FormData["step3"]) => void;
  evtActionSubmit: NonPostableEvt<void>;
};

type DoRespectRgaaInputValue = "true" | "false" | "not applicable";

export function SoftwareFormStep3(props: Step2Props) {
  const { className, initialFormData, onSubmit, evtActionSubmit } = props;

  const { t } = useTranslation({ SoftwareFormStep3 });
  const { t: tCommon } = useTranslation({ "App": "App" });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<{
    isSoftwareHasHealthDataInputValue: "true" | "false";
    doRespectRgaaInputValue: DoRespectRgaaInputValue;
    isFromFrenchPublicServiceInputValue: "true" | "false";
    isPublicInstanceInputValue: "true" | "false";
    targetAudience: string;
  }>({
    "defaultValues": (() => {
      if (initialFormData === undefined) {
        return undefined;
      }

      const {
        isFromFrenchPublicService,
        isSoftwareHasHealthData,
        doRespectRgaa
      } = initialFormData;

      return {
        "isSoftwareHasHealthDataInputValue":
          isSoftwareHasHealthData === undefined
            ? undefined
            : isSoftwareHasHealthData
              ? "true"
              : "false",
        "doRespectRgaaInputValue": ((): DoRespectRgaaInputValue => {
          if (doRespectRgaa === null) return "not applicable";
          return doRespectRgaa ? "true" : "false";
        })(),
        "isFromFrenchPublicServiceInputValue":
          isFromFrenchPublicService === undefined
            ? undefined
            : isFromFrenchPublicService
              ? "true"
              : "false"
      };
    })()
  });

  const [submitButtonElement, setSubmitButtonElement] =
    useState<HTMLButtonElement | null>(null);

  useEvt(
    ctx => {
      if (submitButtonElement === null) {
        return;
      }

      evtActionSubmit.attach(ctx, () => submitButtonElement.click());
    },
    [evtActionSubmit, submitButtonElement]
  );

  return (
    <form
      className={className}
      onSubmit={handleSubmit(
        ({
          isSoftwareHasHealthDataInputValue,
          isFromFrenchPublicServiceInputValue,
          doRespectRgaaInputValue
        }) =>
          onSubmit({
            "isSoftwareHasHealthData": (() => {
              switch (isSoftwareHasHealthDataInputValue) {
                case "true":
                  return true;
                case "false":
                  return false;
              }
            })(),
            "doRespectRgaa": (() => {
              switch (doRespectRgaaInputValue) {
                case "not applicable":
                  return null;
                case "true":
                  return true;
                case "false":
                  return false;
              }
            })(),
            "isFromFrenchPublicService": (() => {
              switch (isFromFrenchPublicServiceInputValue) {
                case "true":
                  return true;
                case "false":
                  return false;
              }
            })()
          })
      )}
    >
      <RadioButtons
        legend={t("is from french public service")}
        options={[
          {
            "label": tCommon("yes"),
            "nativeInputProps": {
              ...register("isFromFrenchPublicServiceInputValue", {
                "required": true
              }),
              "value": "true"
            }
          },
          {
            "label": tCommon("no"),
            "nativeInputProps": {
              ...register("isFromFrenchPublicServiceInputValue", {
                "required": true
              }),
              "value": "false"
            }
          }
        ]}
        state={
          errors.isFromFrenchPublicServiceInputValue !== undefined
            ? "error"
            : undefined
        }
        stateRelatedMessage={tCommon("required")}
      />
      <RadioButtons
        legend={t("do respect RGAA")}
        options={[
          {
            "label": tCommon("yes"),
            "nativeInputProps": {
              ...register("doRespectRgaaInputValue"),
              "value": "true"
            }
          },
          {
            "label": tCommon("no"),
            "nativeInputProps": {
              ...register("doRespectRgaaInputValue"),
              "value": "false"
            }
          },
          {
            "label": tCommon("not applicable"),
            "nativeInputProps": {
              ...register("doRespectRgaaInputValue"),
              "value": "not applicable"
            }
          }
        ]}
      />
      <RadioButtons
        legend={t("is software has health datas")}
        options={[
          {
            "label": tCommon("yes"),
            "nativeInputProps": {
              ...register("isSoftwareHasHealthDataInputValue"),
              "value": "true"
            }
          },
          {
            "label": tCommon("no"),
            "nativeInputProps": {
              ...register("isSoftwareHasHealthDataInputValue"),
              "value": "false"
            }
          }
        ]}
      />
      <button
        style={{ "display": "none" }}
        ref={setSubmitButtonElement}
        type="submit"
      />
    </form>
  );
}

export const { i18n } = declareComponentKeys<
  "is software has health datas" | "is from french public service" | "do respect RGAA"
>()({ SoftwareFormStep3 });
