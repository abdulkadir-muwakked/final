import React from "react";
import Posts from "../../components/Posts/Posts";
import Layout from "../../components/layout/Layout"


import "./Home.css";
const Home = () => {
  return (
    <div>
    <Layout >
    <>
    <Posts />
    </>
    </Layout>
    </div>
  );
};

export default Home;
