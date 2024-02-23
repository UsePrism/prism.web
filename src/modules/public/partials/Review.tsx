import Modal from "core/components/Modal";
import InputField from "core/components/formfields/InputField";
import TextField from "core/components/formfields/TextField";
import {
  comment,
  deleteIcon,
  editIcon,
  share,
  starEmpty,
  starFull,
  thumbup,
  userImg,
} from "core/consts/images";
import { borderline, btn, reviewact } from "core/consts/styling";
import { formatDate } from "core/helpers/generalHelpers";
import notification from "core/helpers/notification";
import { renderStars } from "core/helpers/renderStars";
import useBusinessStore from "core/services/stores/useBusinessStore";
import useUserStore from "core/services/stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: any;
  showForm?: boolean;
  boxStyle?: string;
  review: Review;
  isSingleView?: boolean;
}

export const Review = ({
  review,
  isSingleView = false,
  boxStyle = "",
  showForm = false,
  children = <></>,
}: Props) => {
  const user: any = useUserStore((store) => store.user);
  const navigate = useNavigate();
  const likeReviewAction = useBusinessStore((store) => store.likeReview);
  const updateReviewAction = useBusinessStore((store) => store.updateReview);
  const deleteReviewAction = useBusinessStore((store) => store.deleteReview);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const addCommentAction = useBusinessStore((store) => store.addComment);
  const [newComment, setNewComment] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [updatedReview, setUpdatedReview] = useState<UpdateReview>({
    rating: review?.rating,
    reviewBody: review?.reviewBody,
    reviewTitle: review?.reviewTitle,
  });

  const onFormChange = (e: any) => {
    const { name, value } = e?.target;

    setUpdatedReview((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<any>([]);

  const validateUpdatedReview = (review: UpdateReview) => {
    var isValid = true;

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
            errorMessage: "Please descripe your ordeal",
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

  const likeReview = async (businessId: string, reviewId: string) => {
    if (user?.firstName?.length > 0) {
      await likeReviewAction(businessId, reviewId);
    } else {
      notification({
        message: "Please login to like a review",
        type: "warning",
      });
    }
  };

  const validateNewComment = (user: any, comment: string) => {
    if (user?.userId?.length > 0) {
      if (newComment?.length < 1) {
        notification({
          message: "Comment is required",
          type: "warning",
        });
        return false;
      }
    } else {
      notification({
        message: "Please login to leave a comment",
        type: "warning",
      });
      return false;
    }

    return true;
  };

  const addComment = async (e: any) => {
    e.preventDefault();
    showForm = true;

    if (validateNewComment(user, newComment)) {
      var res = await addCommentAction(
        review?.businessId,
        review?.id,
        newComment,
      );

      if (res?.status) setNewComment("");
    }
  };

  const deleteReview = async (review: Review) => {
    if (user?.userId !== review?.reviewerId) return;

    if (window.confirm(`Click 'OK' to delete review: ${review?.reviewTitle}`)) {
      const businessId = review?.businessId;

      var res = await deleteReviewAction(businessId, review?.id);
      if (res?.status && isSingleView) {
        navigate(`/businesses/${businessId}`);
      }
    }
  };

  const editReview = async (e: any) => {
    e.preventDefault();

    if (validateUpdatedReview(updatedReview)) {
      var res = await updateReviewAction(
        review?.businessId,
        review?.id,
        updatedReview,
      );
      if (res?.status) {
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

  return (
    <>
      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        className={`${borderline} bg-[#1a1a1a] transition-height delay-150 duration-300 ease-in-out hover:bg-black ${boxStyle}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full border-[3px] border-white bg-[#2da11e] p-2 text-[16px] uppercase text-white">
              {review?.reviewerName?.slice(0, 2)}
            </div>
            <div>
              <p className="font-[600] capitalize text-white">
                {review?.reviewerName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[14px]">
            {review?.hasBeenEdited && (
              <p className="rounded-[5px] border border-[.5px] border-[#344054] px-2 py-1">
                Edited
              </p>
            )}
            <p>{formatDate(review?.createdAt)}</p>
          </div>
        </div>
        <div className="my-[18px] flex items-center">
          {renderStars(review?.rating)}
        </div>
        <h5 className="mb-2 text-[16px] font-[600] text-white">
          {review?.reviewTitle}
        </h5>
        <p className="mb-[24px]">{review?.reviewBody}</p>
        <div className="relative border-t-[.5px]  border-t-[#344054] pt-5">
          <div className="flex items-center gap-2">
            <button
              className={`${reviewact} !mr-5`}
              onClick={() => {
                navigate(
                  `/businesses/${encodeURIComponent(
                    review?.businessId,
                  )}/${review?.id}/comments`,
                );
              }}
            >
              <img src={comment} alt="" />
              <p>
                {review?.totalComments}
                <span className="ml-1 hidden md:inline-block">
                  {review?.totalComments > 1 ? "Comments" : "Comment"}
                </span>
              </p>
            </button>
            <button
              onClick={() => likeReview(review?.businessId, review?.id)}
              className={reviewact}
            >
              <img src={thumbup} alt="" />
              <p>
                {review?.totalLikes}
                <span className="ml-1 hidden md:inline-block">
                  {review?.totalLikes > 1 ? "Likes" : "Like"}
                </span>
              </p>
            </button>
            <button className={reviewact} disabled>
              <img src={share} alt="" />
              <p>
                {review?.totalShares}
                <span className="ml-1 hidden md:inline-block">
                  {review?.totalShares > 1 ? "Shares" : "Share"}
                </span>
              </p>
            </button>
            {review?.reviewerId === user?.userId && (
              <>
                <button
                  className={reviewact}
                  onClick={() => setShowUpdateModal(true)}
                  disabled={review?.reviewerId !== user?.userId}
                >
                  <img src={editIcon} alt="" />
                  <p>Edit</p>
                </button>
                <button
                  onClick={() => deleteReview(review)}
                  disabled={review?.reviewerId !== user?.userId}
                  className={reviewact}
                >
                  <img src={deleteIcon} alt="" />
                  <p className="text-red-500">Delete</p>
                </button>
              </>
            )}
          </div>

          <div className="mt-[24px]">{children}</div>

          <form onSubmit={addComment} className="w-full">
            <div className="mt-[24px] flex w-full items-start gap-5 rounded-[5px] border border-[.5px] border-black-support px-4 py-3">
              <img src={userImg} alt="" />
              <TextField
                textareaStyle={`bg-transparent !px-0 !w-full !border-0`}
                boxStyle="w-full"
                name="newComment"
                disabled={user?.userId?.length < 1}
                value={newComment}
                placeholder="Write a comment here..."
                ref={null}
                onChange={(e: any) => {
                  setNewComment(e?.target?.value);
                }}
                rows={1}
              />
            </div>
            <div className="mt-5 flex w-full justify-end">
              <button
                className={`${btn} border-1 border border-brand bg-brand text-white`}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {showUpdateModal && (
        <Modal header="Edit Review" onClose={() => setShowUpdateModal(false)}>
          <form onSubmit={editReview} className="mt-[25px]">
            <div className="mb-[25px]">
              <label htmlFor="" className={`text-[14px] text-line`}>
                Tap the star to rate your experience{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex items-center justify-center gap-10">
                {[1, 2, 3, 4, 5].map((rate: number, index: number) => (
                  <img
                    src={updatedReview.rating >= rate ? starFull : starEmpty}
                    alt={`${rate}`}
                    className="h-[20px] w-[20px]"
                    key={index + rate}
                    onClick={() => {
                      setUpdatedReview((state) => ({
                        ...state,
                        rating: rate,
                      }));
                      setErrors((state: any) => ({
                        ...state,
                        Rating: "",
                      }));
                    }}
                  />
                ))}
              </div>
              {errors?.Rating?.length > 0 &&
                errors?.Rating?.slice(0, 1)?.map(
                  (error: any, index: number) => (
                    <span
                      key={index}
                      className="duration-2000 mt-1 block  text-[12px] text-red-500 transition-all ease-in-out"
                    >
                      {error?.errorMessage}
                    </span>
                  ),
                )}
            </div>

            <InputField
              boxStyle="mb-[25px]"
              label="Review Title"
              name="reviewTitle"
              type="text"
              placeholder="e.g Fantastic business"
              value={updatedReview?.reviewTitle}
              isRequired
              onChange={(e: any) => onFormChange(e)}
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
              value={updatedReview?.reviewBody}
              onChange={(e: any) => onFormChange(e)}
              rows={1}
              errors={errors?.ReviewBody}
              onBlur={() =>
                setErrors((state: any) => ({
                  ...state,
                  ReviewBody: "",
                }))
              }
            />

            <button className="mt-3 w-full rounded-[8px] bg-brand py-[14px] text-brand-white">
              Submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};
