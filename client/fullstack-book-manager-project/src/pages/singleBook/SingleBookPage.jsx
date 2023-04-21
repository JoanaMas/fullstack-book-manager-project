import React from "react";
import "./singleBookPage.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Components
import ActionButton from "../../components/actionButton/ActionButton";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setOneBook } from "../../redux/books";
import { useEffect } from "react";
import { setCurrentUser } from "../../redux/user";
// Icons
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const SingleBookPage = () => {
  const { bookId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            <div className="note">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, veniam!
            
            <div className="actionIcons">
              <div><ModeEditOutlineOutlinedIcon /></div>
              <div><DeleteOutlineOutlinedIcon/></div>

            </div>
            </div>
            <div className="note">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa vitae obcaecati nobis delectus error odio odit ad eveniet ducimus incidunt ratione, omnis nostrum ab maxime labore reiciendis voluptatum ipsam quaerat ut quod hic. Adipisci corrupti alias corporis dolor, et nisi provident dolores illum error. Illo aperiam veniam quibusdam blanditiis incidunt dicta placeat quo porro facilis neque. Ducimus dolor hic, quidem, cumque, recusandae corporis tempore architecto alias repudiandae rerum nam laborum.</div>
            <div className="note">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa vitae obcaecati nobis delectus error odio odit ad eveniet ducimus incidunt ratione, omnis nostrum ab maxime labore reiciendis voluptatum ipsam quaerat ut quod hic. Adipisci corrupti alias corporis dolor, et nisi provident dolores illum error. Illo aperiam veniam quibusdam blanditiis incidunt dicta placeat quo porro facilis neque. Ducimus dolor hic, quidem, cumque, recusandae corporis tempore architecto alias repudiandae rerum nam laborum.</div>
            <div className="note">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorum vel odit, sed minima, aperiam tempora rerum accusamus possimus soluta exercitationem rem mollitia neque ipsa adipisci, esse cum earum excepturi cumque. Ex tenetur perferendis porro ullam nam magnam est quas, reiciendis alias? Neque asperiores in corporis tempore modi totam vitae facere! Accusamus vitae nisi doloremque enim veritatis ut blanditiis nobis. Libero natus illo rerum, tempore facere, asperiores ipsam culpa, modi autem nam porro quasi esse. Harum libero rem voluptates illum? Veritatis quae, fugiat tenetur explicabo eligendi, nostrum ut, numquam ullam neque aliquam quod! Quod aliquam vero ea reprehenderit dolores hic dolore, sequi eaque rem in repellendus voluptate ab porro veniam magnam nisi error laboriosam! Sunt incidunt porro quia explicabo unde eum laborum totam recusandae voluptate impedit tenetur, sapiente ratione in, exercitationem deleniti molestias voluptas iure doloribus enim! Expedita, cumque sequi ipsa voluptas quaerat assumenda exercitationem, deserunt et est sint velit aut reprehenderit dolorem esse vitae, mollitia unde nulla accusantium! Hic eaque quas, consequatur architecto, officia quae autem maiores itaque exercitationem quos voluptate nostrum. Similique laudantium dolores natus dolor, illo ipsa magni dolorum, molestias exercitationem suscipit illum sed ducimus quibusdam commodi ipsam ipsum perferendis sunt consequuntur. Fugiat, quisquam. Quae delectus culpa enim fuga explicabo reiciendis, nam eveniet fugiat quasi possimus, ex magni laudantium neque. Culpa, omnis magnam, soluta sequi delectus saepe possimus error adipisci natus deserunt facilis incidunt dolores, at perferendis in sapiente? Veritatis expedita facilis maxime suscipit aperiam esse. Recusandae, odio eius voluptatum ex, doloremque iste ducimus nesciunt minima ullam culpa, minus accusamus impedit laboriosam nihil delectus quae provident at incidunt temporibus mollitia sed hic fugit corrupti sint. Architecto voluptatem magnam velit veniam repudiandae nisi nulla recusandae. Nesciunt, ullam, corporis totam maxime natus expedita sit est quis deleniti magni qui. Fuga in nostrum facilis? A deleniti deserunt autem saepe odit.</div>
          </div>

    
          <div className="inputNoteContainer">
              <textarea name="" id="" cols="150" rows="10" placeholder="Enter book note..."></textarea>
              <ActionButton>Save</ActionButton>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
