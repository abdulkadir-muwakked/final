import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import BookMarks from "./pages/bookMarks/BookMarks";
import Explore from "./pages/Explore 2/Explore";
import Lists from "./pages/lists/Lists";
import Profile from "./pages/profile/Profile";
import SingIn from "./pages/signIn/SingIn";
import SingOut from "./pages/signOut/SingOut";
import SingUp from "./pages/signUp/SingUp";
import RequiredAuth from "./RequiredAuth";
import { AuthContext } from "./context/AtuthContext";
import { useContext } from "react";

function App() {
const {token} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
       <Route path={"/"} element={token ? <Home/> : <SingUp/> }  /> 
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/singout" element={<SingOut />} />
        <Route path="/singin" element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
