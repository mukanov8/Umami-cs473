import React, { useState } from "react";

const App = () => {
  return (
    <div>
      <h1>Add Exercise</h1>
      <p> Frontend - sends exercise info to backend</p>
      <ul>
        <li>list of integers 1-7, 1-Monday, 2-Tuesday,ect</li>
        <li>start time</li>
        <li>end time</li>
        <li>string - what exercise</li>
      </ul>
      <h2>Backend - saves the info</h2>
    </div>
  );
};

export default App;
