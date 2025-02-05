import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";

const InputField = ({ label, type, placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6">
      <label className="text-white text-[16px] max-sm:text-[12px] font-Inter font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="w-full bg-[#002E337D] border border-[#E1E1E1] text-white py-3 max-sm:py-2 px-5 rounded-sm font-Inter font-normal mt-2 max-sm:mt-1 placeholder:text-[#D0D0D0] focus:outline-none focus:border-buttonColor"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-2">
            {showPassword ? (
              <EyeOff className="text-[#D0D0D0]" size={20} />
            ) : (
              <Eye className="text-[#D0D0D0]" size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
