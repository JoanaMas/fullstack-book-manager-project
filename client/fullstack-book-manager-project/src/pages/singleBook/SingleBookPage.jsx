import React from "react";
import "./singleBookPage.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setOneBook } from "../../redux/books";
import { useEffect } from "react";
import { setCurrentUser } from "../../redux/user";
// Icons
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const SingleBookPage = () => {
  const { bookId } = useParams();

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.users.value.currentUser);
  const book = useSelector((store) => store.books.value.book);
  console.log(book);

  //  DISPLAY ONE BOOK
  useEffect(() => {
    fetch("http://localhost:4005/singleBookPage/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCurrentUser(data.currentUser));
        dispatch(setOneBook(data.book));
      });
  }, []);

  return (
    <div className="grid-center">
      <div className="singleBook">
        <div className="bookImage">
          <img src={book?.cover} alt="" />
        </div>

        <div className="bookContentContainer">
          <div className="bookContent">

            <div className="heading">
              <h2>{book?.author}</h2>
              <h1>{book?.title}</h1>
            </div>


            <div className="pages">
              <div className="pagesIcon"><AutoStoriesOutlinedIcon /></div>
              <h3>{book?.pages} pages</h3>
              <h3>Book year: {book?.year}</h3>
            </div>
            

            <div className="bookStatus">
              {book?.isFinished === false
              ? <h2>Status: Currently reading...</h2>
              : <h2>Status: Book is completed.</h2>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
