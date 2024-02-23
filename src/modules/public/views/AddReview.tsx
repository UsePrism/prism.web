import { useEffect, useState } from "react";
import { BusinessReviewForm } from "../partials/BusinessReviewForm";
import { AdditionalInformationForm } from "../partials/AdditionalInformationForm";
import notification from "core/helpers/notification";
import { isNumeric, isObjectEmpty } from "core/helpers/generalHelpers";
import useBusinessStore from "core/services/stores/useBusinessStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AddReview = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState<any>([]);
  const addReviewAction = useBusinessStore((store) => store.addReview);

  const [searchParams, setSearchParams]: any = useSearchParams();
  const selectedBusiness = useBusinessStore((store) => store.selectedBusiness);
  const getBusinessByIdAction = useBusinessStore(
    (store) => store.getBusinessById,
  );

  const defaultReview = {
    businessName: "",
    businessCategoryId: "0",
    businessSocialMediaProfile: "",
    businessFacebookProfileName: "",
    businessPhoneNumber: "",
    businessWebsite: "",
    businessAddress: "",
    businessEmailAddress: "",
    businessBankName: "",
    businessBankAccountNumber: "",
    channelPurchasedFrom: "0",
    productName: "",
    rating: 0,
    reviewTitle: "",
    reviewBody: "",
    assetId: "",
  };

  const [newReview, setNewReview] = useState<NewReview>({
    ...defaultReview,
  });

  const onFormChange = (event: any) => {
    const { name, value } = event?.target;

    switch (name) {
      case "channelPurchasedFrom":
        setNewReview((state) => ({
          ...state,
          [name]: value,
          businessWebsite: "",
          businessPhoneNumber: "",
          businessFacebookProfileName: "",
          businessAddress: "",
          businessSocialMediaProfile: "",
        }));
        break;
      case "businessBankName":
        if (value?.length > 0) {
          setNewReview((state) => ({
            ...state,
            [name]: value,
          }));
        } else {
          setNewReview((state) => ({
            ...state,
            [name]: value,
            businessBankAccountNumber: "",
          }));
        }
        break;
      case "businessBankAccountNumber":
        setNewReview((state) => ({
          ...state,
          [name]: value,
        }));
        if (value?.length > 0 && value?.length !== 10) {
          setErrors((state: any) => ({
            ...state,
            BusinessBankAccountNumber: [
              {
                errorMessage:
                  "Business bank account number must be 10 digits long",
              },
            ],
          }));
        }
        break;
      default:
        setNewReview((state) => ({
          ...state,
          [name]: value,
        }));
        break;
    }
    if (name !== "channelPurchasedFrom") {
      setNewReview((state) => ({
        ...state,
        [name]: value,
      }));
    } else {
      setNewReview((state) => ({
        ...state,
        businessWebsite: "",
        businessPhoneNumber: "",
        businessFacebookProfileName: "",
        businessAddress: "",
        businessSocialMediaProfile: "",
        [name]: value,
      }));
    }
  };

  const onFileUpload = (value: string) => {
    setNewReview((state) => ({
      ...state,
      assetId: value,
    }));
  };

  const onRateChange = (rating: number) => {
    setNewReview((state) => ({
      ...state,
      rating,
    }));
  };

  const validateAdditionalInfo = (review: NewReview) => {
    var isValid = true;

    if (
      review?.businessEmailAddress?.length > 1 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(review?.businessEmailAddress)
    ) {
      setErrors((state: any) => ({
        ...state,
        BusinessEmailAddress: [
          { errorMessage: "A valid Email address is required" },
        ],
      }));
      isValid = false;
    }

    if (
      review?.businessBankName?.length > 1 &&
      (!isNumeric(review?.businessBankAccountNumber) ||
        review?.businessBankAccountNumber?.length !== 10)
    ) {
      setErrors((state: any) => ({
        ...state,
        BusinessBankAccountNumber: [
          { errorMessage: "A valid account number of digits is required." },
        ],
      }));
      isValid = false;
    }

    return isValid;
  };

  const addReview = async (e: any) => {
    e.preventDefault();

    if (validateAdditionalInfo(newReview)) {
      var res = await addReviewAction(
        newReview,
        searchParams.get("businessId")?.length > 1 && selectedBusiness != null
          ? selectedBusiness?.id
          : "",
      );

      if (res?.status) {
        setNewReview({
          ...defaultReview,
        });

        searchParams.get("businessId")?.length > 1 && selectedBusiness != null
          ? navigate(`/businesses/${selectedBusiness?.id}`)
          : navigate("/businesses");
      } else {
        setErrors({ ...res?.errors });
      }
    } else {
      notification({
        title: "",
        message: "Please pass all required information",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    var id = searchParams.get("businessId");

    const updateReview = (data: Business) => {
      setNewReview((state: any) => ({
        ...state,
        businessName: data?.businessName,
        businessCategoryId: data?.businessCategoryId,
      }));
    };

    const getBusiness = async (id: string) => {
      var res = await getBusinessByIdAction(id);
      if (res?.status) {
        updateReview(res?.data?.data);
      }
    };

    if (id != null && id?.length > 0) {
      if (isObjectEmpty(selectedBusiness) || selectedBusiness?.id !== id) {
        getBusiness(id);
      } else {
        updateReview(selectedBusiness!);
      }
    } else {
      setNewReview({ ...defaultReview });
    }
  }, [searchParams.get("businessId")]);

  return (
    <div className="mx-auto mb-8 mt-[40px] w-11/12 md:w-4/5">
      <section className="flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/3">
          <p className="text-[14px] text-line">Step {steps} of 2</p>
          {(() => {
            switch (steps) {
              case 1:
                return (
                  <>
                    {searchParams.get("businessId")?.length > 1 &&
                    selectedBusiness != null ? (
                      <Link
                        to={`/businesses/${selectedBusiness?.id}`}
                        className="text-[24px] font-[600] text-white"
                      >
                        Review for{" "}
                        <span className="underline capitalize">
                          {selectedBusiness?.businessName}
                        </span>
                      </Link>
                    ) : (
                      <h3 className="text-[24px] font-[600] text-white">
                        Business Review
                      </h3>
                    )}
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

          <form onSubmit={addReview} className="my-[32px]">
            {steps === 1 && (
              <BusinessReviewForm
                formData={newReview}
                onChange={onFormChange}
                onSubmit={() => setSteps(2)}
                onRateChange={onRateChange}
                isExisting={
                  searchParams.get("businessId")?.length > 1 &&
                  selectedBusiness != null
                }
              />
            )}
            {steps === 2 && (
              <AdditionalInformationForm
                formData={newReview}
                onBack={() => setSteps(1)}
                onChange={onFormChange}
                onFileUpload={onFileUpload}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddReview;
