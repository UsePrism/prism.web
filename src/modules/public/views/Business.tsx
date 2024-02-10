/* eslint-disable no-template-curly-in-string */
import { caretright, locationimg, world } from "core/consts/images";
import { borderline, btn } from "core/consts/styling";
import { renderStars } from "core/helpers/renderStars";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Review } from "../partials/Review";
import useSystemStore from "core/services/stores/useSystemStore";
import useBusinessStore from "core/services/stores/useBusinessStore";
import { useEffect } from "react";
import Pagination from "core/components/Pagination";
import useUserStore from "core/services/stores/useUserStore";
import notification from "core/helpers/notification";

const Business = () => {
  const navigate = useNavigate();
  const user: any = useUserStore((store) => store.user);
  const categories = useBusinessStore((store) => store.categories);
  const getCategoriesAction = useBusinessStore((store) => store.getCategories);

  const { businessId } = useParams();
  const business = useBusinessStore((store) => store.selectedBusiness);
  const setSelectedBusiness = useBusinessStore(
    (store) => store.setSelectedBusiness,
  );

  const reviewList = useBusinessStore((store) => store.reviewList);
  const getReviewAction = useBusinessStore((store) => store.getBusinessReview);

  const toggleWaitListModal = useSystemStore(
    (store) => store.toggleWaitListModal,
  );

  const getReview = async () => {
    await getReviewAction(businessId!, {
      sortOrder: "",
      pageNumber: reviewList?.pagination?.CurrentPage,
      pageSize: reviewList?.pagination?.PageSize,
    });
  };

  const fetchMore = async (page: number) => {
    await getReviewAction(businessId!, {
      sortOrder: "",
      pageNumber: page,
      pageSize: reviewList?.pagination?.PageSize,
    });
  };

  useEffect(() => {
    if (categories?.length < 1) {
      getCategoriesAction();
    }

    if (reviewList?.reviews?.length < 1) {
      getReview();
    } else if (
      reviewList?.reviews?.length > 0 &&
      reviewList?.reviews[0]?.businessId !== businessId
    ) {
      getReview();
    }
  }, []);

  return (
    <>
      <div className="m-[0px] mx-auto mb-[34px] h-full w-11/12 overflow-hidden pt-[20px] md:w-4/5">
        <section className="mb-[28px]">
          <header className="flex items-center">
            <Link to="/home">Home</Link>
            <img src={caretright} alt="" loading="lazy" />
            <Link to="/businesses">Businesses</Link>
            <img src={caretright} alt="" loading="lazy" />
            <Link to={`/businesses?categoryId=${business?.businessCategoryId}`}>
              {
                categories?.find((x) => x.id === business?.businessCategoryId)
                  ?.name
              }
            </Link>
            <img src={caretright} alt="" loading="lazy" />
            <span className="text-white">{business?.businessName}</span>
          </header>
        </section>
        <section className="mb-[28px] flex flex-col gap-5 lg:flex-row">
          {/*
        <div className={`w-full lg:w-3/4`}>
          <div className={`${borderline} !px-0 !py-0`}>
            <div className="h-[160px] border-b-[.5px] border-b-[#344054] bg-shade"></div>
            <div className="px-5 pb-8 pt-5">
              <img
                src={businesslogo}
                alt=""
                className="mt-[-75px] inline-block rounded-full"
              />
              <p className="mb-1 mt-5 text-white">Burger King</p>
              <p className="mb-1 text-[14px] text-line">Food and Dining</p>
              <div className="my-[12px] flex items-center gap-[5px]">
                <img src={locationimg} alt="" />
                <p className="mr-[20px] text-[14px]">Ikeja, Lagos.</p>
                <p className="text-[14px]">
                  Rating <span>5.0</span>
                </p>
                <img src={starFull} alt="" className="h-[14px] w-[14px]" />
              </div>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                rerum blanditiis temporibus, maxime accusamus quaerat error
                facere nam ab rem?
              </p>
            </div>
          </div>
        </div>*/}

          <div className="w-full lg:w-1/4">
            {/*
              TODO: Make section reuseable
            */}
            <div
              className={`${borderline} w-full overflow-hidden bg-shade !pb-8`}
            >
              <h5 className="mb-[6px] hidden text-[24px] font-[500] text-white lg:block">
                {business?.businessName}
              </h5>
              <button
                onClick={() => toggleWaitListModal(true)}
                className="text-[14px] text-brand"
              >
                Own this business? Claim
              </button>
              <div className="relative my-[24px] flex w-full items-center justify-start gap-2">
                <div className="flex items-center rounded-[5px] bg-[#344054] p-[8px]">
                  {renderStars(+business?.averageRating!)}
                </div>
                <p className="text-[14px]">
                  <span className="mr-1 font-bold">
                    {business?.averageRating}
                  </span>
                  {business?.totalReviews! > 0 && (
                    <span>
                      ({business?.totalReviews}{" "}
                      {business?.totalReviews! > 1 ? "Reviews" : "Review"})
                    </span>
                  )}
                </p>
              </div>
              {business && business?.businessAddress?.length > 0 && (
                <div className="mb-[12px] flex items-center gap-[5px]">
                  <img src={locationimg} alt="" />
                  <p className="text-[14px]">{business?.businessAddress}</p>
                </div>
              )}
              {business && business?.businessWebsite?.length > 0 && (
                <div className="mb-[16px] flex items-center gap-[5px] overflow-hidden">
                  <img src={world} alt="" />
                  <a
                    href={business?.businessWebsite}
                    className="text-[14px] text-brand underline"
                  >
                    {business?.businessWebsite}
                  </a>
                </div>
              )}
              <div className="flex w-full items-center">
                <button
                  className={`${btn} bg-brand py-[8px] text-white`}
                  onClick={() => {
                    if (user.id?.length < 1) {
                      return notification({
                        type: "warning",
                        message: "Please login before you can add a review",
                      });
                    } else {
                      setSelectedBusiness({ ...business! });
                      navigate(`/review?businessId=${business?.id}`);
                    }
                  }}
                >
                  Write a Review
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <p className="text-[24px] font-[600] text-white">
              {business?.totalReviews}{" "}
              {business?.totalReviews! > 1 ? "Reviews" : "Review"}
            </p>
            <div>
              {reviewList?.reviews?.length > 0 ? (
                reviewList?.reviews?.map((review: any, index: number) => (
                  <Review boxStyle="my-[24px]" review={review} key={index} />
                ))
              ) : (
                <div className="my-[24px]">
                  <p>No review for this business</p>
                </div>
              )}
            </div>

            <Pagination
              pagination={reviewList?.pagination}
              onFetch={fetchMore}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Business;
