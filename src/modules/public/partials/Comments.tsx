import { deleteIcon } from "core/consts/images";
import { reviewact } from "core/consts/styling";
import useBusinessStore from "core/services/stores/useBusinessStore";
import useUserStore from "core/services/stores/useUserStore";
import { useEffect } from "react";

export const Comments = ({ comment }: { comment?: Comment | null }) => {
  const user = useUserStore((store) => store.user);
  const deleteCommentAction = useBusinessStore((store) => store.deleteComment);

  const deleteComment = async (comment: Comment) => {
    if (window.confirm(`Click 'OK' to delete comment`)) {
      await deleteCommentAction(
        comment?.businessId,
        comment?.reviewId,
        comment?.id,
      );
    }
  };

  return (
    <div className="my-[28px] ml-[20px] overflow-hidden border-l-[4px] border-l-[#A3A3A3] bg-[#303030] p-5 text-[#9ca3b5]">
      <div className="mb-[16px] flex items-center justify-between text-white">
        <p className="font-bold">Comment by {comment?.commenterName}</p>
        {comment?.commenterId !== user?.id && (
          <button
            onClick={() => deleteComment(comment!)}
            disabled={comment?.commenterId === user?.id}
            className={`${reviewact} !w-auto`}
          >
            <img src={deleteIcon} alt="" />
            <p>Delete</p>
          </button>
        )}
      </div>
      <p className="text-wrap text-ellipsis">{comment?.commentBody}</p>
    </div>
  );
};
