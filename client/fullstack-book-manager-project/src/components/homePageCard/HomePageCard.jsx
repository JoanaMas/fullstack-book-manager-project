import React from "react";
import './homePageCard.modules.scss'

const HomePageCard = ({children}) => {
  return (
    <div className={`card`}>
      {children}
    </div>
  );
};

export default HomePageCard;
