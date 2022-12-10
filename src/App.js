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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/singout" element={<SingOut />} />
        </Route>

        <Route path="/singin" element={<SingIn />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
