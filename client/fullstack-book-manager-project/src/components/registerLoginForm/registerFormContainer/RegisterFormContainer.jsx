import React from "react";
import "./registerFormContainer.modules.scss";

const RegisterFormContainer = ({ children }) => {
  return (
    <div className="registerPage"> 
      <div className="registerForm">{children}</div>
    </div>
  );
};

export default RegisterFormContainer;
