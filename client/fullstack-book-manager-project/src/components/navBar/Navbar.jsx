import React from "react";
import "./navbar.modules.scss";
import "../../style/_style.scss";
import Logo from "../logo/Logo";
import routes from "../../routes/routes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user";


const Navbar = () => {

  const user = useSelector((state) => state.users.value.currentUser);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <Logo />

      <div className="links">
        <div className="icons">
          <Link to={routes.homePage}>
            <HomeOutlinedIcon fontSize="large" className="homeIcon" />
          </Link>
          
          {user && (
            <Link to={"/profile/"+user._id}>
              <Person2OutlinedIcon fontSize="large" className="homeIcon" />
            </Link>
          )}
        </div>

        <div className="authLinks">
          <div className="login">
            <Link
              onClick={user ?? dispatch(setCurrentUser(null))}
              to={routes.loginPage}
              
              style={{ 
                textDecoration: "none", 
                color: "black",
                paddingLeft: user ? "0" : "20px" 
              }}
            >
              {user ? "LOG OUT" : "LOG IN"}
            </Link>
          </div>
          <div className={user ? "d-none" : "signUp"}>
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
