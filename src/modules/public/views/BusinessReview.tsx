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
import { Comments } from "../partials/Comments";
import useUserStore from "core/services/stores/useUserStore";
import notification from "core/helpers/notification";

const BusinessReview = () => {
  const categories = useBusinessStore((store) => store.categories);
  const user: any = useUserStore((store) => store.user);
  const getCategoriesAction = useBusinessStore((store) => store.getCategories);
  const navigate = useNavigate();

  const { businessId } = useParams();
  const { reviewId } = useParams();

  const business = useBusinessStore((store) => store.selectedBusiness);
  const setSelectedBusiness = useBusinessStore(
    (store) => store.setSelectedBusiness,
  );

  const review = useBusinessStore((store) => store.selectedReview);

  const commentList = useBusinessStore((store) => store.commentList);
  const getCommentAction = useBusinessStore((store) => store.getComments);

  const toggleWaitListModal = useSystemStore(
    (store) => store.toggleWaitListModal,
  );

  const getComments = async () => {
    await getCommentAction({
      businessId: businessId!,
      reviewId: reviewId!,
      pageNumber: commentList?.pagination?.CurrentPage,
      pageSize: commentList?.pagination?.PageSize,
    });
  };

  const fetchMore = async (page: number) => {
    await getCommentAction({
      businessId: businessId!,
      reviewId: reviewId!,
      pageNumber: page,
      pageSize: commentList?.pagination?.PageSize,
    });
  };

  useEffect(() => {
    review === null && navigate(`/businesses/${business?.id}`);
  }, []);

  useEffect(() => {
    if (categories?.length < 1) {
      getCategoriesAction();
    }

    if (commentList?.comments?.length < 1) {
      getComments();
    } else if (
      commentList?.comments?.length > 0 &&
      commentList?.comments[0]?.businessId !== businessId &&
      commentList?.comments[0]?.reviewId !== reviewId
    ) {
      getComments();
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
            <Link to={`/businesses/${business?.id}`} className="text-white">
              {business?.businessName}
            </Link>
          </header>
        </section>
        <section className="mb-[28px] flex flex-col gap-5 lg:flex-row">
          <div className="w-full lg:w-1/4">
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
                  {renderStars(+business?.averageRating!, "w-[18px] h-[18px]")}
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
              {commentList?.comments?.length}{" "}
              {commentList?.comments?.length > 1 ? "Comments" : "Comment"}
            </p>

            <Review
              boxStyle="my-[24px] hover:!bg-[#1a1a1a]"
              review={review!}
              showForm
            >
              {commentList?.comments?.length > 0 ? (
                commentList?.comments?.map((comment) => (
                  <Comments comment={comment} key={comment?.id} />
                ))
              ) : (
                <div className="my-[28px]">
                  <p>No comment on this review</p>
                </div>
              )}
            </Review>

            <Pagination
              pagination={commentList?.pagination}
              onFetch={fetchMore}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default BusinessReview;
