import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const AddTrainee = ({ user }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    db.collection("users")
      .get()
      .then((users) => {
        setUsers(users.docs.map((user) => ({ ...user.data(), id: user.id })));
      });
  }, []);

  const handleClick = (user2) => {
    const currentUser = users.find((u) => u.name == user);
    const trainees = currentUser.trainees.concat(user2.id);
    db.collection("users").doc(currentUser.id).update({ trainees });
    db.collection("users")
      .doc(user2.id)
      .update({ trainees: user2.trainees.concat(currentUser.id) });
  };

  return (
    <div>
      <h1>Add Trainees</h1>
      <ul>
        {users ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleClick(user)}>Add</button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      <h2>
        Adding trainees have been implemented even though it might not be
        obvious from the UI{" "}
      </h2>
    </div>
  );
};

export default AddTrainee;
