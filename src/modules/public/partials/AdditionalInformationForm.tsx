import InputField from "core/components/formfields/InputField";
import { upload } from "core/consts/images";
import { BANKS } from "core/consts/systemconst";
import { ScrollToTop } from "core/helpers/scrollToTop";
import useBusinessStore from "core/services/stores/useBusinessStore";
import { useState } from "react";

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
  const [fileUrl, setFileUrl] = useState("");
  const uploadImageAction = useBusinessStore((store) => store.uploadImage);
  const setLoadingAction = useBusinessStore((store) => store.setLoading);

  const onFileChange = async (e: any) => {
    setLoadingAction(true);
    if (e.target.files) {
      var uploadedFile: any = e.target?.files[0];
      setFileUrl(URL.createObjectURL(uploadedFile));
      var res = await uploadImageAction(uploadedFile);

      onFileUpload(res);

      if (res?.length < 1) {
        setFileUrl("");
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="mb-[25px]">
        <label htmlFor="" className={`text-[14px] text-line`}>
          Upload your evidence
        </label>
        <div className="mt-2">
          <label
            className="flex w-full items-center justify-center rounded-[5px] border border-[.5px] border-dashed border-line bg-shade px-[50px] py-5 text-[14px] outline-none"
            htmlFor="additionalDocument"
          >
            <div className="flex flex-col items-center gap-2">
              {fileUrl?.length > 1 ? (
                <img src={fileUrl} className="h-[100px] w-[100px]" alt="" />
              ) : (
                <img src={upload} alt="" />
              )}
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
            onChange={onFileChange}
          />
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
