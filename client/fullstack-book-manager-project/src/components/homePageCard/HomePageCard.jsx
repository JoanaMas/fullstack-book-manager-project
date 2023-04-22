import React from "react";
import './homePageCard.scss'

const HomePageCard = ({children}) => {
  return (
    <div className={`card`}>
      {children}
    </div>
  );
};

export default HomePageCard;
