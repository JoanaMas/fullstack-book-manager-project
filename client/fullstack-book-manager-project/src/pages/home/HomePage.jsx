import React from "react";
import "./homePage.scss";
// Icons
import HomePageCard from "../../components/homePageCard/HomePageCard";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Routes
import routes from "../../routes/routes";
// Components
import ActionButton from "../../components/actionButton/ActionButton";
import Header from "../../components/header/Header";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <div>
        <Header title={"Change your book game - play smart with"}>
          <ActionButton onClick={() => navigate(routes.registerPage)}>
            Sign Up
          </ActionButton>
        </Header>

        <div className="content">
          <HomePageCard>
            <h3>NEW BOOK MANAGER</h3>
            <h1 className="firstCardTitle">New way to manage your favorite reads.</h1>
          </HomePageCard>

          <HomePageCard>
            <h3>EXPLORE NEW FEATURES</h3>

            <h1>Manage books you are reading.</h1>
            <h1>Take favorite notes from your read.</h1>
            <h1>Create your book library.</h1>
          </HomePageCard>

          <HomePageCard>
            <h3>HAVE SOME QUESTIONS?</h3>
            <div className="socialIcons">
              <h1 className="contactUsTitle">Contact Us!</h1>
              <div className="icon email">
                <a href="mailto:bookSmart@gmail.com">
                  <MailOutlineIcon fontSize="large" />
                </a>
              </div>
              <div className="icon phone">
                <a href="tel:860-923-619">
                  <PhoneAndroidIcon fontSize="large" />
                </a>
              </div>
              <div className="icon facebook">
                <a href="https://www.facebook.com/">
                  <FacebookOutlinedIcon fontSize="large" />
                </a>
              </div>
            </div>
          </HomePageCard>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
