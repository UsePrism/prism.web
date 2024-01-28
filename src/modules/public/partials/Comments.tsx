export const Comments = ({ comment }: { comment?: Comment | null }) => {
  return (
    <div className="my-[28px] ml-[20px] border-l-[4px] border-l-[#A3A3A3] bg-[#303030] p-5 text-[#9ca3b5]">
      <div className="mb-[8px] font-bold text-white">
        <p>Comment by {comment?.commenterName}</p>
      </div>
      <p>{comment?.commentBody}</p>
    </div>
  );
};
