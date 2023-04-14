import React from 'react';
import './rightFormSide.scss';
// Components
import InputField from '../../inputFields/InputField';
import ActionButton from '../../actionButton/ActionButton';

const RightFormSide = ({ children, buttonText }) => {
  return (
    <div className="rightSide">
    <h3>Please enter your information</h3>

    <div className="inputFields">
        
        {children}

      <div>
        <ActionButton>{buttonText}</ActionButton>
      </div>

    </div>
  </div>
  );
};

export default RightFormSide;