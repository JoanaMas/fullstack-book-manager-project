import React from "react";
import "./profilePage.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user";
import { changeErrorMessage } from "../../redux/error";



const ProfilePage = () => {
  const [openPictureUpload, setOpenPictureUpload] = useState(false);
  const [openCreateBookForm, setOpenCreateBookForm] = useState(false);
  const currentUser = useSelector((store) => store.users.value.currentUser);
  const error = useSelector((store) => store.error.value.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { id } = useParams();

  // DISPLAYED CURRENT USER IN PROFILE

  useEffect(() => {
    fetch("http://localhost:4005/userProfile/"+id)
    .then(res => res.json())
    .then(data => {
      if(data.registeredUser) {
        dispatch(setCurrentUser(data.registeredUser))
      } else {
        dispatch(setCurrentUser(null))
        navigate(routes.homePage)
      }
    })
  }, [])


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



  // USER PROFILE PICTURE UPDATE
  const urlRef = useRef();
  const urlValidationRegex = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

  const handleProfilePictureUpload = () => {
    
    const url = {
      userId: id,
      imageUrl: urlRef.current.value
    }

    const validUrl = urlValidationRegex.test(url.imageUrl)

    
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
        if(validUrl) {
          dispatch(setCurrentUser(data.updatedUser))
          setOpenPictureUpload(false)
        } else {
          dispatch(changeErrorMessage("Please enter valid URL address."))
        }
      });

      

  }




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
      <div className={openPictureUpload ? "pictureUploadContainer" : "d-none"}>
        <h3>Upload your picture</h3>
        <input type="text" placeholder="Enter your picture URL..." ref={urlRef} />
        <button onClick={handleProfilePictureUpload}>Upload</button>
        {error}
      </div>

      <Header title={`Welcome, ${currentUser?.firstName}! Enjoy using`}>
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
      
        {/* <div className="createBookBtn"><ActionButton>Create book</ActionButton></div> */}
        <ActionButton>Create book</ActionButton>

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
