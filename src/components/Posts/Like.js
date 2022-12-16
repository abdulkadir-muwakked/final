import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AtuthContext";

const Like = () => {
    const [tweets, setTweets] = useState(null);
    const { token } = useContext(AuthContext);

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
        <div>
            
        </div>
    );
};

export default Like;