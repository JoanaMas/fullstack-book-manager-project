import React from "react";
import "./singleBookPage.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
// Components
import ActionButton from "../../components/actionButton/ActionButton";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setOneBook } from "../../redux/books";
import { useEffect } from "react";
import { setCurrentUser } from "../../redux/user";
import { changeErrorMessage } from "../../redux/error";
import { setBookNotes } from "../../redux/bookNotes";
// Icons
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const SingleBookPage = () => {
  const { bookId } = useParams();
  const bookNoteRef = useRef();
  const [openEditBookNote, setOpenEditBookNote] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [noteId, setNoteId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.users.value.currentUser);
  const book = useSelector((store) => store.books.value.book);
  const error = useSelector((store) => store.error.value.error);
  const bookNotes = useSelector((store) => store.bookNotes.value.bookNotes);

  console.log(bookNotes);

  //  DISPLAY ONE BOOK
  useEffect(() => {
    fetch("http://localhost:4005/singleBookPage/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCurrentUser(data.currentUser));
        dispatch(setOneBook(data.book));
      });
  }, []);

  // SEND BOOK NOTE TO BACK END
  const addBookNote = () => {
    dispatch(changeErrorMessage(""))

    const newBookNote = {
      bookId: bookId,
      bookNote: bookNoteRef.current.value,
      userId: currentUser._id,
  };

  if(newBookNote.bookNote === "") { 
    return dispatch(changeErrorMessage("Book note can not be blank."))
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBookNote),
  };

  fetch("http://localhost:4005/addBookNote", options)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setBookNotes(data.allBookNotes))
      // console.log(data);
    });
}

useEffect(() => {
  fetch("http://localhost:4005/getBookNotes/" + bookId)
  .then((res) => res.json())
  .then((data) => {
    dispatch(setBookNotes(data.allBookNotes))
    // console.log(data)
  })
}, [])



// DELETE BOOK NOTE

const deleteBookNote = (noteId) => {
  
  const bookNoteId = {
    bookNoteId: noteId,
    bookId: bookId,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookNoteId),
  };

  fetch("http://localhost:4005/deleteBookNote", options)
  .then((res) => res.json())
  .then((data) => {
    dispatch(setBookNotes(data.allBookNotes))
    console.log(data);
  });

}

// EDIT BOOK NOTE
const editBookNote = (bookNote, noteId) => {
  setNoteValue(bookNote)
  setOpenEditBookNote(!openEditBookNote)
  setNoteId(noteId)
}

const handleNoteEditChange = (event) => {
  setNoteValue(event.target.value)
}

const updateBookNote = () => {

  const updatedBookNote = {
    bookNote: bookNoteRef.current.value,
    noteId: noteId,
    bookId: bookId,
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBookNote),
  };


  fetch("http://localhost:4005/updateBookNote", options)
  .then((res) => res.json())
  .then((data) => {
    dispatch(setBookNotes(data.allBookNotes))
    // console.log(data);
  });

}

  return (
    <div className="grid-center">
      <div className="singleBook">
        <div className="bookImage">
          <img src={book?.cover} alt="" />
        </div>

        <div className="bookContentContainer">
          <div className="bookContent">
            <div className="heading">
              <div>
                <h2>
                  <span>Author</span> {book?.author}
                </h2>
                <h1>{book?.title}</h1>
              </div>

              <span className="writeNoteIcon">
                <EditNoteOutlinedIcon />
              </span>
            </div>

            <div className="pages">
              <div className="pagesIcon">
                <span>
                  <AutoStoriesOutlinedIcon />
                </span>
                <h3>{book?.pages} pages</h3>
              </div>

              <h3>
                <span>Book year:</span> {book?.year}
              </h3>
            </div>

            <div className="bookStatus">
              <div>
                {book?.isFinished === false ? (
                  <h2>
                    <span>Status:</span> Currently reading...
                  </h2>
                ) : (
                  <h2>
                    <span>Status:</span> Book completed.
                  </h2>
                )}
              </div>

              <div>
                <ActionButton
                  onClick={() => navigate("/book-library/" + currentUser._id)}
                >
                  Library <KeyboardArrowRightOutlinedIcon />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTES SECTION */}
      <div className="notesContainer grid-center">
        <div className="notes">
          <h1>Book notes</h1>

          {/* Notes */}
          <div className="displayNotes">

            {bookNotes.map((note, i) => 
            
            <div key={i} className="note">
              {note.bookNote}
              <div className="actionIcons">
                <div>
                  <ModeEditOutlineOutlinedIcon onClick={() => editBookNote(note.bookNote, note._id)} />
                </div>
                <div onClick={() => deleteBookNote(note._id)}>
                  <DeleteOutlineOutlinedIcon />
                </div>
              </div>
            </div>
            )}

          </div>

          <div className="inputNoteContainer">
            <textarea
              name="bookNote"
              id="bookNote"
              cols="150"
              rows="10"
              placeholder="Enter book note..."
              ref={bookNoteRef}
              value={noteValue}
              onChange={handleNoteEditChange}
            ></textarea>
            {openEditBookNote 
            ? <ActionButton onClick={updateBookNote}>Update</ActionButton>
            : <ActionButton onClick={addBookNote}>Save</ActionButton>
          }
            
          </div>
          {error}
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
