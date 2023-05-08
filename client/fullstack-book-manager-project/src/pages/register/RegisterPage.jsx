import React, { useRef } from 'react';
import './registerPage.modules.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import routes from '../../routes/routes';
import { changeErrorMessage } from '../../redux/error';
// Components
import InputField from '../../components/inputFields/InputField';
import LeftFormSide from '../../components/registerLoginForm/leftSide/LeftFormSide';
import RightFormSide from '../../components/registerLoginForm/rightSide/RightFormSide';
import RegisterFormContainer from '../../components/registerLoginForm/registerFormContainer/RegisterFormContainer';
import ActionButton from '../../components/actionButton/ActionButton';

function RegisterPage() {
  // COLLECTING INPUT VALUES FOR REGISTRATION
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();

  // ERROR MESSAGE REDUCER
  const errorMessage = useSelector((store) => store.error.value.error);
  const dispatch = useDispatch();

  // NAVIGATION
  const navigate = useNavigate();

  const registerUser = () => {
    const newUserData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      profilePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    };

    // VALIDATIONS
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    dispatch(changeErrorMessage('')); // CLEARING ERROR STATEMENT ON CLICK

    if (newUserData.name.length < 4 || newUserData.name.length > 20) {
      return dispatch(
        changeErrorMessage('Your name must be at least 4-20 characters long.'),
      );
    }

    if (newUserData.password.length < 4 || newUserData.password.length > 20) {
      return dispatch(
        changeErrorMessage(
          'Your password must be at least 4-20 characters long.',
        ),
      );
    }

    if (
      !/[A-Z]/.test(newUserData.password)
      || !specialCharacters.test(newUserData.password)
    ) {
      return dispatch(
        changeErrorMessage(
          'Your password should consist at least of one capital letter and one symbol.',
        ),
      );
    }

    if (newUserData.password !== passwordRepeatRef.current.value) {
      return dispatch(changeErrorMessage('Password do not match.'));
    }

    // SENDING DATA TO BACK-END

    return axios.post('http://localhost:4005/register', newUserData)
      .then((res) => {
        if (res.data.error) return;

        navigate(routes.loginPage);
      })
      .catch((error) => {
        dispatch(changeErrorMessage(error.response.data.error));
      });
  };

  return (
    <RegisterFormContainer>
      <LeftFormSide
        title="Create new account"
        question="Already a member?"
        route={routes.loginPage}
        linkText="Log In"
      />

      <RightFormSide>
        <InputField
          htmlFor="name"
          placeholder="First name..."
          type="text"
          id="name"
          inputRef={nameRef}
        >
          First name
        </InputField>
        <InputField
          htmlFor="email"
          placeholder="Email..."
          type="email"
          id="email"
          inputRef={emailRef}
        >
          Email
        </InputField>
        <InputField
          htmlFor="password"
          placeholder="Password..."
          type="password"
          id="password"
          inputRef={passwordRef}
        >
          Password
        </InputField>
        <InputField
          htmlFor="passwordRepeat"
          placeholder="Repeat password..."
          type="password"
          id="passwordRepeat"
          inputRef={passwordRepeatRef}
        >
          Repeat password
        </InputField>
        <ActionButton onClick={registerUser}>Sign Up</ActionButton>

        {errorMessage}
      </RightFormSide>
    </RegisterFormContainer>
  );
}

export default RegisterPage;
