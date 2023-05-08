import React from 'react';
import './leftFormSide.modules.scss';

function LeftFormSide(props) {
  return (
    <div className="leftSide">
      <h1>
        {props.title}
        <span>.</span>
      </h1>
      <div className="logIn">
        <h2>
          {props.question}
          <span>
            <a href={props.route}>
              {props.linkText}
            </a>
          </span>
        </h2>
      </div>
    </div>
  );
}

export default LeftFormSide;
