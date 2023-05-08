import React from 'react';
import { useRef } from 'react';
import './createBookForm.modules.scss';
import axios from "axios";
// Components
import RegisterFormContainer from '../registerLoginForm/registerFormContainer/RegisterFormContainer';
import RightFormSide from '../registerLoginForm/rightSide/RightFormSide';
import InputField from '../inputFields/InputField';
import ActionButton from '../actionButton/ActionButton';
// Icons
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../redux/books';
import { setOpenCreateBookForm } from '../../redux/onClickActions';
import { changeErrorMessage } from '../../redux/error';


const CreateBookForm = ({
    currentUserId,
    handleCreateBookFormOpen,
}) => {

    const error = useSelector((store) => store.error.value.error);
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

    // VALIDATIONS

    const urlValidationRegex =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
    const validUrl = urlValidationRegex.test(newBook.cover);
    console.log(validUrl)

    dispatch(changeErrorMessage(""))
    if(newBook.author === "") return dispatch(changeErrorMessage("Book author field can not be empty"));
    if(newBook.title === "") return dispatch(changeErrorMessage("Book title field can not be empty"));
    if(newBook.pages === 0) return dispatch(changeErrorMessage("Please enter number of book pages"));
    if(newBook.year === "") return dispatch(changeErrorMessage("Book year field can not be empty"));
    if(newBook.cover === "") return dispatch(changeErrorMessage("Book cover field can not be empty"));


    if(newBook.year < 1700) return dispatch(changeErrorMessage("Book is too old"));
    if(!validUrl || newBook.cover.length < 50) return dispatch(changeErrorMessage("Please enter valid URL"));
    

    // SENDING DATA TO BACK-END
    axios.post("http://localhost:4005/createBook/" + currentUserId, newBook)
    .then(res => {
      dispatch(setBooks(res.data.allBooks));
      dispatch(setOpenCreateBookForm(false));
    })
    .catch(error => {
      console.error(error.message)
    })

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
                min={"0"}
              >
                Number of pages
              </InputField>
              <InputField
                htmlFor={"year"}
                placeholder={"Enter year of publication..."}
                type={"number"}
                id={"year"}
                inputRef={yearRef}
                min={1700}
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

              <p>{error}</p>

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