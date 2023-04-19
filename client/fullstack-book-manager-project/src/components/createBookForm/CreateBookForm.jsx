import React from 'react';
import { useRef } from 'react';
import './createBookForm.scss';
// Components
import RegisterFormContainer from '../registerLoginForm/registerFormContainer/RegisterFormContainer';
import RightFormSide from '../registerLoginForm/rightSide/RightFormSide';
import InputField from '../inputFields/InputField';
import ActionButton from '../actionButton/ActionButton';
// Icons
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// Redux
import { useDispatch } from 'react-redux';
import { setBooks } from '../../redux/books';
import { setOpenCreateBookForm } from '../../redux/onClickActions';


const CreateBookForm = ({
    currentUserId,
    handleCreateBookFormOpen,
}) => {

    const dispatch = useDispatch();

      // CREATE BOOK
  const authorRef = useRef();
  const titleRef = useRef();
  const pagesRef = useRef();
  const yearRef = useRef();
  const coverRef = useRef();

  const createBook = () => {

    const newBook = {
      author: authorRef.current.value,
      title: titleRef.current.value,
      pages: pagesRef.current.value,
      year: yearRef.current.value,
      cover: coverRef.current.value,
      isFinished: false,
      userId: currentUserId,
    };


    // SENDING DATA TO BACK-END
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    };

    fetch("http://localhost:4005/createBook/" + currentUserId, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setBooks(data.allBooks));
        dispatch(setOpenCreateBookForm(false))
      });
  };


  return (
    <>
            <RegisterFormContainer>
          <div className="createBookInputs">
            <div className="createBookTitle" onClick={handleCreateBookFormOpen}>
              <h1>Create a book</h1>
              <div className="closeIcon">
                {" "}
                <ClearOutlinedIcon fontSize="large" />
              </div>
            </div>

            <RightFormSide>
              <InputField
                htmlFor={"author"}
                placeholder={"Enter book author..."}
                type={"text"}
                id={"author"}
                inputRef={authorRef}
              >
                Author
              </InputField>
              <InputField
                htmlFor={"title"}
                placeholder={"Enter book title..."}
                type={"text"}
                id={"title"}
                inputRef={titleRef}
              >
                Title
              </InputField>
              <InputField
                htmlFor={"pages"}
                placeholder={"Enter number of pages ..."}
                type={"number"}
                id={"pages"}
                inputRef={pagesRef}
              >
                Number of pages
              </InputField>
              <InputField
                htmlFor={"year"}
                placeholder={"Enter year of publication..."}
                type={"text"}
                id={"year"}
                inputRef={yearRef}
              >
                Year of publication
              </InputField>
              <InputField
                htmlFor={"cover"}
                placeholder={"Enter URL..."}
                type={"text"}
                id={"cover"}
                inputRef={coverRef}
              >
                Book cover
              </InputField>

              <div className="createBookBtn">
                <ActionButton onClick={createBook}>Add</ActionButton>
              </div>
            </RightFormSide>
          </div>
        </RegisterFormContainer>
    </>
  );
};

export default CreateBookForm;