import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from "../../context/AtuthContext";



const Tweetd = () => {
    
  const { token } = useContext(AuthContext);
  const [tweets, setTweets] = useState(null);
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
        } else {
          console.log(json);
          alert(json.messages);
        }
        console.log([json.data, ...tweets]);
      };
    
    return (
        <div>
            <h1>Explore page</h1>
        </div>
    );
};

export default Tweetd;
 