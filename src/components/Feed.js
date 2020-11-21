import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const App = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    db.collection("posts")
      .get()
      .then((res) => {
        setPosts(res.docs.map((p) => p.data()));
      });
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {posts ? (
        posts.map((p, i) => (
          <div key={i}>
            <img src={p.video} alt="video" />
            <p>{p.caption}</p>
            <p>Exercise: {p.exercise}</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
