import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome, AiFillLock } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./Head.css"
import Home from "../../pages/home/Home";
import { matchPath } from 'react-router';

const Header = (props) => {
  const menuItem = [
    {
      path: "/",

      icon: <AiFillHome />,
    },

    {
      path: "/profile",
      icon: <CgProfile />,
    },
    {
      path: "/singout",
      icon: <AiFillLock />,
    },
  ];

  const herf = useLocation()

  return (
    <div className="head" style={{
      paddingLeft: 0

    }}>
        <div style={{
          margin: "0 7px"
        }}>
            
               <h2>{!herf.pathname.replace(`/`, "" ) ? "Home" : herf.pathname.replace(`/`, " " ) } </h2>
            
             
        </div>
      <div className="icoun">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
             {item.icon} </NavLink>
        ))}
      </div>
    </div>
  );
};
export default Header;
