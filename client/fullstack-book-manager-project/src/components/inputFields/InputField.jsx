import React from 'react';
import './inputField.modules.scss';

function InputField(props) {
  return (
    <div>
      <label htmlFor={props.htmlFor}>{props.children}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        ref={props.inputRef}
        min={props.min}
      />
    </div>
  );
}

export default InputField;
