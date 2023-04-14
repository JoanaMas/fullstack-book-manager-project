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

const HomePage = () => {
  const [openFeatures, setOpenFeatures] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenFeatures(!openFeatures);
  };

  return (
    <div className="homePage">
      <div>
        <div className="header">
          <div className="title">
            <h1>
              Change your book game - play smart with <span>BookSmart.</span>{" "}
            </h1>
            <button onClick={() => navigate(routes.registerPage)}>
              SIGN UP
            </button>
          </div>
          <div className="image"></div>
        </div>

        <div className="content">
          <HomePageCard>
            <h5>NEW BOOK MANAGER</h5>
            <h1>New way to manage your favorite reads.</h1>
          </HomePageCard>

          <HomePageCard backgroundColor={"featuresCardColor"}>
            <h5>EXPLORE NEW FEATURES</h5>

            <div class={openFeatures ? "none" : "progress"}>
              <div class="color"></div>
            </div>

            <div className={openFeatures ? "features" : "none"}>
              <h4>Store your books.</h4>
              <h4>Track reading progress.</h4>
              <h4>Write notes for each book!</h4>
            </div>

            <div className="exploreIcon">
              <p>Unlock features</p>
              <TravelExploreIcon
                onClick={handleClick}
                style={{ fontSize: "50pt", color: "white" }}
              />
            </div>
          </HomePageCard>

          <HomePageCard backgroundColor={"socialCardColor"}>
            <h5>HAVE SOME QUESTIONS?</h5>
              <h1>Contact Us!</h1>
            <div className="socialIcons">
              <div className="icon">
                <a href="mailto:bookSmart@gmail.com">
                  <MailOutlineIcon fontSize="large" />
                </a>
              </div>
              <div className="icon">
                <a href="tel:860-923-619">
                  <PhoneAndroidIcon fontSize="large" />
                </a>
              </div>
              <div className="icon">
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
