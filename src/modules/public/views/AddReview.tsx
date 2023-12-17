import InputField from "core/components/formfields/InputField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BusinessReviewForm } from "../partials/BusinessReviewForm";
import { AdditionalInformationForm } from "../partials/AdditionalInformationForm";

const AddReview = () => {
  const [steps, setSteps] = useState(1);
  const [ratings, setRatings] = useState(0);

  const [newReview, setNewReview] = useState<NewReview>({
    businessName: "",
    businessCategoryId: 0,
    businessSocialMediaProfile: "",
    businessFacebookProfileName: "",
    businessPhoneNumber: "",
    businessWebsite: "",
    businessAddress: "",
    businessEmailAddress: "",
    businessBankName: "",
    businessBankAccountNumber: "",
    channelPurchasedFrom: 1,
    productName: "",
    rating: 0,
    reviewTitle: "",
    reviewBody: "",
    assetId: "",
  });

  const onFormChange = (event: any) => {
    const { name, value } = event?.target;
    setNewReview((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onRateChange = (rating: number) => {
    setNewReview((state) => ({
      ...state,
      rating,
    }));
  };

  console.log(newReview);

  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div className="w-full sm:w-auto">
          <p className="text-[14px] text-line">Step {steps} of 2</p>
          {(() => {
            switch (steps) {
              case 1:
                return (
                  <>
                    <h3 className="text-[24px] font-[600] text-white">
                      Business Review
                    </h3>
                    <p className="text-[16px] text-line">
                      Your honest answers help us win.
                    </p>
                  </>
                );
              case 2:
                return (
                  <>
                    <h3 className="text-[24px] font-[600] text-white">
                      Additional Information
                    </h3>
                    <p className="text-[16px] text-line">
                      Optional but crucial in helping others.
                    </p>
                  </>
                );
              default:
                return <></>;
            }
          })()}

          <form className="my-[32px]">
            {steps === 1 && (
              <BusinessReviewForm
                formData={newReview}
                onChange={onFormChange}
                onSubmit={() => setSteps(2)}
                onRateChange={onRateChange}
              />
            )}
            {steps === 2 && (
              <AdditionalInformationForm
                formData={newReview}
                onBack={() => setSteps(1)}
                onChange={onFormChange}
                onSubmit={() => setSteps(2)}
                onFileUpload={() => {}}
              />
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddReview;
