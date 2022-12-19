import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AtuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { TfiComment } from "react-icons/tfi";
import * as dayjs from "dayjs";
import Comments from "./comint";
import Loader from "../loader/Loader";
import { MdLastPage } from "react-icons/md";

const Post = () => {
  let relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const { token, user } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);
  const [pending, setPending] = useState(false);
  const [openComment, setOpenComment] = useState({
    id: 0,
    open: false,
  });
  const [lastPage, setLastPage] = useState (2)
  // ///////////
  const newTwt = useRef();

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
      console.log(Ndata);
    } else {
      console.log(json);
      alert(json.messages);
    }
    console.log([json.data, ...tweets]);
  };

  // ////////////////////
  const handleOnScroll = () => {
    let userScrollH = document.documentElement.scrollTop;

    console.log(userScrollH, "userScrollH");

    let windowBottomHeight = document.documentElement.offsetHeight;
    console.log(pageCounter);

    console.log(windowBottomHeight, "windowBottomHeight");

    if (userScrollH / 1.6 >= windowBottomHeight * pageCounter && lastPage>pageCounter) {
      console.log("if firde", 11111);

      setPageCounter(pageCounter + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => handleOnScroll());
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("scroll", () => handleOnScroll());
    };
  }, [document.documentElement.scrollTop]);

  useEffect(() => {
    const getTweets = async () => {
      setPending(true);

      const response = await fetch(
        `http://ferasjobeir.com/api/posts?page=${pageCounter}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) console.log(json);
      setTweets([...tweets, ...json.data.data]);
      setPending(false);
setLastPage(json.data.last_page)
console.log(lastPage);
    };
    getTweets();
    console.log(pageCounter);
  }, [pageCounter]);

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

  const opComment = (id) => {
    setOpenComment({
      id, 
      open: !openComment.open,
    });
  };

  return (
    <div>
      <div className="new">
        <Avatar
          className="avatarN"
          alt="Travis Howard"
          src={user?.avatar}
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

      <div className="Bpost">
        {tweets?.map((tweet, i) => {
          return (
            <div>
              <div className="Spost" key={i}>
                <div className="avatarN">
                  <Avatar src={tweet?.user?.avatar} />
                </div>
                <div className="Cpost">
                  <div>{tweet?.user?.name}</div>
                  <div>
                    <small>{dayjs(tweet?.created_at).fromNow()}</small>
                  </div>
                  <div>{tweet?.content}</div>
                  <div>
                    <div className="LCicouns">
                      <div className="likComent">
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
                        <div
                          className="Licouns"
                          onClick={() => opComment(tweet.id)}
                        >
                          <TfiComment style={{ margin: "7px" }} />
                          {tweet?.comments_count}
                        </div>
                      </div>

                      <div>
                        {tweet.id == openComment.id && openComment.open && (
                          <Comments tweet={tweet} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {pending && <Loader />}
    </div>
  );
};
export default Post;
