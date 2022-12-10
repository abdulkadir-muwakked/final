import React from "react";
import { NavLink } from "react-router-dom";
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
  return (
    <div className="head" style={{
      paddingLeft: "300px "

    }}>
         
        <div>
            
               {matchPath === Home? <h2>home</h2> : <h2>profile</h2> }
            
            
        </div>
      <div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
             {item.icon} </NavLink>
        ))}
      </div>
    </div>
  );
};
export default Header;
