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
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user";
import { setBooks, setFinishedBooks } from "../../redux/books";
import { setOpenCreateBookForm, setOpenPictureUpload } from "../../redux/onClickActions";

const ProfilePage = () => {

  const currentUser = useSelector((store) => store.users.value.currentUser);
  const booksInProgress = useSelector((store) => store.books.value.books);
  const handleOpenCreateBookForm = useSelector((store) => store.onClickActions.value.openCreateBookForm);
  const handleOpenPictureUploadForm = useSelector((store) => store.onClickActions.value.openPictureUpload);
  const completedBooks = useSelector((store) => store.books.value.finishedBooks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();


    // COUNT TOTAL PAGES READ
    const pagesReadArray = completedBooks.map(({pages}) => {
      return pages
    })
  
    const totalOfPagesRead = pagesReadArray.reduce((sum, acc) => {
      return sum + acc
    }, 0)

  

 
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


  // GET BOOKS BY USER ID THAT ARE IN PROGRESS OF READING
  useEffect(() => {
    fetch("http://localhost:4005/getBooksInProgress/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBooks(data.booksInProgress));
      });
  }, []);


  
   // GET FINISHED BOOKS - data fetched to see total pages read
   useEffect(() => {
    fetch("http://localhost:4005/getFinishedBooks/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFinishedBooks(data.finishedBooks));
        // console.log(data);
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
              Books finished: <span>{completedBooks.length}</span>
            </h5>
            <h5>
              Total pages read: <span>{totalOfPagesRead}</span>
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
          isFinished={book.isFinished}
          bookId={book._id}
          userId={book.userId}
          currentUserId={id}
          />
          )}

        </div>
      </div>


      {/* LINK TO FINISHED BOOKS */}
      <div className="bookLibraryContainer">
        <h1>Explore books you have already finished!</h1>
        <div className="arrowRight" onClick={() => navigate("/book-library/" + id)}><ArrowCircleRightOutlinedIcon /></div>
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
