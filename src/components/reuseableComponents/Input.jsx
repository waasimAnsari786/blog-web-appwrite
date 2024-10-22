import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", myClass = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <input type={type} className={myClass} ref={ref} id={id} {...props} />
    </div>
  );
});

export default Input;
