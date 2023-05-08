import React from 'react';
import './actionButton.modules.scss';

function ActionButton({ children, onClick }) {
  return (
    <div>
      <button type="submit" className="button" onClick={() => onClick()}>{children}</button>
    </div>
  );
}

export default ActionButton;
