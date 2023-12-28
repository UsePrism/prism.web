// Custom components
import React from "react";

function InputField({
  id = "",
  label = "",
  placeholder = "",
  state = "",
  disabled = false,
  type = "text",
  name = "",
  isRequired = false,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  value,
  errors = [],
  dataList = [],
  dataListId = "",
  instruction = "",
  boxStyle = "",
  inputStyle = "",
}: {
  id?: string;
  label?: string;
  placeholder?: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  isRequired?: boolean;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  value?: string;
  errors?: string[];
  dataList?: any;
  dataListId?: string;
  instruction?: string;
  boxStyle?: string;
  inputStyle?: string;
}) {
  const uniqueId =
    id != null && id.length > 0 ? id : Math.random().toString(36).substring(2);

  return (
    <div className={`${boxStyle}`}>
      {label && label?.length > 0 && (
        <label htmlFor={uniqueId} className={`text-[14px] text-line`}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        disabled={disabled}
        type={type}
        id={uniqueId}
        autoComplete="on"
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        list={dataListId}
        aria-autocomplete="none"
        className={`${
          label && label?.length > 0 ? "!mt-2" : ""
        } flex h-12 w-full items-center justify-center rounded-[5px] border border-[.5px] border-line bg-shade px-4 py-3 text-sm text-white outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100"
            : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400"
              : state === "success"
                ? "border-green-500 text-green-500 placeholder:text-green-500"
                : "border-line"
        } ${inputStyle}`}
      />

      {dataList?.length > 0 && (
        <datalist id={dataListId}>
          {dataList.map((data: any) => (
            <option key={data?.value} value={data?.value}>
              {data?.name}
            </option>
          ))}
        </datalist>
      )}

      <span className="text-xs text-line">{instruction}</span>
      {errors?.length > 0 &&
        errors?.slice(0, 1)?.map((error: any, index: number) => (
          <span
            key={index}
            className="duration-2000 mt-1 block  text-[12px] text-red-500 transition-all ease-in-out"
          >
            {error?.errorMessage}
          </span>
        ))}
    </div>
  );
}

export default InputField;
