import InputField from "core/components/formfields/InputField";
import SelectField from "core/components/formfields/SelectField";
import TextField from "core/components/formfields/TextField";
import { SALES_CHANNELS } from "core/consts/systemconst";
import { getCatgories } from "core/helpers/renderStars";
import { ScrollToTop } from "core/helpers/scrollToTop";

export const BusinessReviewForm = ({
  onSubmit = () => {},
}: {
  onSubmit: any;
}) => {
  const categories = getCatgories();

  return (
    <>
      <ScrollToTop />

      <InputField
        boxStyle="mb-[25px]"
        label="Business name"
        name="businessname"
        type="text"
        placeholder="Business name"
        value=""
        isRequired
        onChange={() => {}}
      />

      <SelectField
        boxStyle="mb-[25px]"
        label="Category"
        name="category"
        defaultName="Select Business Category"
        defaultValue=""
        options={[
          ...categories?.map((category: any) => {
            return {
              name: category?.name,
              value: category?.name,
            };
          }),
        ]}
        value=""
        isRequired
        onChange={() => {}}
      />

      <InputField
        boxStyle="mb-[25px]"
        label="What did you buy?"
        name="productName"
        type="text"
        placeholder="Product/Service purchased"
        value=""
        isRequired
        onChange={() => {}}
      />

      <SelectField
        boxStyle="mb-[25px]"
        label="Where did you buy it?"
        name="channel"
        defaultName="Select"
        defaultValue=""
        options={[
          ...SALES_CHANNELS?.map((channel: any) => {
            return {
              name: channel,
              value: channel,
            };
          }),
        ]}
        value=""
        isRequired
        onChange={() => {}}
      />

      <div className="mb-[25px]">
        <label htmlFor="" className={`text-[14px] text-line`}>
          Tap the star to rate your experience{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>

      <InputField
        boxStyle="mb-[25px]"
        label="Review Title"
        name="title"
        type="text"
        placeholder="e.g Fantastic business"
        value=""
        isRequired
        onChange={() => {}}
      />

      <TextField
        boxStyle="mb-[25px]"
        label="What was your experience?"
        textareaStyle="w-full bg-shade"
        placeholder="Comments here..."
        isRequired
        name="comments"
        value=""
        rows={3}
      />

      <button
        type="button"
        onClick={onSubmit}
        className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white"
      >
        Next
      </button>
    </>
  );
};
