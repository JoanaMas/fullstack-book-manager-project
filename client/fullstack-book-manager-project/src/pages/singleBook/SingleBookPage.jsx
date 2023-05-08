import React, { useRef, useState, useEffect } from 'react';
import './singleBookPage.modules.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Components
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../../components/actionButton/ActionButton';
import SingleBookPageCard from '../../components/singleBookPageCard/SingleBookPageCard';
import BookNote from '../../components/bookNote/BookNote';
// Redux
import { setOneBook } from '../../redux/books';
import { setCurrentUser } from '../../redux/user';
import { changeErrorMessage } from '../../redux/error';
import { setBookNotes } from '../../redux/bookNotes';

function SingleBookPage() {
  const { bookId } = useParams();
  const bookNoteRef = useRef();
  const [openEditBookNote, setOpenEditBookNote] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [noteIdState, setNoteId] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.users.value.currentUser);
  const book = useSelector((store) => store.books.value.book);
  const error = useSelector((store) => store.error.value.error);
  const bookNotes = useSelector((store) => store.bookNotes.value.bookNotes);

  //  DISPLAY ONE BOOK
  useEffect(() => {
    axios.get(`http://localhost:4005/singleBookPage/${bookId}`).then((res) => {
      dispatch(setCurrentUser(res.data.currentUser));
      dispatch(setOneBook(res.data.book));
    });
  }, []);

  // SEND BOOK NOTE TO BACK END
  const addBookNote = () => {
    dispatch(changeErrorMessage(''));

    const newBookNote = {
      bookId,
      bookNote: bookNoteRef.current.value,
      userId: currentUser._id,
    };

    if (newBookNote.bookNote === '') {
      return dispatch(changeErrorMessage('Book note can not be blank.'));
    }

    return axios.post('http://localhost:4005/addBookNote', newBookNote).then((res) => {
      dispatch(setBookNotes(res.data.allBookNotes));
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:4005/getBookNotes/${bookId}`).then((res) => {
      dispatch(setBookNotes(res.data.allBookNotes));
    });
  }, []);

  // DELETE BOOK NOTE
  const deleteBookNote = (noteId) => {
    const bookNoteId = {
      bookNoteId: noteId,
      bookId,
    };

    axios
      .post('http://localhost:4005/deleteBookNote', bookNoteId)
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
      noteId: noteIdState,
      bookId,
    };

    axios
      .post('http://localhost:4005/updateBookNote', updatedBookNote)
      .then((res) => {
        dispatch(setBookNotes(res.data.allBookNotes));
        setOpenEditBookNote(!openEditBookNote);
        setNoteValue('');
      });
  };

  return (
    <div className="singleBookPageContainer">

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
      <div className="notesContainer">
        <div className="notes">
          <h1>Book notes</h1>

          {/* Notes */}
          <div className={bookNotes.length !== 0 && 'displayNotes'}>
            {bookNotes.map((note, i) => (

              <BookNote
                index={i}
                bookNote={note.bookNote}
                openEditBookNote={openEditBookNote}
                editedNoteId={noteIdState}
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
            />
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
}

export default SingleBookPage;
