"use client";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  css?: string;
  value: string;
  readonly?: boolean;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  autoComplete?: string; // Added autoComplete prop
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  name,
  readonly,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  min,
  max,
  autoComplete, // Destructuring autoComplete prop
}) => {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  //   console.log(error)

  return (
    <div className="flex flex-col gap-2">
      <label className="label-class" htmlFor={name}>
        {label}
      </label>
      <div className="relative w-full">
        <input
          min={min}
          max={max}
          readOnly={readonly}
          id={name}
          name={name}
          type={view && type === "password" ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`input-class ${
            error &&
            "border-2 border-danger text-danger"
          }`}
        />
        {type === "password" && (
          <div className="absolute right-4 top-3">
            {!view ? (
              <Eye onClick={handleView} className="text-[#00000066]" />
            ) : (
              <EyeOff onClick={handleView} className="text-[#00000066]" />
            )}
          </div>
        )}
        {name !== "passwod" && error && (
          <div className="mt-1 flex items-center gap-1 text-title-sm font-bold text-danger">
            <CircleAlert size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
