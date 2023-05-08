import React, { useState } from 'react';
import './oneBookCard.modules.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
// Redux
import { useDispatch } from 'react-redux';
import { setBooks } from '../../redux/books';

function OneBookCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // NAVIGATE TO SINGLE BOOK PAGE
  const singleBookPage = (bookId) => {
    navigate(`/single-book-page/${bookId}`);
  };

  // DELETE BOOK IN PROGRESS
  const deleteBookInProgress = (bookId, userId) => {
    const uniqueBookId = {
      bookId,
      userId,
    };

    // SENDING DATA TO BACK-END
    axios.post('http://localhost:4005/deleteBook', uniqueBookId)
      .then((res) => {
        dispatch(setBooks(res.data.booksInProgress));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // BOOK IS FINISHED
  const [checked, setChecked] = useState(true);
  const [stateBookId, setBookId] = useState('');

  const bookFinished = (bookId) => {
    setChecked(true); // To prevent eslint error
    setBookId(bookId);

    const bookIsFinished = {
      bookId,
      finished: checked,
    };

    // SENDING DATA TO BACK-END
    axios.post(`http://localhost:4005/updateBookFinished/${props.currentUserId}`, bookIsFinished)
      .then((res) => {
        dispatch(setBooks(res.data.booksInProgress));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div key={props.bookId} className="oneBook">
      <div className="cover">
        <img
          src={props.cover}
          alt="cover"
          onClick={() => singleBookPage(props.bookId, props.userId)}
          aria-hidden="true"
        />

        <div
          className={props.isFinished === false ? 'deleteButton' : 'd-none'}
          onClick={() => deleteBookInProgress(props.bookId, props.userId)}
          aria-hidden="true"
        >
          <DeleteOutlineOutlinedIcon />
        </div>
      </div>
      <div className="bookInfo">
        <h3>
          {props.title}
          ,
          {props.year}
        </h3>
        <hr />

        <div className="author">
          <h4>{props.author}</h4>
        </div>
        <div className="pages">
          <span>
            <AutoStoriesOutlinedIcon />
          </span>
          <p>{props.pages}</p>
        </div>
        <div className={props.isFinished === false ? 'finishedBook' : 'd-none'}>
          {stateBookId === props.bookId ? (
            <BookmarkOutlinedIcon onClick={() => bookFinished(props.bookId)} />
          ) : (
            <BookmarkBorderOutlinedIcon
              onClick={() => bookFinished(props.bookId)}
            />
          )}
          <p>Finished!</p>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default OneBookCard;
