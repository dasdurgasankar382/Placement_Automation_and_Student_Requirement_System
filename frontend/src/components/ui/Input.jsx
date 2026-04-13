import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Input({
  label,
  type = "text",
  onChange,
  name,
  placeholder,
  value,
  required,
  options,
  readOnly,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "select") {
    return (
      <div className="relative mt-8">
        <select
          name={name}
          id={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          className="peer mt-1 w-full appearance-none border-b-2 border-gray-300 bg-transparent px-0 py-1 dark:bg-bg-dark-component dark:text-gray-100 focus:border-gray-500 focus:outline-none"
        >
          <option value="" disabled hidden>
            {placeholder || `Select ${label}`}
          </option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={name}
          className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-full text-sm text-gray-800 opacity-75"
        >
          {label}
        </label>
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            className="h-4 w-4 fill-current bg-transparent"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-6">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        {...props}
        className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
        required={required}
        // For password fields, toggle between text and password types
        {...(type === "password" && {
          type: showPassword ? "text" : "password",
        })}
      />
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 top-0 -translate-y-1/2 px-1 text-sm transition-all duration-200
        text-bg-light-secondary-text dark:text-bg-dark-secondary-text
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base 
        peer-focus:top-0 peer-focus:text-sm peer-focus:text-bg-light-primary-text 
        dark:peer-focus:text-bg-dark-primary-text

        ${readOnly ? "opacity-60 cursor-not-allowed" : ""}
      `}
      >
        {label}
      </label>
      {/* if type is password then hide and show password functionality can be added here  */}
      {type === "password" && (
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </span>
      )}
    </div>
  );
}
