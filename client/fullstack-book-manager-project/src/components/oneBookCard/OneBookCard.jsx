import React from 'react';
import './oneBookCard.scss';
// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
// Redux
import { useDispatch } from 'react-redux';
import { setBooks } from '../../redux/books';
import { useState } from 'react';



const OneBookCard = ({ 
    key,
    cover,
    title,
    year,
    author,
    pages,
    isFinished,
    bookId,
    userId,
    currentUserId
}) => {

    const dispatch = useDispatch();

  // DELETE BOOK IN PROGRESS
  const deleteBookInProgress = (bookId, userId) => {

    const uniqueBookId = {
      bookId: bookId,
      userId: userId,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uniqueBookId),
    };

    fetch("http://localhost:4005/deleteBook", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setBooks(data.booksInProgress))
      console.log(data)
    })
}



  // BOOK IS FINISHED
  const [checked, setChecked] = useState(true);
  const [stateBookId, setBookId] = useState('');

  const bookFinished = (bookId) => {

    setBookId(bookId)

    console.log(bookId)
    console.log(checked)

    const bookIsFinished = {
      bookId: bookId,
      finished: checked,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookIsFinished),
    };

    fetch("http://localhost:4005/updateBookFinished/" + currentUserId, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      dispatch(setBooks(data.booksInProgress));

    })
  };



    return (
    <div key={key} className="oneBook">
    <div className="cover">
      <img src={cover} alt="cover" />

      <div className="deleteButton" onClick={() => deleteBookInProgress(bookId, userId)}>
        <DeleteOutlineOutlinedIcon />
      </div>

    </div>
    <div className="bookInfo">
      <h5>
        {title}, {year}
      </h5>
      <hr />

      <div className="author">
        <h6>{author}</h6>
      </div>
      <div className="pages">
        <span>
          <AutoStoriesOutlinedIcon />
        </span>
        <p>{pages}</p>
      </div>
      <div className={isFinished === false ? 'finishedBook' : 'd-none'}>
        {stateBookId === bookId
        ? <BookmarkOutlinedIcon onClick={() => bookFinished(bookId)} />
        : <BookmarkBorderOutlinedIcon onClick={() => bookFinished(bookId)}></BookmarkBorderOutlinedIcon>
        }
        <label htmlFor="finished">Finished!</label>
      </div>
    </div>
  </div>
  
  );
};

export default OneBookCard;