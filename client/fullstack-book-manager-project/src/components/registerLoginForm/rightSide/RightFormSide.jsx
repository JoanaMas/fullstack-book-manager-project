import React from 'react';
import './rightFormSide.modules.scss';


const RightFormSide = ({ children }) => {
  return (
    <div className="rightSide">
    <h3>Please enter your information</h3>

    <div className="inputFields">
        
        {children}

    </div>
  </div>
  );
};

export default RightFormSide;