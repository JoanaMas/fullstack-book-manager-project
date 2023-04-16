import React from "react";
import "./registerPage.scss";
import routes from "../../routes/routes";
// Components
import InputField from "../../components/inputFields/InputField";
import LeftFormSide from "../../components/registerLoginForm/leftSide/LeftFormSide";
import RightFormSide from "../../components/registerLoginForm/rightSide/RightFormSide";
import RegisterFormContainer from "../../components/registerLoginForm/registerFormContainer/RegisterFormContainer";
import ActionButton from "../../components/actionButton/ActionButton";

const RegisterPage = () => {
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
            <InputField htmlFor={"name"} placeholder={"First name..."} type={"text"} id={"name"}>First name</InputField>
            <InputField htmlFor={"email"} placeholder={"Email..."} type={"email"} id={"email"}>Email</InputField>
            <InputField htmlFor={"password"} placeholder={"Password..."} type={"password"} id={"password"}>Password</InputField>
            <InputField htmlFor={"passwordRepeat"} placeholder={"Repeat password..."} type={"password"} id={"passwordRepeat"}>Repeat password</InputField>
            <ActionButton>{"Sign Up"}</ActionButton>
        </RightFormSide>
        </RegisterFormContainer>
    </>
  );
};

export default RegisterPage;
