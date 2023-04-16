import React from "react";
import "./registerPage.scss";
import routes from "../../routes/routes";
import { useRef } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Components
import InputField from "../../components/inputFields/InputField";
import LeftFormSide from "../../components/registerLoginForm/leftSide/LeftFormSide";
import RightFormSide from "../../components/registerLoginForm/rightSide/RightFormSide";
import RegisterFormContainer from "../../components/registerLoginForm/registerFormContainer/RegisterFormContainer";
import ActionButton from "../../components/actionButton/ActionButton";

const RegisterPage = () => {

  // COLLECTING INPUT VALUES FOR REGISTRATION
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();

  // ERROR MESSAGE REDUCER
  const error = useSelector(store => store.error.value.error);
  const dispatch = useDispatch();

 const registerUser = () => {

    // VALIDATIONS


    const newUserData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      profilePicture: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserData)
    }

    fetch("http://localhost:4005/register", options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })

 }


  return (
    <>    
        <RegisterFormContainer>
        <LeftFormSide 
        title={"Create new account"} 
        question={"Already a member?"}
        route={routes.loginPage}
        linkText={"Log In"}
        />
        
        <RightFormSide>
            <InputField htmlFor={"name"} placeholder={"First name..."} type={"text"} id={"name"} inputRef={nameRef}>First name</InputField>
            <InputField htmlFor={"email"} placeholder={"Email..."} type={"email"} id={"email"} inputRef={emailRef}>Email</InputField>
            <InputField htmlFor={"password"} placeholder={"Password..."} type={"password"} id={"password"} inputRef={passwordRef}>Password</InputField>
            <InputField htmlFor={"passwordRepeat"} placeholder={"Repeat password..."} type={"password"} id={"passwordRepeat"} inputRef={passwordRepeatRef}>Repeat password</InputField>
            <ActionButton onClick={registerUser}>{"Sign Up"}</ActionButton>
        </RightFormSide>
        </RegisterFormContainer>
    </>
  );
};

export default RegisterPage;
