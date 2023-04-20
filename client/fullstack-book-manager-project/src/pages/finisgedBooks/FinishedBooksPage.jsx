import React from "react";
import "./finishedBooksPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFinishedBooks, setTotalPagesRead } from "../../redux/books";
import { setCurrentUser } from "../../redux/user";
// Components
import OneBookCard from "../../components/oneBookCard/OneBookCard";

const FinishedBooksPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GETTING VALUES FORM REDUX
  const completedBooks = useSelector(
    (store) => store.books.value.finishedBooks
  );

  // COUNT TOTAL PAGES READ
  const pagesReadArray = completedBooks.map(({pages}) => {
    return pages
  })

  const totalOfPagesRead = pagesReadArray.reduce((sum, acc) => {
    return sum + acc
  }, 0)

  dispatch(setTotalPagesRead(totalOfPagesRead));



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
          console.log(data);
        });
  }, []);

  return (
    <div className="bookLibraryContainer">
      <div className="finishedBooksContainer">
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
          />
        ))}
      </div>
    </div>
  );
};

export default FinishedBooksPage;
