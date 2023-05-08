import React, { useEffect } from 'react';
import './profilePage.modules.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../../routes/routes';
// Components
import Header from '../../components/header/Header';
import ActionButton from '../../components/actionButton/ActionButton';
import OneBookCard from '../../components/oneBookCard/OneBookCard';
import CreateBookForm from '../../components/createBookForm/CreateBookForm';
import ProfilePictureUploadForm from '../../components/profilePictureUploadForm/ProfilePictureUploadForm';
import UserProfileBar from '../../components/userProfileBar/UserProfileBar';
// Icons
// Redux
import { setCurrentUser } from '../../redux/user';
import { setBooks, setFinishedBooks } from '../../redux/books';
import {
  setOpenCreateBookForm,
  setOpenPictureUpload,
} from '../../redux/onClickActions';

function ProfilePage() {
  const currentUser = useSelector((store) => store.users.value.currentUser);
  const booksInProgress = useSelector((store) => store.books.value.books);
  const handleOpenCreateBookForm = useSelector(
    (store) => store.onClickActions.value.openCreateBookForm,
  );
  const handleOpenPictureUploadForm = useSelector(
    (store) => store.onClickActions.value.openPictureUpload,
  );
  const completedBooks = useSelector(
    (store) => store.books.value.finishedBooks,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  // COUNT TOTAL PAGES READ
  const pagesReadArray = completedBooks.map(({ pages }) => pages);

  const totalOfPagesRead = pagesReadArray.reduce((sum, acc) => sum + acc, 0);

  // DISPLAYED CURRENT USER IN PROFILE
  useEffect(() => {
    axios.get(`http://localhost:4005/userProfile/${id}`).then((res) => {
      if (res.data.registeredUser) {
        dispatch(setCurrentUser(res.data.registeredUser));
      } else {
        dispatch(setCurrentUser(null));
        navigate(routes.homePage);
      }
    });
  }, []);

  const handleUploadPhotoOpen = () => {
    dispatch(setOpenPictureUpload(!handleOpenPictureUploadForm));
  };

  const handleCreateBookFormOpen = () => {
    dispatch(setOpenCreateBookForm(!handleOpenCreateBookForm));
  };

  // KEYBOARD NAVIGATION
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      dispatch(setOpenCreateBookForm(!handleOpenCreateBookForm));
    }
  };

  const navigateToLibraryOnKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      navigate(`/book-library/${id}`);
    }
  };

  // GET BOOKS BY USER ID THAT ARE IN PROGRESS OF READING
  useEffect(() => {
    axios.get(`http://localhost:4005/getBooksInProgress/${id}`)
      .then((res) => {
        dispatch(setBooks(res.data.booksInProgress));
      });
  }, []);

  // GET FINISHED BOOKS - data fetched to see total pages read
  useEffect(() => {
    axios.get(`http://localhost:4005/getFinishedBooks/${id}`)
      .then((res) => {
        dispatch(setFinishedBooks(res.data.finishedBooks));
      });
  }, []);

  return (
    // USER BOARD
    <div className="profileContainer">

      {/* USER PROFILE BAR WITH PROFILE PICTURE */}
      <UserProfileBar
        profilePicture={currentUser?.profilePicture}
        handleUploadPhotoOpen={handleUploadPhotoOpen}
        email={currentUser?.email}
        completedBooks={completedBooks.length}
        totalOfPagesRead={totalOfPagesRead}
      />

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
      <div className={handleOpenCreateBookForm ? 'd-flex' : 'd-none'}>
        <CreateBookForm
          currentUserId={id}
          handleCreateBookFormOpen={handleCreateBookFormOpen}
        />
      </div>

      {/* CURRENTLY READING */}
      <div className="singleBookContainer">
        <div className="addBook">
          <h3>Currently reading...</h3>
          <button
            type="submit"
            className="addIcon"
            onClick={handleCreateBookFormOpen}
            onKeyDown={(event) => handleKeyDown(event)}
          >
            <AddCircleOutlineOutlinedIcon fontSize="large" />
          </button>
        </div>
        <div className="booksInProgress">
          {/* ONE BOOK */}
          {booksInProgress.map((book) => (
            <OneBookCard
              key={book._id}
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
          ))}
        </div>
      </div>

      {/* LINK TO FINISHED BOOKS */}
      <div className="bookLibraryContainer">
        <h1>Explore books you have already finished!</h1>
        <button
          type="submit"
          className="arrowRight"
          onClick={() => navigate(`/book-library/${id}`)}
          onKeyDown={(event) => navigateToLibraryOnKeyDown(event)}
        >
          <ArrowCircleRightOutlinedIcon />
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
