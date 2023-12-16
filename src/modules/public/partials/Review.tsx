import TextField from "core/components/formfields/TextField";
import { chats, comment, share, thumbup, userImg } from "core/consts/images";
import { borderline, reviewact } from "core/consts/styling";
import { renderStars } from "core/helpers/renderStars";
import { useState } from "react";

export const Review = ({ review }: { review: any }) => {
  const [newReview, setnewReview] = useState("");

  return (
    <div className={`my-[24px] ${borderline}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={userImg} alt="" />
          <div>
            <p className="font-[600] text-white">{review?.name}</p>
            <p className="text-[14px]">{review?.city}</p>
          </div>
        </div>
        <p>{review?.date}</p>
      </div>
      <div className="my-[18px] flex items-center">
        {renderStars(review?.rating)}
      </div>
      <h5 className="mb-2 text-[16px] font-[600] text-white">
        {review?.title}
      </h5>
      <p className="mb-[24px]">{review?.comment}</p>
      <div className="border-t-[.5px] border-t-[#344054] pt-5">
        <div className="flex items-center gap-2">
          <div className={reviewact}>
            <img src={comment} alt="" />
            <p>
              {review?.subcomments?.length}
              <span className="hidden md:inline-block ml-1">Comments</span>
            </p>
          </div>
          <div className={reviewact}>
            <img src={thumbup} alt="" />
            <p>
              {review?.no_of_likes}
              <span className="hidden md:inline-block ml-1">Likes</span>
            </p>
          </div>
          <div className={reviewact}>
            <img src={share} alt="" />
            <p>
              {review?.no_of_shares}
              <span className="hidden md:inline-block ml-1">Shares</span>
            </p>
          </div>
        </div>
        <div className="mt-[24px] flex w-full items-start gap-5 rounded-[5px] border border-[.5px] border-black-support px-4 py-3">
          <img src={userImg} alt="" />
          <TextField
            textareaStyle="bg-black !px-0 !w-full !border-0"
            boxStyle="w-full"
            label=""
            name="comments"
            value={newReview}
            placeholder="Write a comment here..."
            ref={null}
            onChange={(e: any) => {
              setnewReview(e?.target?.value);
            }}
            rows={1}
          />
        </div>
      </div>
    </div>
  );
};
