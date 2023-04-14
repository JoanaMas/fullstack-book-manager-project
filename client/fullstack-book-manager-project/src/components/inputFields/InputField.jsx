import React from "react";
import "./inputField.scss";

const InputField = ({children, type, placeholder, htmlFor, id}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{children}</label>
      <input type={type} placeholder={placeholder} id={id} />
    </div>
  );
};

export default InputField;
