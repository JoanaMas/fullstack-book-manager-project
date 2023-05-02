import React from 'react';
import './userProfileBar.modules.scss';
// Icons
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";


const UserProfileBar = (props) => {
  return (
    <div className="userProfileContainer">
    <div className="image">
      <img src={props.profilePicture} />
      <div className="editIcon" onClick={props.handleUploadPhotoOpen}>
        <ModeEditOutlinedIcon />
      </div>
    </div>

    <div className="userInfo">
      <div>
        <h3>{props.email} </h3>
      </div>
      <div className="stats">
        <h5>
          Books finished: <span>{props.completedBooks}</span>
        </h5>
        <h5>
          Total pages read: <span>{props.totalOfPagesRead}</span>
        </h5>
      </div>
    </div>
  </div>
  );
};

export default UserProfileBar;