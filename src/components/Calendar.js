import React, { useState,useEffect } from "react";
import { db } from "../firebase";



const Calendar = ({user}) => {
  const [array,setArray]=useState([]);
  useEffect(()=>{
  db.collection("exercises")
      .where("userid", "==", user.id)
      .get().then((exes) => {
        exes.docs.forEach((entry) => {
          alert("exercise: "+entry.data().exercise+"\n"+"dates: "+entry.data().day+"\nstarttime: "+entry.data().starthour+":"+entry.data().startmin+"\nfintime: "+entry.data().finhour+":"+entry.data().finmin)
        });
      });
    })
  return (
    <div>
      <h1>
        Calendar</h1>
      <h2>Backend - sends exercise schedule info to frontend</h2>
      
    </div>
  );
};

export default Calendar;
