import React from "react";
import "./profilePage.scss";
import { useState } from "react";
import routes from "../../routes/routes";
// Components
import Header from "../../components/header/Header";
import ActionButton from "../../components/actionButton/ActionButton";
import RightFormSide from "../../components/registerLoginForm/rightSide/RightFormSide";
import RegisterFormContainer from "../../components/registerLoginForm/registerFormContainer/RegisterFormContainer";
import InputField from "../../components/inputFields/InputField";
// Icons
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const ProfilePage = () => {
  const [openPictureUpload, setOpenPictureUpload] = useState(false);
  const [openCreateBookForm, setOpenCreateBookForm] = useState(false);

  const handleUploadPhotoOpen = () => {
    setOpenPictureUpload(!openPictureUpload);
  };

  const handleCreateBookFormOpen = () => {
    setOpenCreateBookForm(!openCreateBookForm)
  }

  // TOTAL BOOKS COUNT
  const pages = finishedBooks.map((book) => {
    return book.pages;
  });

  const totalOfPages = pages.reduce((sum, oneBookPages) => {
    return sum + oneBookPages;
  }, 0);

  return (
    // USER BOARD
    <div className="profileContainer">
      <div className="userProfileContainer">
        <div className="image">
          <img src={user.image} />
          <div className="editIcon" onClick={handleUploadPhotoOpen}>
            <ModeEditOutlinedIcon />
          </div>
        </div>

        <div className="userInfo">
          <div>
            <h3>{user.email} </h3>
          </div>
          <div className="stats">
            <h5>
              Books finished: <span>{finishedBooks.length}</span>
            </h5>
            <h5>
              Total pages read: <span>{totalOfPages}</span>
            </h5>
          </div>
        </div>
      </div>

      {/* PROFILE PICTURE UPLOAD */}
      <div className={openPictureUpload ? "pictureUploadContainer" : "d-none"}>
        <h3>Upload your picture</h3>
        <input type="text" placeholder="Enter your picture URL..." />
        <button>Upload</button>
      </div>

      <Header title={`Welcome, ${user.name}! Enjoy becoming`}>
        <ActionButton onClick={handleCreateBookFormOpen}>Create book!</ActionButton>
      </Header>


      {/* CREATE BOOK FORM */}
      <div className={openCreateBookForm ? 'd-flex' : 'd-none'}>
      <RegisterFormContainer>

        <div className="createBookInputs">
          <div className="createBookTitle" onClick={handleCreateBookFormOpen}>
              <h1>Create a book</h1>
              <div className="closeIcon"> <ClearOutlinedIcon fontSize="large" /></div>
    
          </div>

       <RightFormSide>
      

       <InputField htmlFor={"author"} placeholder={"Enter book author..."} type={"text"} id={"author"}>Author</InputField>
       <InputField htmlFor={"title"} placeholder={"Enter book title..."} type={"text"} id={"title"}>Title</InputField>
       <InputField htmlFor={"pages"} placeholder={"Enter number of pages ..."} type={"number"} id={"pages"}>Number of pages</InputField>
       <InputField htmlFor={"year"} placeholder={"Enter year of publication..."} type={"text"} id={"year"}>Year of publication</InputField>
       <InputField htmlFor={"cover"} placeholder={"Enter URL..."} type={"text"} id={"cover"}>Book cover</InputField>
      
        <div className="createBookBtn"><ActionButton>Create book</ActionButton></div>

       </RightFormSide>
      
        </div>


      </RegisterFormContainer>
        </div>


      {/* CURRENTLY READING */}
      <div className="singleBookContainer">
        <div className="addBook">
        <h3>Currently reading...</h3>
        <div className="addIcon" onClick={handleCreateBookFormOpen}><AddCircleOutlineOutlinedIcon fontSize="large" /></div>
        </div>
        <div className="booksInProgress">



          {/* ONE BOOK */}
          <div className="oneBook">
            <div className="cover">
              <img src={booksInProgress.coverImage} alt="cover" />
              <div className="deleteButton">
                <DeleteOutlineOutlinedIcon />
              </div>
            </div>
            <div className="bookInfo">
              <h5>
                {booksInProgress.title}, {booksInProgress.year}
              </h5>
              <hr />

              <div className="author">
                <h6>{booksInProgress.author}</h6>
              </div>
              <div className="pages">
                <span>
                  <AutoStoriesOutlinedIcon />
                </span>
                <p>{booksInProgress.pages}</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// FAKE DATA

const user = {
  id: "myId",
  name: "Joana",
  email: "joana@gmail.com",
  password: "Joana",
  passwordRepeat: "Joana",
  image:
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
};

const finishedBooks = [
  { title: "Harry Potter", pages: 450 },
  { title: "Lord Of The Rings", pages: 450 },
  { title: "Lord Of The Rings", pages: 650 },
];

const booksInProgress = {
  id: "bookdId",
  author: "J.R.R. Tolkien",
  title: "The Lord of the Rings",
  pages: "1216",
  year: "1954",
  coverImage:
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
};
