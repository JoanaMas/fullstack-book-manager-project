import React from 'react';
import './loginPage.scss';
import routes from '../../routes/routes';
// Components
import InputField from "../../components/inputFields/InputField";
import LeftFormSide from "../../components/registerLoginForm/leftSide/LeftFormSide";
import RightFormSide from "../../components/registerLoginForm/rightSide/RightFormSide";
import RegisterFormContainer from "../../components/registerLoginForm/registerFormContainer/RegisterFormContainer";


const LoginPage = () => {
  return (
    <>
    <RegisterFormContainer>

    <div className='left'>
      <RightFormSide buttonText={"Log In"}>
        <InputField htmlFor={"email"} placeholder={"Email..."} type={"email"} id={"email"}>Email</InputField>
        <InputField htmlFor={"password"} placeholder={"Password..."} type={"password"} id={"password"}>Password</InputField>
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