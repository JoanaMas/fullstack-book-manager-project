import React from "react";
import "./profilePictureUploadForm.modules.scss";
import { useRef } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/user";
import { setOpenPictureUpload } from "../../redux/onClickActions";
import { changeErrorMessage } from "../../redux/error";
//Icons
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const ProfilePictureUploadForm = ({
    handleOpenPictureUploadForm,
    currentUserId
}) => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.error.value.error);


  // USER PROFILE PICTURE UPDATE
  const urlRef = useRef();
  const urlValidationRegex =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

  const handleProfilePictureUpload = () => {
    const url = {
      userId: currentUserId,
      imageUrl: urlRef.current.value,
    };

    const validUrl = urlValidationRegex.test(url.imageUrl);

    // SENDING DATA TO BACK-END
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    };

    fetch("http://localhost:4005/profileImageUpload", options)
      .then((res) => res.json())
      .then((data) => {
        if (validUrl) {
          dispatch(setCurrentUser(data.updatedUser));
          dispatch(setOpenPictureUpload(false));
        } else {
          dispatch(changeErrorMessage("Please enter valid URL address."));
        }
      });
  };

  return (
    <div
      className={
        handleOpenPictureUploadForm ? "pictureUploadContainer" : "d-none"
      }
    >
      <div className="closeIcon">
      <h3>Upload your picture</h3>
      <div onClick={() => dispatch(setOpenPictureUpload(false))}><CloseOutlinedIcon fontSize="large" /></div>
        </div>
      <input type="text" placeholder="Enter your picture URL..." ref={urlRef} />
      <button onClick={handleProfilePictureUpload}>Upload</button>
      {error}
    </div>
  );
};

export default ProfilePictureUploadForm;
