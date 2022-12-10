import React from "react";
import  "./Sidebar.css" ;
import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillLock } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import { MdExplore, MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { DiReact } from "react-icons/di"; 

const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <AiFillHome />,
    },
    {
      path: "/messages",
      name: "messages",
      icon: < MdEmail />,
    },
    {
      path: "/bookmarks",
      name: "BookMarks",
      icon: <BsFillBookmarksFill />,
    },
    {
      path: "/explore",
      name: "Explore",
      icon: <MdExplore />,
    },
    {
      path: "/lists",
      name: "Lists",
      icon: <HiMenuAlt3 />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <CgProfile />,
    },
    {
      path: "/singout",
      name: "SingOut",
      icon: <AiFillLock />,
    },
  ];
  return (
    <div className="sidebar">
        <div className=" top_section">
          <div className=" logo"> {<DiReact />} </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link ">
           {item.icon}   {item.name} 
          </NavLink>
        ))}
    </div>
  );
};
export default Sidebar;
