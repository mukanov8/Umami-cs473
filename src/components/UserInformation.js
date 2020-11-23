import React, { useState } from "react";
import { db } from "../firebase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

const UserInformation = ({ user, setUser }) => {
  console.log(user);
  const [currInfo, setInfo] = useState({ ...user });
  // const [formValue, setFormValue] = useState({ name: "", email: "" });

  const levelOfExpertise = ["Home training", "Sports", "Gym Training"];
  const ExerciseGoal = ["Weight loss", "Weight gain", "Muscle gain"];
  const exercises = ["squats", "deadlifts", "pullups"];

  const [genderValue, setGenderValue] = React.useState(user.gender);
  const [birthDatevalue, setBirthDate] = React.useState(user.birthdate);
  const [levelOfExpertiseValue, setLevelOfExpertise] = React.useState(
    user.levelOfExpertise
  );
  const [exerciseGoalValue, setExerciseGoal] = React.useState(
    user.exerciseGoal
  );

  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);
  };
  const hanldeBirthDateChange = (event) => {
    setBirthDate(event.target.value);
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
    // Update the current info with the new information
    let newInfo = { ...currInfo };
    newInfo.gender = genderValue;
    newInfo.birthdate = birthDatevalue;
    newInfo.levelOfExpertise = levelOfExpertiseValue;
    newInfo.exerciseGoal = exerciseGoalValue;
    newInfo.preferredExercises = currInfo.preferredExercises;
    setUser(newInfo);

    // Update the current information to firestore
    var userRef = db.collection("users").doc(user.id);
    console.log(userRef);
    userRef
      .update(currInfo)
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  function isChecked(exercise) {
    return currInfo.preferredExercises[exercise] === true;
  }

  if (user == null) {
    return <h1> Not logged in</h1>;
  } else {
    return (
      <div>
        <h1>User Information</h1>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Password: {user.password}</div>
        <div>
          Date of birth:{" "}
          <TextField
            id="outlined-basic"
            label={birthDatevalue}
            variant="outlined"
            onChange={hanldeBirthDateChange}
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
              <FormControlLabel
                key={i}
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
              <FormControlLabel
                key={i}
                value={goal}
                control={<Radio />}
                label={goal}
              />
            ))}
          </RadioGroup>
        </div>
        <div>
          <FormGroup>
            <div>Preferred Exercise Types:</div>
            {exercises.map((exercise, i) => (
              <FormControlLabel
                key={i}
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
