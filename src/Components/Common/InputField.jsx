import React, { useState } from "react";

const InputField = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="mb-6">
      <label className="text-white text-[16px] max-sm:text-[12px] font-Inter font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="w-full bg-[#002E337D] border border-[#E1E1E1] text-white py-3 max-sm:py-2 px-5 rounded-sm font-Inter font-normal mt-2 max-sm:mt-1 placeholder:text-[#D0D0D0] focus:outline-none focus:border-buttonColor"
        />
      </div>
    </div>
  );
};

export default InputField;
