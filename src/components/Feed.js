import React, { useState } from "react";

const App = () => {
  return (
    <div>
      <h1>Feed</h1>
      <h2>Posts</h2> Let's not implement comments just yet.
      <p>Frontend - request posts from backend</p>
      <p>
        Backend - sends <b>10 latest posts</b> to fronend. Frontend will display
        them
      </p>
      <p>
        {" "}
        when the user scrolls to the bottom post, frontend will request more
        posts and backend will send 10 more posts.
      </p>
      <h2>Search - maybe later</h2>
    </div>
  );
};

export default App;
