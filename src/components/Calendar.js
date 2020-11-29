import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import { SettingsSystemDaydream } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checkControl: {
    margin: theme.spacing(1),
  },
}));

const Calendar = ({ user }) => {
  const classes = useStyles();
  const ndate = new Date();
  const [day, setDay] = useState(ndate.getDay());
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    let mounted = true;
    db.collection("exercises")
      .where("userid", "==", user.id)
      .orderBy("starthour")
      .get()
      .then((exes) => {
        if (mounted) {
          setExercises(exes.docs.map((e) => e.data()));
        }
      });
    return () => (mounted = false);
  }, [user.id]);

  const handleChange = (event) => {
    setDay(Number(event.target.name));
  };

  return (
    <div>
      <h1>Calendar</h1>
      <h2>You can see your exercise schedule for the selected weekday</h2>
      <FormControl component="fieldset" className={classes.checkControl}>
        <FormLabel component="legend">Select the date</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={day === 1} onChange={handleChange} name="1" />
            }
            label="Monday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day === 2} onChange={handleChange} name="2" />
            }
            label="Tuesday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day === 3} onChange={handleChange} name="3" />
            }
            label="Wednesday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day === 4} onChange={handleChange} name="4" />
            }
            label="Thursday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day === 5} onChange={handleChange} name="5" />
            }
            label="Friday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day === 6} onChange={handleChange} name="6" />
            }
            label="Saturday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day === 0} onChange={handleChange} name="0" />
            }
            label="Sunday"
          />
        </FormGroup>
      </FormControl>
      <h3>
        {exercises
          .filter((part) => part.day === day)
          .map((e) => (
            <li>
              {e.exercise +
                " Starting Time: " +
                e.starthour +
                ":" +
                e.startmin +
                " Finishing Time: " +
                e.finhour +
                ":" +
                e.finmin}
            </li>
          ))}
      </h3>
    </div>
  );
};

export default Calendar;
