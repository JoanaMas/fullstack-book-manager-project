import React from "react";
import "./actionButton.modules.scss";

const ActionButton = ({children, onClick}) => {
  return (
    <div>
      <button className="button" onClick={() => onClick()}>{children}</button>
    </div>
  );
};

export default ActionButton;
