import InputField from "core/components/formfields/InputField";
import SelectField from "core/components/formfields/SelectField";
import { upload } from "core/consts/images";
import { ScrollToTop } from "core/helpers/scrollToTop";

export const AdditionalInformationForm = ({
  onBack = () => {},
}: {
  onBack: any;
}) => {
  return (
    <>
      <ScrollToTop />
      <div className="mb-[25px]">
        <label htmlFor="" className={`text-[14px] text-line`}>
          Upload your experience
        </label>
        <div className="mt-2">
          <label
            className="flex w-full items-center justify-center rounded-[5px] border border-[.5px] border-dashed border-line bg-shade px-[50px] py-5 text-[14px] outline-none"
            htmlFor="businesslogo"
          >
            <div className="flex flex-col items-center gap-2">
              <img src={upload} alt="" />
              <p>
                <span className="text-[600] text-brand">Click to Upload</span>{" "}
                or drag and drop
              </p>
              <p className="mt-[-10px] text-[12px]">
                PNG, JPG or video (max. 800x400px)
              </p>
            </div>
          </label>
          <input
            type="file"
            name="businesslogo"
            id="businesslogo"
            className="hidden"
          />
        </div>
      </div>

      <SelectField
        boxStyle="mb-[25px]"
        label="Bank"
        name="bank"
        options={[]}
        value=""
        onChange={() => {}}
      />

      <InputField
        boxStyle="mb-[25px]"
        label="Account number"
        name="accountnumber"
        type="text"
        placeholder="e.g 0123456789"
        value=""
        onChange={() => {}}
      />

      <InputField
        boxStyle="mb-[25px]"
        label="Email Address"
        name="businessemailaddress"
        type="email"
        placeholder="e.g businessemail@gmail.com"
        value=""
        onChange={() => {}}
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
