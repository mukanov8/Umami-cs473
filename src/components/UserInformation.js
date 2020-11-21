import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../firebase";

const UserInformation = ({ user, setUser }) => {
  const [currInfo, setInfo] = useState({ ...user });
  if (user == null) {
    return <h1> Not logged in</h1>;
  }
  // const [formValue, setFormValue] = useState({ name: "", email: "" });

  const levelOfExpertise = ["Home training", "Sports", "Gym Training"];
  const ExerciseGoal = ["Weight loss", "Weight gain", "Muscle gain"];
  const exercises = ["squats", "deadlifts", "pullups"];
  const name = user.name;
  const email = user.email;
  const password = user.password;

  function onUpdate() {
    var userRef = db.collection("users").doc(user.id);
    console.log(userRef);
    userRef
      .update({
        gender: currInfo.gender,
        birthdate: currInfo.birthdate,
        levelOfExpertise: currInfo.levelOfExpertise,
        exerciseGoal: currInfo.exerciseGoal,
        preferredExercises: currInfo.preferredExercises,
      })
      .then(function () {
        console.log("Document successfully updated!");
        setUser(currInfo);
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
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
    newCurrInfo.preferredExercises[exercise] = value;
    setInfo(newCurrInfo);
    console.log(currInfo.preferredExercises);
  }

  function getDefaultRadioValue(fieldName, value) {
    return currInfo[fieldName] == value;
  }

  function getDefaultCheckBoxValue(fieldName, valueName) {
    return currInfo[fieldName][valueName];
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
          placeholder={currInfo.birthdate}
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
            checked={getDefaultRadioValue("gender", "MALE")}
          />{" "}
          Male
          <input
            type="radio"
            value="FEMALE"
            name="gender"
            checked={getDefaultRadioValue("gender", "FEMALE")}
            onChange={handleRadioChange}
          />{" "}
          Female
        </div>
      </div>
      <div>
        Level of Expertise:
        {levelOfExpertise.map((exp) => (
          <div>
            {" "}
            <input
              type="radio"
              value={exp}
              name="levelOfExpertise"
              checked={getDefaultRadioValue("levelOfExpertise", exp)}
              onChange={handleRadioChange}
            />{" "}
            {exp}
          </div>
        ))}
      </div>
      <div>
        Exercise Goal:
        {ExerciseGoal.map((goal) => (
          <div>
            {" "}
            <input
              type="radio"
              value={goal}
              name="exerciseGoal"
              checked={getDefaultRadioValue("exerciseGoal", goal)}
              onChange={handleRadioChange}
            />{" "}
            {goal}
          </div>
        ))}
      </div>
      <div>
        <div>Preferred Exercise Types:</div>
        {exercises.map((exercise) => (
          <div>
            {" "}
            <input
              type="checkbox"
              checked={getDefaultCheckBoxValue("preferredExercises", exercise)}
              onChange={(e) => setPreferredExercise(exercise, e.target.checked)}
            />{" "}
            {exercise}
          </div>
        ))}
      </div>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
};

export default UserInformation;
