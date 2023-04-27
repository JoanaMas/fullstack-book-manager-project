import React from "react";
import "./inputField.modules.scss";

const InputField = ({ children, type, placeholder, htmlFor, id, inputRef }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{children}</label>
      <input type={type} placeholder={placeholder} id={id} ref={inputRef} />
    </div>
  );
};

export default InputField;
