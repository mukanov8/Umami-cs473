import React, { useState, useEffect } from "react";
import { db } from "../firebase";
// import Paper from 'material-ui/core/Paper'

import Card from '@material-ui/core/Card';

const Feed = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    db.collection("posts")
      .get()
      .then((res) => {
        setPosts(res.docs.map((p) => p.data()));
      });
  }, []);

  return (
    <div >

    {/* <div> */}
      <h1>Feed</h1>
      {posts ? (
        posts.map((p, i) => (
          <Card key={i}>
            <img src={p.video} alt="video" />
            <p>{p.caption}</p>
            <p>Exercise: {p.exercise}</p>
          </Card>
        ))
      ) : (
        <></>
      )}
    {/* </div> */}
    </div>
  );
};

export default Feed;
