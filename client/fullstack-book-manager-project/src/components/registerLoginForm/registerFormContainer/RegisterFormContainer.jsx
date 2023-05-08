import React from 'react';
import './registerFormContainer.modules.scss';

function RegisterFormContainer({ children }) {
  return (
    <div className="registerPage">
      <div className="registerForm">{children}</div>
    </div>
  );
}

export default RegisterFormContainer;
