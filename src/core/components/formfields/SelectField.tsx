import React from "react";

function SelectField({
  boxStyle = "",
  selectStyle = "",
  value = "",
  name = "",
  options = [],
  disabled = false,
  onChange = () => {},
  label = "Select",
  error = "",
  defaultName = "",
  defaultValue = "",
  isRequired = false,
}: {
  boxStyle?: string;
  selectStyle?: string;
  value?: any;
  name?: string;
  options?: any;
  disabled?: boolean;
  onChange?: any;
  label?: string;
  error?: any;
  defaultName?: string;
  defaultValue?: string;
  isRequired?: boolean;
}) {
  return (
    <div className={`${boxStyle}`}>
      {label && label?.length > 0 && (
        <label htmlFor={name} className="text-[14px] text-line">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-[5px] border border-[.5px] border-line bg-shade px-4 py-3 text-sm text-white outline-none ${selectStyle}`}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        <option key={defaultValue} value={defaultValue}>
          {defaultName}
        </option>
        {options &&
          options?.length > 0 &&
          options?.map((option: any) => (
            <option className="py-3" key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      {error.length > 1 ? <span>{error}</span> : null}
    </div>
  );
}

export default SelectField;
