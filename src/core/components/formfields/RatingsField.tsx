import React from "react";
import { renderStars } from "core/helpers/renderStars";

interface Props {
  rating: number;
  checked?: boolean;
  onChange?: any;
  boxStyle?: string;
}

function RatingsField({
  boxStyle = "",
  checked,
  onChange = () => {},
  rating,
}: Props) {
  return (
    <div className={`mb-3 flex w-full items-center gap-2 ${boxStyle}`}>
      <input
        type="checkbox"
        name=""
        disabled
        checked={checked}
        onChange={onChange}
        className="h-[22px] w-[22px] rounded-[5px] !bg-black accent-brand disabled:cursor-not-allowed"
        id=""
      />
      <div className="flex items-center">{renderStars(rating)}</div>
      <span>({rating})</span>
    </div>
  );
}

export default RatingsField;
