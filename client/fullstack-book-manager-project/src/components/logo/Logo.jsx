import React from 'react';
import './logo.scss';
import logo from '../../assets/logo.jpg';

const Logo = () => {
  return (
        <div className='logo'>
            <img src={logo} alt="" />
            <div>BookSmart.</div>
        </div>
  );
};

export default Logo;