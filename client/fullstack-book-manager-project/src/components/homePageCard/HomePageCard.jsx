import React from "react";
import './homePageCard.scss'

const HomePageCard = ({children, backgroundColor}) => {
  return (
    <div className={`card ${backgroundColor}`}>
      {children}
    </div>
  );
};

export default HomePageCard;
