import { reSizeField } from "core/helpers/resizeField";
import React, { useRef } from "react";

function TextField({
  boxStyle = "",
  textareaStyle = "",
  value = "",
  name = "",
  disabled = false,
  onChange = () => {},
  label = "",
  ref = null,
  rows = 3,
  error = "",
  enableAction = false,
  placeholder = "",
  isRequired = false,
}: {
  boxStyle?: string;
  textareaStyle?: string;
  value: string;
  name: string;
  disabled?: boolean;
  onChange?: any;
  label?: string;
  ref?: any;
  rows?: number;
  error?: string;
  enableAction?: boolean;
  placeholder?: string;
  isRequired?: boolean;
}) {
  const textAreaRef = useRef(ref);

  reSizeField(textAreaRef.current, value);

  return (
    <div className={`relative ${boxStyle}`}>
      {label && label?.length > 0 && (
        <label htmlFor={name} className="text-[14px] text-line">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}{" "}
      <textarea
        className={`${
          label && label?.length > 0 ? "!mt-2" : ""
        } rounded-[5px] border border-[.5px] border-line px-5 py-3 text-sm text-white outline-none ${textareaStyle}`}
        placeholder={placeholder}
        name={name}
        value={value}
        ref={textAreaRef}
        rows={rows}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default TextField;
