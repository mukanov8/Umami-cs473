import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const AddTrainee = ({ user, setUser }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    db.collection("users")
      .get()
      .then((users) => {
        setUsers(
          users.docs
            .filter((u) => u.id !== user.id)
            .map((user) => ({ ...user.data(), id: user.id }))
        );
      });
  }, [user]);

  const handleClick = (user2) => {
    // If the user does not have any trainees yet
    const trainees = user.trainees
      ? user.trainees.concat(user2.id)
      : [user2.id];
    const trainees2 = user2.trainees
      ? user2.trainees.concat(user.id)
      : [user.id];

    //Updating user state
    setUser({ ...user, trainees });

    db.collection("users").doc(user.id).update({ trainees });
    db.collection("users").doc(user2.id).update({ trainees: trainees2 });
  };

  return (
    <div>
      <h2>Current Trainees</h2>
      <ul>
        {users && user.trainees ? (
          users
            .filter((u) => user.trainees.includes(u.id))
            .map((u) => <li key={u.id}>{u.name}</li>)
        ) : (
          <></>
        )}
      </ul>
      <h2>Add New Trainees</h2>
      <ul>
        {users ? (
          users
            .filter((u) => user.trainees && !user.trainees.includes(u.id))
            .map((u) => (
              <li key={u.id}>
                {u.name}
                <button onClick={() => handleClick(u)}>Add</button>
              </li>
            ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default AddTrainee;
