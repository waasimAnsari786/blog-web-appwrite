import React, { useId } from "react";

function Select({ label, options, myClass = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select name="" id={id} ref={ref} {...props} className={myClass}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
