import "../../components/Posts/Posts.css";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AtuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { TfiComment } from "react-icons/tfi";
import { style } from "@mui/system";
import * as dayjs from "dayjs";
import Layout from "../../components/layout/Layout"


const BookMarks = () => {
  let relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const { token } = useContext(AuthContext);
  const [tweets, setTweets] = useState(null);

  // ///////////
  const newTwt = useRef();
  console.log(token);

  const newTweets = async () => {
    const res = await fetch(`http://ferasjobeir.com/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: newTwt.current.value,
      }),
    });
    const json = await res.json();

    console.log(json, "this is json");
    if (json.success) {
      console.log(json.messages);
      const Ndata = [json.data, ...tweets];
      newTwt.current.value = " ";
      setTweets(Ndata);
    } else {
      console.log(json);
      alert(json.messages);
    }
    console.log([json.data, ...tweets]);
  };

  // ////////////////////
  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch(`http://ferasjobeir.com/api/posts?page=1`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (json.success) console.log(json);
      setTweets(json.data.data);
    };
    getTweets();
    console.log(tweets);
  }, []);

  const love = async (tweet) => {
    const loved = await fetch(
      `http://ferasjobeir.com/api/posts/${
        tweet.liked_by_current_user ? "unlike" : "like"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: tweet.id,
        }),
      }
    );
    const newLoved = await loved.json();
    if (newLoved.success) {
      const newTweets = [...tweets];
      const index = newTweets.findIndex((item) => item.id == newLoved.data.id);
      newTweets[index] = newLoved.data;
      setTweets(newTweets);
    }
  };


  return (
    <Layout>
<div>
      
      <div className="new">
        <Avatar
          className="avatarN"
          alt="Travis Howard"
          src="https://www.gravatar.com/avatar/b9d07bf485929b7b39ed1d3d7b2d4f2c?s=200"
        />
        <div className="textarea">
          <textarea
            style={{
              height: "120px",
              width: "90%",
              outline: 0,
              resize: "none",
              border: "none",
            }}
            ref={newTwt}
            placeholder="What is happening?"
          ></textarea>
          <button onClick={() => newTweets()} className="create">
            Create Post
          </button>
        </div>
      </div>

      <div>
        {tweets?.map((tweet, i) => {
          return (
            <div className="Bpost">
              <div className="Spost" key={i}>
                <div className="avatarN">
                  <Avatar src={tweet?.user?.avatar} />
                </div>
                <dive className="Cpost">
                  <div>{tweet?.user?.name}</div>
                  <div>
                    <small>{dayjs(tweet?.created_at).fromNow()}</small>
                  </div>
                  <div>{tweet?.content}</div>
                  <div>
                    <div className="LCicouns">
                      <div className="Licouns" onClick={() => love(tweet)}>
                        {tweet.liked_by_current_user ? (
                          <FcLike />
                        ) : (
                          <FcLikePlaceholder />
                        )}

                        <label style={{ margin: "0 0 0 7px" }}>
                          {tweet?.likes_count}
                        </label>
                      </div>
                      <div className="Licouns">
                        <TfiComment style={{ margin: "7px" }} />
                        {tweet?.comments_count}
                      </div>
                    </div>
                  </div>
                </dive>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </Layout>
    
  );
};
export default BookMarks;
  