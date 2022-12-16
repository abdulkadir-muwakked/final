import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookMarks from "./pages/bookMarks/BookMarks";
import Explore from "./pages/Explore 2/Explore";
import Lists from "./pages/lists/Lists";
import SingIn from "./pages/signIn/SingIn";
import SingOut from "./pages/signOut/SingOut";
import RequiredAuth from "./RequiredAuth";
import { AuthContext } from "./context/AtuthContext";
import  React, { useContext, Suspense } from "react";
import Loader from "./components/loader/Loader";
const Profile = React.lazy(()=> import("./pages/profile/Profile"))
const Home = React.lazy(()=> import("./pages/home/Home"))
const SingUp = React.lazy(()=> import("./pages/signUp/SingUp"))


function App() {
const {token} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
       

       <Route path={"/"} element={<Suspense fallback={<Loader/>}> {token ? <Home/> : <SingUp/>}</Suspense>}  /> 
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/profile" element={<Suspense fallback={<Loader/>}><Profile /></Suspense>} />
          <Route path="/singout" element={<SingOut />} />
        <Route path="/singin" element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
