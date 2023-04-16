import React from "react";
import "./navbar.scss";
import Logo from "../logo/Logo";
import routes from "../../routes/routes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
  // Null user to fix design
  const user = useSelector((state) => state.users.value.user);

  return (
    <div className="navbar">
      <Logo />

      <div className="links">
        <div className="icons">
          <Link to={routes.homePage}>
            <HomeOutlinedIcon fontSize="large" className="homeIcon" />
          </Link>
          
          {!user && (
            <Link>
              <Person2OutlinedIcon fontSize="large" className="homeIcon" />
            </Link>
          )}
        </div>

        <div className="authLinks">
          <div className="login">
            <Link
              to={routes.loginPage}
              style={{ textDecoration: "none", color: "black" }}
            >
              LOG IN
            </Link>
          </div>
          <div className="signUp">
            <Link
              to={routes.registerPage}
              style={{ textDecoration: "none", color: "white" }}
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
