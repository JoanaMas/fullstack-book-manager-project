import React from "react";
import styles from "./profilePage.module.scss";
import {  useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link,useNavigate} from "react-router-dom";
import routes from "../../routes/routes";
// Components
import Header from "../../components/header/Header";
import ActionButton from "../../components/actionButton/ActionButton";
import OneBookCard from "../../components/oneBookCard/OneBookCard";
import CreateBookForm from "../../components/createBookForm/CreateBookForm";
import ProfilePictureUploadForm from "../../components/ProfilePictureUploadForm/ProfilePictureUploadForm";
// Icons
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user";
import { setBooks, setFinishedBooks } from "../../redux/books";
import { setOpenCreateBookForm, setOpenPictureUpload } from "../../redux/onClickActions";




const useLoadUser =  (id) => {
  const [status, setStatus] = React.useState("idle");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.users.value.currentUser);

const loadUser = async () => {
  try{
    setStatus('loading')
    const response = await fetch(`http://localhost:4005/userProfile/${id}`)
    const user = await response.json();
    if (user.registeredUser) {
      setStatus('done')
      dispatch(setCurrentUser(user.registeredUser));
    } else {
      throw new Error("User type is invalid.. Probably..")
    }
  } catch (e) {
    setStatus('error')
    dispatch(setCurrentUser(null));
    navigate(routes.homePage);
  }
}

  useEffect( () => {
    if(!currentUser){
      loadUser(id)
    }
  }, [id]);

  return (
    {
      currentUser,
      status,
    }
  )
}

// Do the same thing using react query. No redux is necessary!!! :) To update data setQueriesData should be used. 
// Using this hook in different components will not result in multiple API queries! 
// You can think of this as as a redux slice/reducer and selector in one. 

// const queryKeys = {
//   user: (id) => ['user', id],
// }

// const useLoadUserQuery = (id) => {
//  const { data: currentUser,status } = useQuery({
//    queryKey: queryKeys.user(id),
//    queryFn: fetch(`http://localhost:4005/userProfile/${id}`),
//    select:(user)=> user.registeredUser,
//    enabled: !!id
//  })

//  return {
//    currentUser,
//    status,
//  }
// }



export const ProfilePage = () => {


  const booksInProgress = useSelector((store) => store.books.value.books);
  const handleOpenCreateBookForm = useSelector((store) => store.onClickActions.value.openCreateBookForm);
  const handleOpenPictureUploadForm = useSelector((store) => store.onClickActions.value.openPictureUpload);
  const completedBooks = useSelector((store) => store.books.value.finishedBooks);
  const { id } = useParams();
  const dispatch = useDispatch();

  const {status,currentUser} = useLoadUser(id)


    // COUNT TOTAL PAGES READ
    const pagesReadArray = completedBooks.map(({pages}) => {
      return pages
    })
  
    const totalOfPagesRead = pagesReadArray.reduce((sum, acc) => {
      return sum + acc
    }, 0)

  

 
  // DISPLAYED CURRENT USER IN PROFILE

  

  const handleUploadPhotoOpen = () => {
    dispatch(setOpenPictureUpload(!handleOpenPictureUploadForm))
  };

  const handleCreateBookFormOpen = () => {
    dispatch(setOpenCreateBookForm(!handleOpenCreateBookForm))
  };


  // GET BOOKS BY USER ID THAT ARE IN PROGRESS OF READING
  useEffect(() => {
    fetch("http://localhost:4005/getBooksInProgress/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBooks(data.booksInProgress));
      });
  }, []);


  
   // GET FINISHED BOOKS - data fetched to see total pages read
   useEffect(() => {
    fetch("http://localhost:4005/getFinishedBooks/" + id)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setFinishedBooks(data.finishedBooks));
        // console.log(data);
      });
  }, []);

  if(status === 'loading'){
    return <section><h2>Loading....</h2></section>
  }

  if(status === 'error'){
    return <section><h2>Whoa an error has occured..</h2></section>
  }

  return (
    // USER BOARD
    <section className={styles.profileContainer}>

      <div className={styles.userProfileContainer}>
        <div className={styles.image}>
          <img src={currentUser?.profilePicture} />
          <div className={styles.editIcon} onClick={handleUploadPhotoOpen}>
            <ModeEditOutlinedIcon />
          </div>
        </div>

        <div className={styles.userInfo} >
          <div>
            <h3>{currentUser?.email} </h3>
          </div>
          <div className={styles.stats}>
            <h5>
              Books finished: <span>{completedBooks.length}</span>
            </h5>
            <h5>
              Total pages read: <span>{totalOfPagesRead}</span>
            </h5>
          </div>
        </div>
      </div>


      {/* PROFILE PICTURE UPLOAD */}
        <ProfilePictureUploadForm
        currentUserId={id}
        handleOpenPictureUploadForm={handleOpenPictureUploadForm}
        />
 

      {/* HEADER */}
      <Header title={`Welcome, ${currentUser?.firstName}! Enjoy using`}>
        <ActionButton onClick={handleCreateBookFormOpen}>
          Create book!
        </ActionButton>
      </Header>


      {/* CREATE BOOK FORM */}
      <section className={handleOpenCreateBookForm? "d-flex" : "d-none"}>
        <CreateBookForm 
        currentUserId={id}
        handleCreateBookFormOpen={handleCreateBookFormOpen}
        />
      </section>

      {/* CURRENTLY READING */}
      <section className={styles.singleBookContainer}>
        <div className={styles.addBook}>
          <h3>Currently reading...</h3>
          <div className={styles.addIcon} onClick={handleCreateBookFormOpen}>
            <AddCircleOutlineOutlinedIcon fontSize="large" />
          </div>
        </div>
        <ul className={styles.booksInProgress}>

          {/* ONE BOOK */}
          {booksInProgress.map((book) => 
        <li   key={book._id}>
            <OneBookCard 
     
          book={book}
          currentUserId={id}
          />
        </li>
          )}

        </ul>
      </section>


      {/* LINK TO FINISHED BOOKS */}
      <div className={styles.bookLibraryContainer}>
        <h1>Explore books you have already finished!</h1>
        <Link className={styles.arrowRight} to={`/book-library/${id}`} ><ArrowCircleRightOutlinedIcon /></Link>
      </div>

    </section>
  );
};




// FAKE DATA
const user = {
  id: "myId",
  name: "Joana",
  email: "joana@gmail.com",
  password: "Joana",
  passwordRepeat: "Joana",
  image:
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
};

const finishedBooks = [
  { title: "Harry Potter", pages: 450 },
  { title: "Lord Of The Rings", pages: 450 },
  { title: "Lord Of The Rings", pages: 650 },
];

// const booksInProgress = {
//   id: "bookdId",
//   author: "J.R.R. Tolkien",
//   title: "The Lord of the Rings",
//   pages: "1216",
//   year: "1954",
//   coverImage:
//     "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
// };
