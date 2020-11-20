import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checkControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const useField = (type)=>{
  const [value,setValue] = useState('')
  const onChange =(event)=>{
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
const AddExercise= ({user}) => {
  const classes = useStyles();
  const starthour = useField('hour')
  const startmin=useField('minute')
  const finhour=useField('hour')
  const finmin=useField('minute')
  const exercise=useField('exercise')
  const history = useHistory()
  const [day, setState] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });


  const submitExercise = (event) => {
    event.preventDefault();
    if (day.monday==false&&day.tuesday==false&&day.wednesday==false&&day.thursday==false&&day.friday==false&&day.saturday==false&&day.sunday==false) {
      alert("At least one day of the week must be selected.");
      history.push("/addexercise");
      return;
    }
    if (starthour.value==""||startmin.value==""||finhour.value==""||finmin.value==""||exercise.value=="") {
      alert("Fields must not be left empty.");
      history.push("/addexercise");
      return;
    }
    if (starthour.value==finhour.value||starthour.min==finhour.min) {
      alert("You should not exercise over 24 hours.");
      history.push("/addexercise");
      return;
    }
    db.collection("exercises").add({
      userid:user.id,
      day: day,
      exercise: exercise.value,
      starthour: starthour.value,
      startmin: startmin.value,
      finhour: finhour.value,
      finmin: finmin.value
    })

    history.push("/");

  };

  const handleChange = (event) => {
    setState({ ...day, [event.target.name]: event.target.checked });
  };

  const { monday, tuesday, wednesday,thursday,friday,saturday,sunday } = day;
  return (
    
    <div>
      <FormControl component="fieldset" className={classes.checkControl}>
        <FormLabel component="legend">Register an exercise plan</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={monday} onChange={handleChange} name="monday" />}
            label="Monday"
          />
          <FormControlLabel
            control={<Checkbox checked={tuesday} onChange={handleChange} name="tuesday" />}
            label="Tuesday"
          />
          <FormControlLabel
            control={<Checkbox checked={wednesday} onChange={handleChange} name="wednesday" />}
            label="Wednesday"
          />
          <FormControlLabel
            control={<Checkbox checked={thursday} onChange={handleChange} name="thursday" />}
            label="Thursday"
          />
          <FormControlLabel
            control={<Checkbox checked={friday} onChange={handleChange} name="friday" />}
            label="Friday"
          />
          <FormControlLabel
            control={<Checkbox checked={saturday} onChange={handleChange} name="saturday" />}
            label="Saturday"
          />
          <FormControlLabel
            control={<Checkbox checked={sunday} onChange={handleChange} name="sunday" />}
            label="Sunday"
          />
        </FormGroup>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Starting Hour</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={starthour.value}
          onChange={starthour.onChange}
        >
          <MenuItem value={"00"}>0</MenuItem>
          <MenuItem value={"01"}>1</MenuItem>
          <MenuItem value={"02"}>2</MenuItem>
          <MenuItem value={"03"}>3</MenuItem>
          <MenuItem value={"04"}>4</MenuItem>
          <MenuItem value={"05"}>5</MenuItem>
          <MenuItem value={"06"}>6</MenuItem>
          <MenuItem value={"07"}>7</MenuItem>
          <MenuItem value={"08"}>8</MenuItem>
          <MenuItem value={"09"}>9</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
          <MenuItem value={"11"}>11</MenuItem>
          <MenuItem value={"12"}>12</MenuItem>
          <MenuItem value={"13"}>13</MenuItem>
          <MenuItem value={"14"}>14</MenuItem>
          <MenuItem value={"15"}>15</MenuItem>
          <MenuItem value={"16"}>16</MenuItem>
          <MenuItem value={"17"}>17</MenuItem>
          <MenuItem value={"18"}>18</MenuItem>
          <MenuItem value={"19"}>19</MenuItem>
          <MenuItem value={"20"}>20</MenuItem>
          <MenuItem value={"21"}>21</MenuItem>
          <MenuItem value={"22"}>22</MenuItem>
          <MenuItem value={"23"}>23</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Starting Minute</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={startmin.value}
          onChange={startmin.onChange}
        >
          <MenuItem value={"00"}>0</MenuItem>
          <MenuItem value={"30"}>30</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Finishing Hour</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={finhour.value}
          onChange={finhour.onChange}
        >
          <MenuItem value={"00"}>0</MenuItem>
          <MenuItem value={"01"}>1</MenuItem>
          <MenuItem value={"02"}>2</MenuItem>
          <MenuItem value={"03"}>3</MenuItem>
          <MenuItem value={"04"}>4</MenuItem>
          <MenuItem value={"05"}>5</MenuItem>
          <MenuItem value={"06"}>6</MenuItem>
          <MenuItem value={"07"}>7</MenuItem>
          <MenuItem value={"08"}>8</MenuItem>
          <MenuItem value={"09"}>9</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
          <MenuItem value={"11"}>11</MenuItem>
          <MenuItem value={"12"}>12</MenuItem>
          <MenuItem value={"13"}>13</MenuItem>
          <MenuItem value={"14"}>14</MenuItem>
          <MenuItem value={"15"}>15</MenuItem>
          <MenuItem value={"16"}>16</MenuItem>
          <MenuItem value={"17"}>17</MenuItem>
          <MenuItem value={"18"}>18</MenuItem>
          <MenuItem value={"19"}>19</MenuItem>
          <MenuItem value={"20"}>20</MenuItem>
          <MenuItem value={"21"}>21</MenuItem>
          <MenuItem value={"22"}>22</MenuItem>
          <MenuItem value={"23"}>23</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Finishing Minute</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={finmin.value}
          onChange={finmin.onChange}
        >
          <MenuItem value={"00"}>0</MenuItem>
          <MenuItem value={"30"}>30</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Exercise Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={exercise.value}
          onChange={exercise.onChange}
        >
          <MenuItem value="jogging">Jogging</MenuItem>
          <MenuItem value={"pushups"}>Push-ups</MenuItem>
          <MenuItem value={"squats"}>Squats</MenuItem>
        </Select>
      </FormControl>
      

      
      <form onSubmit={submitExercise}>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}
export default AddExercise;