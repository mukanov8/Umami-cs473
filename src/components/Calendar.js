import React, { useState,useEffect } from "react";
import { db } from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checkControl: {
    margin: theme.spacing(1),
  }
}));
const Calendar = ({user}) => {  
  const classes = useStyles();
  const ndate = new Date();
  const [day, setState] = useState(ndate.getDay())
  const[sun,setArray7]=useState([]);
  
  const weekday =ndate.getDay() ;
  useEffect(()=>{
  db.collection("exercises")
      .where("userid", "==", user.id).orderBy("starthour")
      .get().then((exes) => {
        
        setArray7(exes.docs.filter(part=>part.data().day===day).map((e)=>e.data().exercise+" Starting Time: "+e.data().starthour+":"+e.data().startmin+" Finishing Time: "+e.data().finhour+":"
        +e.data().finmin))
      });
    })
    const handleChange = (event) => {
      switch(event.target.name) {
        case "monday":
          // code block
          setState(1)
          break;
        case "tuesday":
          // code block
          setState(2)
          break;
        case "wednesday":
          setState(3)
          break;
        case "thursday":
          setState(4)
          break;
        case "friday":
          setState(5)
          break;
        case "saturday":
          setState(6)
          break;
        default:
          // code block
          setState(0)
      }
    };
  return (
    <div>
      <h1>
        Calendar</h1>
      <h2>You can see your exercise schedule for the selected weekday</h2>
      <FormControl component="fieldset" className={classes.checkControl}>
        <FormLabel component="legend">Select the date</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={day===1} cdate={1} onChange={handleChange} name="monday" />}
            label="Monday"
          />
          <FormControlLabel
            control={<Checkbox checked={day===2} cdate={2} onChange={handleChange} name="tuesday" />}
            label="Tuesday"
          />
          <FormControlLabel
            control={<Checkbox checked={day===3} cdate={3} onChange={handleChange} name="wednesday" />}
            label="Wednesday"
          />
          <FormControlLabel
            control={<Checkbox checked={day===4} cdate={4} onChange={handleChange} name="thursday" />}
            label="Thursday"
          />
          <FormControlLabel
            control={<Checkbox checked={day===5} cdate={5} onChange={handleChange} name="friday" />}
            label="Friday"
          />
          <FormControlLabel
            control={<Checkbox checked={day===6} cdate={6} onChange={handleChange} name="saturday" />}
            label="Saturday"
          />
          <FormControlLabel
            control={<Checkbox checked={day===0} cdate={0} onChange={handleChange} name="sunday" />}
            label="Sunday"
          />
        </FormGroup>
      </FormControl>
      
      
      <h3>{sun.map(item => {
          return <li>{item}</li>;
        })
      }</h3>
    </div>
  );
};

export default Calendar;
