import React from "react";
import "./profilePage.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
// Components
import Header from "../../components/header/Header";
import ActionButton from "../../components/actionButton/ActionButton";
import OneBookCard from "../../components/oneBookCard/OneBookCard";
import CreateBookForm from "../../components/createBookForm/CreateBookForm";
import ProfilePictureUploadForm from "../../components/ProfilePictureUploadForm/ProfilePictureUploadForm";
// Icons
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user";
import { changeErrorMessage } from "../../redux/error";
import { setBooks } from "../../redux/books";
import { setOpenCreateBookForm, setOpenPictureUpload } from "../../redux/onClickActions";

const ProfilePage = () => {

  const currentUser = useSelector((store) => store.users.value.currentUser);
  const error = useSelector((store) => store.error.value.error);
  const booksInProgress = useSelector((store) => store.books.value.books);
  const handleOpenCreateBookForm = useSelector((store) => store.onClickActions.value.openCreateBookForm);
  const handleOpenPictureUploadForm = useSelector((store) => store.onClickActions.value.openPictureUpload);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
 
  // DISPLAYED CURRENT USER IN PROFILE

  useEffect(() => {
    fetch("http://localhost:4005/userProfile/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.registeredUser) {
          dispatch(setCurrentUser(data.registeredUser));
        } else {
          dispatch(setCurrentUser(null));
          navigate(routes.homePage);
        }
      });
  }, []);

  const handleUploadPhotoOpen = () => {
    dispatch(setOpenPictureUpload(!handleOpenPictureUploadForm))
  };

  const handleCreateBookFormOpen = () => {
    dispatch(setOpenCreateBookForm(!handleOpenCreateBookForm))
  };

  // TOTAL BOOKS COUNT
  const pages = finishedBooks.map((book) => {
    return book.pages;
  });

  const totalOfPages = pages.reduce((sum, oneBookPages) => {
    return sum + oneBookPages;
  }, 0);





  // USER PROFILE PICTURE UPDATE
  const urlRef = useRef();
  const urlValidationRegex =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

  const handleProfilePictureUpload = () => {
    const url = {
      userId: id,
      imageUrl: urlRef.current.value,
    };

    const validUrl = urlValidationRegex.test(url.imageUrl);

    // SENDING DATA TO BACK-END
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    };

    fetch("http://localhost:4005/profileImageUpload", options)
      .then((res) => res.json())
      .then((data) => {
        if (validUrl) {
          dispatch(setCurrentUser(data.updatedUser));
          setOpenPictureUpload(false);
        } else {
          dispatch(changeErrorMessage("Please enter valid URL address."));
        }
      });
  };


  // GET BOOKS BY USER ID THAT ARE IN PROGRESS OF READING
  useEffect(() => {
    fetch("http://localhost:4005/getBooksInProgress/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBooks(data.booksInProgress));
        console.log(data);
      });
  }, []);


  return (
    // USER BOARD
    <div className="profileContainer">
      <div className="userProfileContainer">
        <div className="image">
          <img src={currentUser?.profilePicture} />
          <div className="editIcon" onClick={handleUploadPhotoOpen}>
            <ModeEditOutlinedIcon />
          </div>
        </div>

        <div className="userInfo">
          <div>
            <h3>{currentUser?.email} </h3>
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
        <ProfilePictureUploadForm
        currentUserId={id}
        handleOpenPictureUploadForm={handleOpenPictureUploadForm}
        />
 

      {/* HEADER */}
      <Header title={`Welcome, ${currentUser?.firstName}! Enjoy using`}>
        <ActionButton onClick={handleCreateBookFormOpen}>
          Create book!
        </ActionButton>
      </Header>


      {/* CREATE BOOK FORM */}
      <div className={handleOpenCreateBookForm? "d-flex" : "d-none"}>
        <CreateBookForm 
        currentUserId={id}
        handleCreateBookFormOpen={handleCreateBookFormOpen}
        />
      </div>

      {/* CURRENTLY READING */}
      <div className="singleBookContainer">
        <div className="addBook">
          <h3>Currently reading...</h3>
          <div className="addIcon" onClick={handleCreateBookFormOpen}>
            <AddCircleOutlineOutlinedIcon fontSize="large" />
          </div>
        </div>
        <div className="booksInProgress">

          {/* ONE BOOK */}
          {booksInProgress.map((book, i) => 
          <OneBookCard 
          key={i}
          cover={book.cover}
          title={book.title}
          year={book.year}
          author={book.author}
          pages={book.pages}
          bookId={book._id}
          userId={book.userId}
          currentUserId={id}
          />
          )}

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

// const booksInProgress = {
//   id: "bookdId",
//   author: "J.R.R. Tolkien",
//   title: "The Lord of the Rings",
//   pages: "1216",
//   year: "1954",
//   coverImage:
//     "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
// };
