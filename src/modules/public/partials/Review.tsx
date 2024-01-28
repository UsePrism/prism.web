import TextField from "core/components/formfields/TextField";
import {
  comment,
  deleteIcon,
  editIcon,
  share,
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

export const Review = ({
  review,
  boxStyle = "",
  showForm = false,
  children = <></>,
}: {
  children?: any;
  showForm?: boolean;
  boxStyle?: string;
  review: Review;
}) => {
  const user = useUserStore((store) => store.user);
  const navigate = useNavigate();
  const likeReviewAction = useBusinessStore((store) => store.likeReview);
  const setSelectedReview = useBusinessStore(
    (store) => store.setSelectedReview,
  );
  const updateReviewAction = useBusinessStore((store) => store.updateReview);
  const deleteReviewAction = useBusinessStore((store) => store.deleteReview);

  const addCommentAction = useBusinessStore((store) => store.addComment);
  const deleteCommentAction = useBusinessStore((store) => store.deleteComment);
  const [newComment, setNewComment] = useState("");
  const [isActive, setIsActive] = useState(false);

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
    if (user?.firstName?.length > 0) {
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
    if (window.confirm(`Click 'OK' to delete review: ${review?.reviewTitle}`)) {
      await deleteReviewAction(review?.businessId, review?.id);
    }
  };

  // TODO: Add user check to determine access level for edit and delete

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`${borderline} bg-[#1a1a1a] transition-height delay-150 duration-300 ease-in-out hover:bg-black ${boxStyle}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={userImg} alt="" />
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
              setSelectedReview(review);
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
          <button className={reviewact}>
            <img src={share} alt="" />
            <p>
              {review?.totalShares}
              <span className="ml-1 hidden md:inline-block">
                {review?.totalShares > 1 ? "Shares" : "Share"}
              </span>
            </p>
          </button>
          {review?.reviewerId !== user?.id && (
            <>
              <button className={reviewact}>
                <img src={editIcon} alt="" />
                <p className="text-yellow-500">Edit</p>
              </button>
              <button
                onClick={() => deleteReview(review)}
                disabled={review?.reviewerId === user?.id}
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
  );
};
