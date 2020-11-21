import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const FeedCard = styled(Card)`
  ${'' /* padding-bottom: 10px; */}
  margin: 0px 0px 20px 0px;
  max-width: 500px;
  max-height: 800px;
`;

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
      <h1>Feed</h1>
      {posts ? (
        posts.map((p, i) => (
          <FeedCard key={i}>
            <img src={p.video} alt="video" />
            <p>{p.caption}</p>
            <p>Exercise: {p.exercise}</p>
          </FeedCard>
        ))
      ) : (
        <></>
      )}
    {/* </div> */}
    </div>
  );
};

export default Feed;
