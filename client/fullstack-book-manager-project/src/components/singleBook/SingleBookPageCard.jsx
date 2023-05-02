import React from 'react';
import './singleBookPageCard.modules.scss';
import { useNavigate } from 'react-router-dom';
// Icons
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
// Components
import ActionButton from '../actionButton/ActionButton';


const SingleBookPageCard = (props) => {
  const navigate = useNavigate();

  return (

    <div className="singleBook">
    <div className="bookImage">
      <img src={props.cover} alt="bookCover" />
    </div>

    <div className="bookContentContainer">
      <div className="bookContent">
        <div className="heading">
          <div>
            <h2>
              <span>Author</span> {props.author}
            </h2>
            <h1>{props.title}</h1>
          </div>

          <span className="writeNoteIcon">
          </span>
        </div>

        <div className="pages">
          <div className="pagesIcon">
            <span>
              <AutoStoriesOutlinedIcon />
            </span>
            <h3>{props.pages} pages</h3>
          </div>

          <h3>
            <span>Book year:</span> {props.year}
          </h3>
        </div>

        <div className="bookStatus">
          <div>
            {props.isFinished === false ? (
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
              onClick={() => navigate("/book-library/" + props.currentUser)}
            >
              Library <KeyboardArrowRightOutlinedIcon />
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SingleBookPageCard;