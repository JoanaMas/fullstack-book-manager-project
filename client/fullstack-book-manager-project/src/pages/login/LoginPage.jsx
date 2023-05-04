import React from 'react';
import './loginPage.modules.scss';
import axios from 'axios';
import routes from '../../routes/routes';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { changeErrorMessage } from "../../redux/error";
import { setCurrentUser } from '../../redux/user';
// Components
import InputField from "../../components/inputFields/InputField";
import LeftFormSide from "../../components/registerLoginForm/leftSide/LeftFormSide";
import RightFormSide from "../../components/registerLoginForm/rightSide/RightFormSide";
import RegisterFormContainer from "../../components/registerLoginForm/registerFormContainer/RegisterFormContainer";
import ActionButton from '../../components/actionButton/ActionButton';

const LoginPage = () => {

   // COLLECTING INPUT VALUES FOR REGISTRATION
  const emailRef = useRef();
  const passwordRef = useRef();

  // NAVIGATION
  const navigate = useNavigate();

   // ERROR MESSAGE REDUCER
   const error = useSelector((store) => store.error.value.error);
   const dispatch = useDispatch();

  const loginUser = () => {

    const existingUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    // SENDING DATA TO BACK-END
      axios
      .post("http://localhost:4005/login", existingUser)
      .then(res => {
        if(res.data.error) return;
        else {
          dispatch(setCurrentUser(res.data.user))
          navigate('/profile/'+res.data.user._id)
        }
      })
      .catch(error => {
        dispatch(changeErrorMessage(error.response.data.error))
      })
  }


  return (
    <>
    <RegisterFormContainer>

    <div className='left'>
      <RightFormSide>
        <InputField htmlFor={"email"} placeholder={"Email..."} type={"email"} id={"email"} inputRef={emailRef}>Email</InputField>
        <InputField htmlFor={"password"} placeholder={"Password..."} type={"password"} id={"password"} inputRef={passwordRef}>Password</InputField>
        <ActionButton onClick={loginUser}>{"Log In"}</ActionButton>
        {error}
      </RightFormSide>
    </div>

      <LeftFormSide
        title={"Members Log In"}
        question={'Not a member yet?'}
        route={routes.registerPage}
        linkText={"Sign Up."}
      />
    </RegisterFormContainer>
    </>
  );
};

export default LoginPage;