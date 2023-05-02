import React from "react";
import "./singleBookPage.modules.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
// Components
import ActionButton from "../../components/actionButton/ActionButton";
import SingleBookPageCard from "../../components/singleBookPageCard/singleBookPageCard";
import BookNote from "../../components/bookNote/BookNote";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setOneBook } from "../../redux/books";
import { useEffect } from "react";
import { setCurrentUser } from "../../redux/user";
import { changeErrorMessage } from "../../redux/error";
import { setBookNotes } from "../../redux/bookNotes";


const SingleBookPage = () => {
  const { bookId } = useParams();
  const bookNoteRef = useRef();
  const [openEditBookNote, setOpenEditBookNote] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [noteId, setNoteId] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.users.value.currentUser);
  const book = useSelector((store) => store.books.value.book);
  const error = useSelector((store) => store.error.value.error);
  const bookNotes = useSelector((store) => store.bookNotes.value.bookNotes);

  console.log(bookNotes);

  //  DISPLAY ONE BOOK
  useEffect(() => {
    axios.get("http://localhost:4005/singleBookPage/" + bookId).then((res) => {
      console.log(res.data);
      dispatch(setCurrentUser(res.data.currentUser));
      dispatch(setOneBook(res.data.book));
    });
  }, []);
  

  // SEND BOOK NOTE TO BACK END
  const addBookNote = () => {
    dispatch(changeErrorMessage(""));

    const newBookNote = {
      bookId: bookId,
      bookNote: bookNoteRef.current.value,
      userId: currentUser._id,
    };

    if (newBookNote.bookNote === "") {
      return dispatch(changeErrorMessage("Book note can not be blank."));
    }

    axios.post("http://localhost:4005/addBookNote", newBookNote).then((res) => {
      console.log(res.data);
      dispatch(setBookNotes(res.data.allBookNotes));
    });
  };

  useEffect(() => {
    axios.get("http://localhost:4005/getBookNotes/" + bookId).then((res) => {
      dispatch(setBookNotes(res.data.allBookNotes));
    });
  }, []);


  // DELETE BOOK NOTE
  const deleteBookNote = (noteId) => {
    const bookNoteId = {
      bookNoteId: noteId,
      bookId: bookId,
    };

    axios
      .post("http://localhost:4005/deleteBookNote", bookNoteId)
      .then((res) => {
        dispatch(setBookNotes(res.data.allBookNotes));
      });
  };

  // EDIT BOOK NOTE
  const editBookNote = (bookNote, noteId) => {
    setNoteValue(bookNote);
    setOpenEditBookNote(!openEditBookNote);
    setNoteId(noteId);
  };

  const handleNoteEditChange = (event) => {
    setNoteValue(event.target.value);
  };

  const updateBookNote = () => {
    const updatedBookNote = {
      bookNote: bookNoteRef.current.value,
      noteId: noteId,
      bookId: bookId,
    };

    axios
      .post("http://localhost:4005/updateBookNote", updatedBookNote)
      .then((res) => {
        dispatch(setBookNotes(res.data.allBookNotes));
        setOpenEditBookNote(!openEditBookNote);
        setNoteValue("");
      });
  };

  return (
    <div className="grid-center">


      <SingleBookPageCard 
      cover={book?.cover}
      author={book?.author}
      title={book?.title}
      pages={book?.pages}
      year={book?.year}
      isFinished={book?.isFinished}
      currentUser={currentUser?._id}
      />

      {/* NOTES SECTION */}
      <div className="notesContainer grid-center">
        <div className="notes">
          <h1>Book notes</h1>

          {/* Notes */}
          <div className={bookNotes.length !== 0 && "displayNotes"}>
            {bookNotes.map((note, i) => (

              <BookNote
              index={i}
              bookNote={note.bookNote}
              openEditBookNote={openEditBookNote}
              editedNoteId={noteId}
              currentNoteId={note._id}
              editBookNoteOnClick={() => editBookNote(note.bookNote, note._id)}
              deleteBookNoteOnClick={() => deleteBookNote(note._id)}

              />
            ))}
          </div>

          <div className="inputNoteContainer">
            <textarea
              name="bookNote"
              id="bookNote"
              cols="10"
              rows="10"
              placeholder="Enter book note..."
              ref={bookNoteRef}
              value={noteValue}
              onChange={handleNoteEditChange}
            ></textarea>
            {openEditBookNote ? (
              <ActionButton onClick={updateBookNote}>Update</ActionButton>
            ) : (
              <ActionButton onClick={addBookNote}>Save</ActionButton>
            )}
          </div>
          {error}
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
