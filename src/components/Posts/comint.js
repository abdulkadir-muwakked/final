import "./Posts.css";

  import React from 'react';
  import Avatar from "@mui/material/Avatar";
  import { AuthContext } from "../../context/AtuthContext";
  import { useContext, useEffect, useRef, useState } from "react";
  import * as dayjs from "dayjs";


const Comments = ({tweet}) => {
    let relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
    const { token } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const newCom = useRef();

    const newComment = async () => {
        const res = await fetch(`http://ferasjobeir.com/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newCom.current.value,
            post_id:tweet.id
          }),
        });
        const json = await res.json();
      
        console.log(json, "this is json");
        if (json.success) {
          console.log(json.messages);
          const Ndata = [json.data, ...comments];
          newCom.current.value = " ";
          setComments(Ndata);
        } else {
          console.log(json);
          alert(json.messages);
        }
        console.log([json.data, ...comments]);
      };
      
      
      useEffect(() => {
        const getcomments = async (id) => {
          const response = await fetch(`http://ferasjobeir.com/api/posts/${tweet?.id}`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          if (json.success){
            console.log(json);
            setComments(json.data.comments);
          }
          
        };
        getcomments();
      }, []);
        console.log(comments);

    return (
        <div >

        {comments?.map((comment, i) => {
          return (
            <div >
              <div className="Scomment" key={i}>
                <div className="avatarN">
                  <Avatar src={comment?.user?.avatar} />
                </div>
                <div className="Ccomment">
                  <div>{comment?.user?.name}</div>
                  <div>
                    <small style={ {
                      fontSize: "10PX"
                    }}>{dayjs(comment?.created_at).fromNow()}</small>
                  </div>
                  <div>{comment?.content}</div>
                  <div>
                  </div>
                </div>
              </div>
              
            </div>
          );
        })}
        <div className="ibc">
        <input 
        type="text"
        className="inputIbc"
         ref={newCom}
         placeholder="Add a new comment"
        ></input>
        <button onClick={() => newComment()} className="added"><small>Add</small></button>
        </div>
      </div>    
    );
};

export default Comments;