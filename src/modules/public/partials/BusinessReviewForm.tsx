import InputField from "core/components/formfields/InputField";
import SelectField from "core/components/formfields/SelectField";
import TextField from "core/components/formfields/TextField";
import { starEmpty, starFull } from "core/consts/images";
import { SALES_CHANNELS } from "core/consts/systemconst";
import { getCatgories } from "core/helpers/renderStars";
import { ScrollToTop } from "core/helpers/scrollToTop";

export const BusinessReviewForm = ({
  formData,
  onSubmit = () => {},
  onChange = () => {},
  onRateChange = () => {},
}: {
  onSubmit: any;
  formData: NewReview;
  onChange: any;
  onRateChange: any;
}) => {
  const categories = getCatgories();

  return (
    <>
      <ScrollToTop />

      <InputField
        boxStyle="mb-[25px]"
        label="Business Name"
        name="businessName"
        type="text"
        placeholder="Business Name"
        value={formData?.businessName}
        isRequired
        onChange={(e: any) => onChange(e)}
      />

      <SelectField
        boxStyle="mb-[25px]"
        label="Category"
        name="businessCategoryId"
        options={[
          ...categories?.map((category: any) => {
            return {
              name: category?.name,
              value: category?.name,
            };
          }),
        ]}
        value={formData?.businessCategoryId}
        isRequired
        onChange={(e: any) => onChange(e)}
      />

      <InputField
        boxStyle="mb-[25px]"
        label="What did you buy?"
        name="productName"
        type="text"
        placeholder="Product/Service purchased"
        value={formData?.productName}
        isRequired
        onChange={(e: any) => onChange(e)}
      />

      <SelectField
        boxStyle="mb-[25px]"
        label="Where did you buy it?"
        name="channelPurchasedFrom"
        options={[
          ...SALES_CHANNELS?.map((channel: any) => {
            return {
              name: channel,
              value: channel,
            };
          }),
        ]}
        value={formData?.channelPurchasedFrom}
        isRequired
        onChange={(e: any) => onChange(e)}
      />

      <div className="mb-[25px]">
        <label htmlFor="" className={`text-[14px] text-line`}>
          Tap the star to rate your experience{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex items-center justify-center gap-10">
          {[1, 2, 3, 4, 5].map((rate: number, index: number) => (
            <img
              src={formData.rating >= rate ? starFull : starEmpty}
              alt={`${rate}`}
              className="h-[20px] w-[20px]"
              key={index + rate}
              onClick={() => onRateChange(rate)}
            />
          ))}
        </div>
      </div>

      <InputField
        boxStyle="mb-[25px]"
        label="Review Title"
        name="reviewTitle"
        type="text"
        placeholder="e.g Fantastic business"
        value={formData?.reviewTitle}
        isRequired
        onChange={(e: any) => onChange(e)}
      />

      <TextField
        boxStyle="mb-[25px]"
        label="What was your experience?"
        textareaStyle="w-full bg-shade"
        placeholder="Comments here..."
        isRequired
        name="reviewBody"
        value={formData?.reviewBody}
        rows={1}
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
