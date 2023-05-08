import React from 'react';
import './logo.modules.scss';
import logo from '../../assets/logo.jpg';

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="" />
      <div>BookSmart.</div>
    </div>
  );
}

export default Logo;
