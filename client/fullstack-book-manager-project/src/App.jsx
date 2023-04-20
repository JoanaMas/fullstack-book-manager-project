import React from 'react';
import './app.scss';
import './style/_style.scss';
import './style/_reset.scss';
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './routes/routes';
// Pages
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import SingleBookPage from './pages/singleBook/SingleBookPage';
import FinishedBooksPage from './pages/finisgedBooks/FinishedBooksPage';
// Components
import Navbar from './components/navBar/Navbar';
// Redux
import { useSelector } from 'react-redux';

function App() {

  // Null user to fix design
  const user = useSelector(state => state.users.value.user);

  return (
    <div>

      <BrowserRouter>
      
      <Navbar />

      <div className='container'>
      
      <Routes>
        <Route path={routes.registerPage} element={<RegisterPage />}></Route>
        <Route path={routes.loginPage} element={<LoginPage />}></Route>
        <Route path={routes.homePage} element={<HomePage />}></Route>
        <Route path={routes.profilePage} element={<ProfilePage />}></Route>
        <Route path={routes.singleBookPage} element={<SingleBookPage />}></Route>
        <Route path={routes.finishedBooks} element={<FinishedBooksPage/>}></Route>
      </Routes>
      
      </div>

      </BrowserRouter>

    </div>

  )
}

export default App
