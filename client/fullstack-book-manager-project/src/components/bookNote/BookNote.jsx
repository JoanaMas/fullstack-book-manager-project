import React from 'react';
import './bookNote.modules.scss';
// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

const BookNote = (props) => {

  return (
    <div key={props.index} className="note">
                <div className="text">
                  <p>{props.bookNote}</p>
                </div>
                <div className="actionIcons">
                  <div>
                    {props.openEditBookNote & (props.editedNoteId === props.currentNoteId) ? (
                      <EditOffOutlinedIcon
                        onClick={props.editBookNoteOnClick}
                      />
                    ) : (
                      <ModeEditOutlineOutlinedIcon
                        onClick={props.editBookNoteOnClick}
                      />
                    )}
                  </div>
                  <div onClick={props.deleteBookNoteOnClick}>
                    <DeleteOutlineOutlinedIcon />
                  </div>
                </div>
              </div>
  );
};

export default BookNote;