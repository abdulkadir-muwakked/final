import React, { useEffect } from "react";
import { AuthContext } from "../../context/AtuthContext";
import { useContext, useState, useRef } from "react";
 import Avatar from "@mui/material/Avatar";
import { AiOutlineCamera } from "react-icons/ai";
import Layout from "../../components/layout/Layout";

import "./Profile.css";
 
const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  
  const [pos, setPos] = useState([]);
  const [post, setPost] = useState([]);

  const fileRef = useRef();
  const getMyProfile = async () => {
    const res = await fetch("http://ferasjobeir.com/api/users/me", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    setUserData(json.data);
  };
  useEffect(() => {
    getMyProfile();
  }, []);

  // ////////
  const deletPost = async (pos) => {
    const ress = await fetch(`http://ferasjobeir.com/api/posts/${pos}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    const deletNewPost = await ress.json();
    setPos(...getMyProfile);
    if(deletNewPost.success){
      const newtwet = [...post]
      const index = newtwet.findIndex(item => item.id == deletNewPost.data.id)
      newtwet[index] = deletNewPost.data
      setPos([...pos ,...newtwet])
  }
  };
  // ///

  const updateProfile = async (e) => {
    e.preventDefault();
    const newData = new FormData(e.target);
    newData.append("_method", "put");
    console.log(newData);
    const response = await fetch("http://ferasjobeir.com/api/users/me", {
      method: "POST",
      body: newData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <Layout>
      <>
        <div className="Information">My Information</div>
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
            <AiOutlineCamera
              className="icon"
              onClick={() => fileRef.current.click()}
            />

            <Avatar
              className="avatar"
              style={{
                width: 100,
                height: 100,
                margin: "0 0 15px 42%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              alt="Remy Sharp"
              src={userData?.avatar}
            />
          </div>
          <label htmlFor="name">Name</label>
          <input
            className="input"
            id="name"
            type="text"
            name="name"
            value={userData?.name}
            onChange={(e) => {
              setUserData({
                ...userData,
                name: e.target.value,
              });
            }}
          />
          <label htmlFor="email">Email Address</label>
          <input
            className="input"
            id="email"
            type="text"
            name="email"
            value={userData?.email}
            onChange={(e) => {
              setUserData({
                ...userData,
                email: e.target.value,
              });
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            className="input"
            name="password"
            id="password"
            type="password"
            value={userData?.password}
            onChange={(e) => {
              setUserData({
                ...userData,
                password: e.target.value,
              });
            }}
          />
          <label htmlFor="New Password">New Password</label>
          <input
            className="input"
            name="new_password"
            id="password"
            type="password"
            value={userData?.new_password}
            onChange={(e) => {
              setUserData({
                ...userData,
                new_password: e.target.value,
              });
            }}
          />
          <label htmlFor="password_confirmation">password_confirmation</label>
          <input
            className="input"
            name="new_password_confirmation"
            id="password"
            type="password"
            value={userData?.new_password_confirmation}
            onChange={(e) => {
              setUserData({
                ...userData,
                new_password_confirmation: e.target.value,
              });
            }}
          />
          <input
            type="submit"
            value="Update Profile"
            method="put"
            className="update"
          />
        </form>
        <div className="Information">My Posts</div>
        <div className="post">
          {userData?.posts.map((post) => (
            <div className="getPost">
              {post.content}
              <button
              value='DELETE'
                onClick={() => {
                  deletPost(post.id);
                }}
                className="delet"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Profile;
