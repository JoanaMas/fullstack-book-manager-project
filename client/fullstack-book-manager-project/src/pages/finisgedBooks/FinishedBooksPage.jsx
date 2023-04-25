import React from "react";
import "./finishedBooksPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user";
import { setFinishedBooks } from "../../redux/books";
// Components
import OneBookCard from "../../components/oneBookCard/OneBookCard";
import ActionButton from "../../components/actionButton/ActionButton";
// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const FinishedBooksPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GETTING VALUES FORM REDUX
  const completedBooks = useSelector(
    (store) => store.books.value.finishedBooks
  );

  const currentUser = useSelector((store) => store.users.value.currentUser);

  // GET CURRENT USER
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

  // GET FINISHED BOOKS
  useEffect(() => {
    fetch("http://localhost:4005/getFinishedBooks/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFinishedBooks(data.finishedBooks));
        // console.log(data);
      });
  }, [currentUser]);


  // DELETE FINISHED BOOK
  const deleteFinishedBook = (bookId, userId) => {
    
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

    fetch("http://localhost:4005/deleteFinishedBook", options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFinishedBooks(data.finishedBooks));
        console.log(data);
      });
  };




  return (
    <>
      <div className="title">
        <h1>Book Library</h1>
      </div>
      <div className="bookLibraryContainer">

        {completedBooks.length === 0 
        ? <div className="emptyLibraryTitle">
          <h1>Your library is currently empty.</h1> 
          <div className="booksInProgressBtn" onClick={() => navigate("/profile/" + currentUser._id)}><ActionButton>Explore books in progress</ActionButton></div>
          </div>
        : <div className="finishedBooksContainer">
          {completedBooks.map((book, i) => (
    
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
              >
                <div className="deleteFinishedBookIcon" onClick={() => deleteFinishedBook(book._id, book.userId)}><DeleteOutlineOutlinedIcon/></div>
              </OneBookCard>
          ))}
        </div>
        }

      </div>
    </>
  );
};

export default FinishedBooksPage;
