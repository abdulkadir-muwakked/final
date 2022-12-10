import React from "react";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/head/Head";

import "./Home.css";
const Home = () => {
  return (
    <div className="home">
    
      <Sidebar />
      
     <Header />
     
      <Posts />
       
    </div>
  );
};

export default Home;
