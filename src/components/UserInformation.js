import React, { useState } from "react";
import { db } from "../firebase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

const UserInformation = ({ user, setUser }) => {
  console.log(user);
  const [currInfo, setInfo] = useState({ ...user });
  // const [formValue, setFormValue] = useState({ name: "", email: "" });

  const levelOfExpertise = ["Home training", "Sports", "Gym Training"];
  const ExerciseGoal = ["Weight loss", "Weight gain", "Muscle gain"];
  const exercises = ["squats", "deadlifts", "pullups"];
  const name = user.name;
  const email = user.email;
  const password = user.password;

  const [genderValue, setGenderValue] = React.useState(user.gender);
  const [levelOfExpertiseValue, setLevelOfExpertise] = React.useState(
    user.levelOfExpertise
  );
  const [exerciseGoalValue, setExerciseGoal] = React.useState(
    user.exerciseGoal
  );

  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);
  };
  const handleLevelOfExpertiseChange = (event) => {
    setLevelOfExpertise(event.target.value);
  };
  const handleExerciseGoalChange = (event) => {
    setExerciseGoal(event.target.value);
  };
  const handlePreferredExercisesChange = (event) => {
    let newCurrInfo = { ...currInfo };
    newCurrInfo.preferredExercises[event.target.name] = event.target.checked;
    setInfo(newCurrInfo);
  };
  function onUpdate() {
    console.log(genderValue);
    console.log("Doing something here");
    console.log(exerciseGoalValue);
    let newInfo = { ...currInfo };
    newInfo.gender = genderValue;
    newInfo.birthdate = currInfo.birthdate;
    newInfo.levelOfExpertise = levelOfExpertiseValue;
    newInfo.exerciseGoal = exerciseGoalValue;
    newInfo.preferredExercises = currInfo.preferredExercises;
    var userRef = db.collection("users").doc(user.id);
    console.log(userRef);
    userRef
      .update(newInfo)
      .then(function () {
        console.log("Document successfully updated!");
        setUser(newInfo);
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  function isChecked(exercise) {
    return currInfo.preferredExercises[exercise] === true;
  }

  function setPreferredExercise(exercise, value) {
    let newCurrInfo = { ...currInfo };
    newCurrInfo.preferredExercises[exercise] = value;
    setInfo(newCurrInfo);
    console.log(currInfo.preferredExercises);
  }

  function getDefaultRadioValue(fieldName, value) {
    return currInfo[fieldName] === value;
  }

  function getDefaultCheckBoxValue(fieldName, valueName) {
    return currInfo[fieldName][valueName];
  }

  if (user == null) {
    return <h1> Not logged in</h1>;
  } else {
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
            // onChange={handleRadioChange}
          />
        </div>
        <div>
          Gender:
          <div>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={genderValue}
              onChange={handleGenderChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
        </div>
        <div>
          <RadioGroup
            aria-label="levelOfExpertise"
            name="levelOfExpertise"
            value={levelOfExpertiseValue}
            onChange={handleLevelOfExpertiseChange}
          >
            Level of Expertise:
            {levelOfExpertise.map((exp, i) => (
              // <div key={i}>
              //   {" "}
              //   <input
              //     type="radio"
              //     value={exp}
              //     name="levelOfExpertise"
              //     checked={getDefaultRadioValue("levelOfExpertise", exp)}
              //     onChange={handleRadioChange}
              //   />{" "}
              //   {exp}
              // </div>
              <FormControlLabel
                id={exp}
                value={exp}
                control={<Radio />}
                label={exp}
              />
            ))}
          </RadioGroup>
        </div>
        <div>
          <RadioGroup
            aria-label="exerciseGoal"
            name="exerciseGoal"
            value={exerciseGoalValue}
            onChange={handleExerciseGoalChange}
          >
            Exercise Goal:
            {ExerciseGoal.map((goal, i) => (
              <FormControlLabel value={goal} control={<Radio />} label={goal} />
            ))}
          </RadioGroup>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={true} name="gilad" />}
              label="Gilad Gray"
            />
          </FormGroup>
          <FormGroup>
            <div>Preferred Exercise Types:</div>
            {exercises.map((exercise, i) => (
              <FormControlLabel
                control={
                  <Checkbox checked={isChecked(exercise)} name={exercise} />
                }
                label={exercise}
                onChange={handlePreferredExercisesChange}
              />
            ))}
          </FormGroup>
        </div>
        <button onClick={onUpdate}>Update</button>
      </div>
    );
  }
};

export default UserInformation;
