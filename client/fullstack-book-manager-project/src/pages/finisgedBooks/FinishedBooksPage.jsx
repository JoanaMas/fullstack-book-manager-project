import React from "react";
import "./finishedBooksPage.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFinishedBooks } from "../../redux/books";
// Components
import OneBookCard from "../../components/oneBookCard/OneBookCard";

const FinishedBooksPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const completedBooks = useSelector((store) => store.books.value.finishedBooks);
  console.log(completedBooks);


  useEffect(() => {
    fetch("http://localhost:4005/getFinishedBooks/" + id)
    .then(res => res.json())
    .then(data => {
      dispatch(setFinishedBooks(data.finishedBooks))
      console.log(data)
    })
  }, [])


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
