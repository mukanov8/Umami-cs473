import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
const UserInformation = ({ user, setUser }) => {
  const exercises = { squats: false, deadlifts: false, pullups: false };
  const [currInfo, setInfo] = useState({ birthdate: "", exercises: exercises });
  if (user == null) {
    return <h1> Not logged in</h1>;
  }
  // const [formValue, setFormValue] = useState({ name: "", email: "" });

  const levelOfExpertise = ["Home training", "Sports", "Gym Training"];
  const ExerciseGoal = ["Weight loss", "Weight gain", "Muscle gain"];
  const name = user.name;
  const email = user.email;
  const password = user.password;

  function onUpdate() {
    console.log(currInfo);
  }

  function handleRadioChange(e) {
    const { name, value } = e.target;
    let newCurrInfo = { ...currInfo };
    newCurrInfo[name] = value;
    setInfo(newCurrInfo);
    console.log(currInfo);
  }

  function setPreferredExercise(exercise, value) {
    let newCurrInfo = { ...currInfo };
    newCurrInfo.exercises[exercise] = value;
    setInfo(newCurrInfo);
    console.log(currInfo.exercises);
  }

  return (
    <div>
      <h1>User Information</h1>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Password: {password}</div>
      <div>
        Date of birth:{" "}
        <input
          type="text"
          name="birthdate"
          placeholder="01/01/01"
          onChange={handleRadioChange}
        />
      </div>
      <div>
        Gender:
        <div>
          <input
            type="radio"
            value="MALE"
            name="gender"
            onChange={handleRadioChange}
          />{" "}
          Male
          <input
            type="radio"
            value="FEMALE"
            name="gender"
            onChange={handleRadioChange}
          />{" "}
          Female
        </div>
      </div>
      <div>
        Level of Expertise:
        {levelOfExpertise.map((exercise, i) => (
          <div key={i}>
            {" "}
            <input
              type="radio"
              value={exercise}
              name="expertise"
              onChange={handleRadioChange}
            />{" "}
            {exercise}
          </div>
        ))}
      </div>
      <div>
        Exercise Goal:
        {ExerciseGoal.map((exercise, i) => (
          <div key={i}>
            {" "}
            <input
              type="radio"
              value={exercise}
              name="exercise-goal"
              onChange={handleRadioChange}
            />{" "}
            {exercise}
          </div>
        ))}
      </div>
      <div>
        <div>Preferred Exercise Types:</div>
        {Object.entries(exercises).map(([exercise, v]) => (
          <div>
            {" "}
            <input
              type="checkbox"
              onChange={(e) => setPreferredExercise(exercise, e.target.checked)}
            />{" "}
            {exercise}
          </div>
        ))}
      </div>
      <button onClick={onUpdate()}>Update</button>
    </div>
  );
};

export default UserInformation;
