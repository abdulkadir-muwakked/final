import React from "react";
import { AuthContext } from "../../context/AtuthContext";
import { useContext, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Avatar from "@mui/material/Avatar";
import { AiOutlineCamera } from "react-icons/ai";

import "./Profile.css";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);
  const fileRef = useRef();
  const updateProfile = async (e) => {
    e.preventDefault();
    const newData = new FormData(e.target);
    const response = await fetch(`https://www.ferasjobeir.com/api/users/me`, {
      method: "post",
      body: newData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div className="profile">
      <Sidebar />
      <div class="posts">
        <div className="container">
        <input
          id="image"
          type="file"
          ref={fileRef}
          style={{
            display: `none`,
          }}
        />

        <form onSubmit={updateProfile} method="put" className="profilForm">

            <div className="person-avatar">
            <AiOutlineCamera className="icon"   onClick={() => fileRef.current.click()}/>

          <Avatar className="avatar"
            style={{
              width: 100,
              height: 100,
            }}
           alt="Remy Sharp"
            src={userData.avatar}
          
            
          />
          </div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => {
              setUserData({
                ...userData,
                name: e.target.value,
              });
            }}
          />
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            name="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({
                ...userData,
                email: e.target.value,
              });
            }}
          />
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
          <label htmlFor="New Password">New Password</label>
          <input name="New Password" id="password" type="password" />
          <label htmlFor="password_confirmation">password_confirmation</label>
          <input name="password_confirmation" id="password" type="password" />
          <input type="submit"   value= "{'method'}" />
        </form>
      </div>
 
        </div>
      </div>
  );
};

export default Profile;
