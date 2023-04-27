import React from 'react';
import './leftFormSide.modules.scss';

const LeftFormSide = ({ title, question, route, linkText }) => {
  return (
    <div className="leftSide">
    <h1>
      {title}<span>.</span>
    </h1>
    <div className="logIn">
      <h2>
        {question}
        <span>
          <a href={route}> {linkText} </a>
        </span>
      </h2>
    </div>
  </div>
  );
};

export default LeftFormSide;