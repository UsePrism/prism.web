import InputField from "core/components/formfields/InputField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BusinessReviewForm } from "../partials/BusinessReviewForm";
import { AdditionalInformationForm } from "../partials/AdditionalInformationForm";

const AddReview = () => {
  const [steps, setSteps] = useState(1);

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
            {steps === 1 && <BusinessReviewForm onSubmit={() => setSteps(2)} />}
            {steps === 2 && (
              <AdditionalInformationForm onBack={() => setSteps(1)} />
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddReview;
