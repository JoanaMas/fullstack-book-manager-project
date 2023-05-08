import React from 'react';
import './header.modules.scss';

function Header({ children, title }) {
  return (
    <div className="header">
      <div className="title">
        <h1>
          {title}
          <span>BookSmart.</span>
        </h1>
        {children}
      </div>
      <div className="image" />
    </div>
  );
}

export default Header;
