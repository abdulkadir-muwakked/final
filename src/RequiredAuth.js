import { useEffect,  } from "react";
import { useLocation ,Navigate, Outlet } from "react-router-dom";


const RequiredAuth = () => {
    let  token = window.localStorage.getItem("token") || null;
    const location =  useLocation();
    useEffect(() => {
       token = localStorage.getItem("token") || null;
      }, [location.pathname]);

    return token ? (<Outlet/>) : <Navigate to={"/"} state-={{from:location}} replace />
}

export default RequiredAuth;