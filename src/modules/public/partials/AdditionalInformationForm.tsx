import InputField from "core/components/formfields/InputField";
import { BANKS } from "core/consts/systemconst";
import { ScrollToTop } from "core/helpers/scrollToTop";
import upload from "assets/img/upload.svg";
import deleteIcon from "assets/img/trash.svg";
import { addEllipsis } from "core/helpers/generalHelpers";
import { useState } from "react";
import useBusinessStore from "core/services/stores/useBusinessStore";
import notification from "core/helpers/notification";

export const AdditionalInformationForm = ({
  onBack = () => {},
  formData,
  errors = {},
  onChange = () => {},
  onFileUpload = () => {},
  setErrors = () => {},
}: {
  onBack: any;
  errors?: any;
  formData: NewReview;
  onChange: any;
  onFileUpload: any;
  setErrors: any;
}) => {

  const uploadImageAction = useBusinessStore((store) => store.uploadImage);
  const setLoadingAction = useBusinessStore((store) => store.setLoading);

  const onFileChange = (e: any) => {
    setLoadingAction(true);
    var uploadedFiles: any = e.target?.files;

    var assetIds: string[] = [];

    if (uploadedFiles?.length > 0) {
      Array.from(uploadedFiles)?.map(
        async (uploadedFile: any, index: number) => {
          var res = await uploadImageAction(uploadedFile);

          if (res?.length > 0) {
            assetIds?.push(res);
          }

          if (index == uploadedFiles?.length - 1) {
            notification({
              message: `${assetIds?.length} of ${Array.from(uploadedFiles)
                ?.length} was uploaded`,
              type: "warning",
            });

            if (assetIds?.length > 0) {
              onFileUpload((state: any) => ({
                ...state,
                files: [...state?.files, ...uploadedFiles],
                assetIds: [...state.assetIds, ...assetIds]
              }));
            }
          }
        },
      );
    }
  };

  const removeImage = (index: number) => {
    onFileUpload((state: any) => ({
      ...state,
      files: [...state?.files.filter((file: any, i: number) => i !== index)],
    }));
  };

  return (
    <>
      <ScrollToTop />
      <div className="mb-[25px]">
        <label htmlFor="" className={`text-[14px] text-line`}>
          Upload your evidence
        </label>

        <div className="mb-3 mt-2">
          <label
            className="flex w-full items-center justify-center rounded-[5px] border border-[.5px] border-dashed border-line bg-shade px-[50px] py-5 text-[14px] outline-none"
            htmlFor="additionalDocument"
          >
            <div className="flex flex-col items-center gap-2">
              <img src={upload} alt="" />
              <p>
                <span className="font-[600] text-brand">Click to Upload</span>{" "}
                or drag and drop
              </p>
              <p className="mt-[-10px] text-[12px]">
                PNG, JPG or video (max. 800x400px)
              </p>
            </div>
          </label>
          <input
            type="file"
            name="additionalDocument"
            id="additionalDocument"
            className="hidden"
            multiple
            onChange={onFileChange}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {formData?.files &&
            formData?.files?.length > 0 &&
            Array.from(formData?.files)?.map((file: any, index: number) => (
              <div className="flex gap-2 rounded-md bg-shade px-1 text-[12px]">
                <span
                  key={file?.name}
                >
                  {index} {addEllipsis(file?.name, 20)}
                </span>
                <img
                  onClick={() => removeImage(index)}
                  src={deleteIcon}
                  alt="delete"
                />
              </div>
            ))}
        </div>
      </div>

      <InputField
        boxStyle="mb-[25px]"
        label="Bank"
        name="businessBankName"
        dataListId="businessBankName"
        dataList={[
          ...BANKS?.map((channel: any) => {
            return {
              name: channel?.name,
              value: channel?.value,
            };
          }),
        ]}
        value={formData?.businessBankName}
        onChange={(e: any) => onChange(e)}
        errors={errors?.BusinessBankName}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            BusinessBankName: "",
          }))
        }
      />

      <InputField
        boxStyle="mb-[25px]"
        label="Account number"
        name="businessBankAccountNumber"
        isNumberOnly
        type="text"
        disabled={formData?.businessBankName?.length < 1}
        placeholder="e.g 0123456789"
        value={formData?.businessBankAccountNumber}
        onChange={(e: any) => onChange(e)}
        errors={errors?.BusinessBankAccountNumber}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            BusinessBankAccountNumber: "",
          }))
        }
      />

      <InputField
        boxStyle="mb-[25px]"
        label="Email Address"
        name="businessEmailAddress"
        placeholder="e.g businessemail@gmail.com"
        value={formData?.businessEmailAddress}
        onChange={(e: any) => onChange(e)}
        errors={errors?.BusinessEmailAddress}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            BusinessEmailAddress: "",
          }))
        }
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="mt-3 w-full rounded-[8px] bg-black-support py-[14px] text-brand-white"
        >
          Back
        </button>
        <button
          type="submit"
          className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white"
        >
          Submit
        </button>
      </div>
    </>
  );
};
