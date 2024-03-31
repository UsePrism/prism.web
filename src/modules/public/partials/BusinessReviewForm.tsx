import InputField from "core/components/formfields/InputField";
import SelectField from "core/components/formfields/SelectField";
import TextField from "core/components/formfields/TextField";
import { SALES_CHANNELS } from "core/consts/systemconst";
import { isNumeric, isValidURL } from "core/helpers/generalHelpers";
import notification from "core/helpers/notification";
import { ScrollToTop } from "core/helpers/scrollToTop";
import useBusinessStore from "core/services/stores/useBusinessStore";
import { useEffect, useState } from "react";
import starEmpty from 'assets/img/starempty.svg';
import starFull from 'assets/img/starfull.svg';

export const BusinessReviewForm = ({
  formData,
  onSubmit = () => {},
  onChange = () => {},
  onRateChange = () => {},
  isExisting = false,
}: {
  onSubmit: any;
  formData: NewReview;
  onChange: any;
  onRateChange: any;
  isExisting?: boolean;
}) => {
  const categories = useBusinessStore((store) => store.categories);
  const getCategoriesAction = useBusinessStore((store) => store.getCategories);
  const [errors, setErrors] = useState<any>([]);

  useEffect(() => {
    if (categories?.length < 1) {
      getCategoriesAction();
    }
  }, []);

  const validateBusinessReview = (review: NewReview) => {
    var isValid = true;

    if (review?.businessName?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        BusinessName: [
          {
            errorMessage: "A valid Business name is required",
          },
        ],
      }));
      isValid = false;
    }

    if (review?.businessCategoryId == "0") {
      setErrors((state: any) => ({
        ...state,
        BusinessCategoryId: [
          {
            errorMessage: "Please select a business category",
          },
        ],
      }));
      isValid = false;
    }

    if (review?.channelPurchasedFrom == "0") {
      setErrors((state: any) => ({
        ...state,
        ChannelPurchasedFrom: [
          {
            errorMessage: "Please select a purchase channel",
          },
        ],
      }));
      isValid = false;
    } else {
      switch (formData?.channelPurchasedFrom) {
        case "1":
          if (formData?.businessWebsite?.length < 1) {
            setErrors((state: any) => ({
              ...state,
              BusinessWebsite: [
                {
                  errorMessage: "Business website is required.",
                },
              ],
            }));
            isValid = false;
          } else {

            if (!isValidURL(formData?.businessWebsite)) {
              setErrors((state: any) => ({
                ...state,
                BusinessWebsite: [
                  {
                    errorMessage: "Please include a valid URL. e.g https://nameofwebsite.com",
                  },
                ],
              }));
              isValid = false;
            }
          }

          break;
        case "2":
        case "3":
          if (
            !isNumeric(formData?.businessPhoneNumber) ||
            formData?.businessPhoneNumber?.length !== 11
          ) {
            setErrors((state: any) => ({
              ...state,
              BusinessPhoneNumber: [
                {
                  errorMessage: "A valid 11 digits phone number is required.",
                },
              ],
            }));
            isValid = false;
          }
          break;
        case "5":
          //facebook
          if (formData?.businessFacebookProfileName?.length < 1) {
            setErrors((state: any) => ({
              ...state,
              BusinessFacebookProfileName: [
                {
                  errorMessage: "Facebook profile of business is required.",
                },
              ],
            }));
            isValid = false;
          }
          break;
        case "9":
          //address
          if (formData?.businessAddress?.length < 1) {
            setErrors((state: any) => ({
              ...state,
              BusinessAddress: [
                {
                  errorMessage: "Business address is required.",
                },
              ],
            }));
            isValid = false;
          }
          break;
        default:
          // social media
          if (formData?.businessSocialMediaProfile?.length < 1) {
            setErrors((state: any) => ({
              ...state,
              BusinessSocialMediaProfile: [
                {
                  errorMessage: "Social media profile of business is required.",
                },
              ],
            }));
            isValid = false;
          }
          break;
      }
    }

    if (review?.productName?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        ProductName: [
          {
            errorMessage:
              "Please include the product bought or service paid for",
          },
        ],
      }));
      isValid = false;
    }

    if (review?.reviewTitle?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        ReviewTitle: [
          {
            errorMessage: "Review Title is required",
          },
        ],
      }));
      isValid = false;
    }

    if (review?.reviewBody?.length < 1) {
      setErrors((state: any) => ({
        ...state,
        ReviewBody: [
          {
            errorMessage: "Please describe your ordeal",
          },
        ],
      }));
      isValid = false;
    }

    if (review?.rating < 1) {
      setErrors((state: any) => ({
        ...state,
        Rating: [
          {
            errorMessage: "Please select a rating",
          },
        ],
      }));
      isValid = false;
    }

    return isValid;
  };

  const validateForm = () => {
    if (validateBusinessReview(formData)) {
      onSubmit();
    } else {
      notification({
        title: "",
        message: "Please pass all required information",
        type: "danger",
      });
    }
  };

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
        disabled={isExisting}
        isRequired
        onChange={(e: any) => onChange(e)}
        errors={errors?.BusinessName}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            BusinessName: "",
          }))
        }
      />

      <SelectField
        boxStyle="mb-[25px]"
        label="Category"
        name="businessCategoryId"
        disabled={isExisting}
        options={[
          ...categories?.map((category: Category) => {
            return {
              name: category?.name,
              value: category?.id,
            };
          }),
        ]}
        value={formData?.businessCategoryId}
        isRequired
        onChange={(e: any) => onChange(e)}
        errors={errors?.BusinessCategoryId}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            BusinessCategoryId: "",
          }))
        }
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
        errors={errors?.ProductName}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            ProductName: "",
          }))
        }
      />

      <SelectField
        boxStyle="mb-[25px]"
        label="Where did you buy it?"
        name="channelPurchasedFrom"
        options={[
          ...SALES_CHANNELS?.map((channel: any) => {
            return {
              name: channel?.name,
              value: channel?.value,
            };
          }),
        ]}
        defaultName="Select Channel"
        defaultValue="0"
        value={formData?.channelPurchasedFrom}
        isRequired
        onChange={(e: any) => onChange(e)}
        errors={errors?.ChannelPurchasedFrom}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            ChannelPurchasedFrom: "",
          }))
        }
      />

      {(() => {
        switch (formData?.channelPurchasedFrom) {
          case "1":
            return (
              <>
                <InputField
                  boxStyle="mb-[25px]"
                  label="Business Website"
                  name="businessWebsite"
                  placeholder="Website of business. e.g https://website.com"
                  value={formData?.businessWebsite}
                  isRequired
                  onChange={(e: any) => onChange(e)}
                  errors={errors?.BusinessWebsite}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      BusinessWebsite: "",
                    }))
                  }
                />
              </>
            );
          case "2":
          case "3":
            return (
              <>
                <InputField
                  boxStyle="mb-[25px]"
                  label="Business Phone Number"
                  name="businessPhoneNumber"
                  placeholder="Phone number of business"
                  value={formData?.businessPhoneNumber}
                  isNumberOnly
                  isRequired
                  onChange={(e: any) => onChange(e)}
                  errors={errors?.BusinessPhoneNumber}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      BusinessPhoneNumber: "",
                    }))
                  }
                />
              </>
            );
          case "5":
            return (
              <>
                <InputField
                  boxStyle="mb-[25px]"
                  label="Business Facebook"
                  name="businessFacebookProfileName"
                  placeholder="Facebook profile of business"
                  value={formData?.businessFacebookProfileName}
                  isRequired
                  onChange={(e: any) => onChange(e)}
                  errors={errors?.BusinessFacebookProfileName}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      BusinessFacebookProfileName: "",
                    }))
                  }
                />
              </>
            );
          case "9":
            return (
              <>
                <InputField
                  boxStyle="mb-[25px]"
                  label="Business Address"
                  name="businessAddress"
                  placeholder="Address of business"
                  value={formData?.businessAddress}
                  isRequired
                  onChange={(e: any) => onChange(e)}
                  errors={errors?.BusinessAddress}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      BusinessAddress: "",
                    }))
                  }
                />
              </>
            );
          case "0":
            return <></>;
          default:
            return (
              <>
                <InputField
                  boxStyle="mb-[25px]"
                  label="Business Social Media Profile"
                  name="businessSocialMediaProfile"
                  placeholder=""
                  value={formData?.businessSocialMediaProfile}
                  isRequired
                  onChange={(e: any) => onChange(e)}
                  errors={errors?.BusinessSocialMediaProfile}
                  onBlur={() =>
                    setErrors((state: any) => ({
                      ...state,
                      BusinessSocialMediaProfile: "",
                    }))
                  }
                />
              </>
            );
        }
      })()}

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
              onClick={() => {
                onRateChange(rate);
                setErrors((state: any) => ({
                  ...state,
                  Rating: "",
                }));
              }}
            />
          ))}
        </div>
        {errors?.Rating?.length > 0 &&
          errors?.Rating?.slice(0, 1)?.map((error: any, index: number) => (
            <span
              key={index}
              className="duration-2000 mt-1 block  text-[12px] text-red-500 transition-all ease-in-out"
            >
              {error?.errorMessage}
            </span>
          ))}
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
        errors={errors?.ReviewTitle}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            ReviewTitle: "",
          }))
        }
      />

      <TextField
        boxStyle="mb-[25px]"
        label="What was your experience?"
        textareaStyle="w-full bg-shade"
        placeholder="Comments here..."
        isRequired
        name="reviewBody"
        value={formData?.reviewBody}
        onChange={(e: any) => onChange(e)}
        rows={1}
        errors={errors?.ReviewBody}
        onBlur={() =>
          setErrors((state: any) => ({
            ...state,
            ReviewBody: "",
          }))
        }
      />

      <button
        type="button"
        onClick={() => validateForm()}
        className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white"
      >
        Next
      </button>
    </>
  );
};
