import React from "react";

const Input = React.forwardRef(
  ({ type, value, onChange, placeholder, className }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-white focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none leading-normal mb-4 md:mb-0 ${className}`}
      />
    );
  }
);

export default Input;
