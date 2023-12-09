// Custom components
import React from "react";

function InputField(props: {
  id: string;
  label: string;
  extra: string;
  placeholder?: string;
  variant?: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  value?: string | number;
  error?: string;
  dataList?: any;
  enableDataList?: boolean;
  list?: string;
  showLabel?: boolean;
  instruction?: string;
}) {
  const {
    name,
    onChange,
    onFocus,
    onBlur,
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    value,
    error,
    dataList = [],
    enableDataList = false,
    list,
    showLabel = true,
    instruction,
  } = props;

  return (
    <div className={`${extra}`}>
      {showLabel && (
        <label htmlFor={id} className={`text-[14px] text-line`}>
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        type={type}
        id={id}
        autoComplete="on"
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        list={list}
        aria-autocomplete="none"
        className={`bg-shade mt-2 flex h-12 w-full items-center justify-center rounded-[5px] border border-[.5px] border-line py-3 px-4 text-sm text-white outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100"
            : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400"
              : state === "success"
                ? "border-green-500 text-green-500 placeholder:text-green-500"
                : "border-line"
        }`}
      />
      {enableDataList && dataList?.length > 0 && (
        <datalist id={list}>
          {dataList.map((data: any) => (
            <option key={data?.value} value={data?.value}>
              {data?.name}
            </option>
          ))}
        </datalist>
      )}
      <span className="text-xs text-line">{instruction}</span>
      <span className="text-red-500 ">{error}</span>
    </div>
  );
}

export default InputField;
