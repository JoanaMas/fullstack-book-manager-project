import React from "react";
import "./oneBookCard.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
// Redux
import { useDispatch } from "react-redux";
import { setBooks } from "../../redux/books";

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
  currentUserId,
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // NAVIGATE TO SINGLE BOOK PAGE
  const singleBookPage = (bookId) => {
    navigate("/single-book-page/" + bookId);
  };

  // DELETE BOOK IN PROGRESS
  const deleteBookInProgress = (bookId, userId) => {
    const uniqueBookId = {
      bookId: bookId,
      userId: userId,
    };

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
        dispatch(setBooks(data.booksInProgress));
        console.log(data);
      });
  };

  // BOOK IS FINISHED
  const [checked, setChecked] = useState(true);
  const [stateBookId, setBookId] = useState("");

  const bookFinished = (bookId) => {
    setBookId(bookId);

    console.log(bookId);
    console.log(checked);

    const bookIsFinished = {
      bookId: bookId,
      finished: checked,
    };

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
        console.log(data);
        dispatch(setBooks(data.booksInProgress));
      });
  };

  return (
    <div key={key} className="oneBook">
      <div className="cover">
        <img src={cover} alt="cover" onClick={() => singleBookPage(bookId, userId)} />

        <div
          className={isFinished === false ? "deleteButton" : "d-none"}
          onClick={() => deleteBookInProgress(bookId, userId)}
        >
          <DeleteOutlineOutlinedIcon />
        </div>
      </div>
      <div className="bookInfo">
        <h3>
          {title}, {year}
        </h3>
        <hr />

        <div className="author">
          <h4>{author}</h4>
        </div>
        <div className="pages">
          <span>
            <AutoStoriesOutlinedIcon />
          </span>
          <p>{pages}</p>
        </div>
        <div className={isFinished === false ? "finishedBook" : "d-none"}>
          {stateBookId === bookId ? (
            <BookmarkOutlinedIcon onClick={() => bookFinished(bookId)} />
          ) : (
            <BookmarkBorderOutlinedIcon
              onClick={() => bookFinished(bookId)}
            ></BookmarkBorderOutlinedIcon>
          )}
          <label htmlFor="finished">Finished!</label>
        </div>
        {children}
      </div>
    </div>
  );
};

export default OneBookCard;
