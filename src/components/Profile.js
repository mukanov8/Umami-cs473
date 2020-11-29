import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import VideoPlayer from "./VideoPlayer";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardHeader } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
  },
  bigMargin: {
    marginTop: 100,
  },
  smallMargin: {
    marginTop: 30,
    marginBottom: 10,
  },
  post: {
    maxWidth: 500,
    maxHeight: 800,
    minWidth: 275,
    marginBottom: 10,
    margin: "auto",
    flexGrow: 1,
    // display: "flex",
  },
  exerciseList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const exercises = [
  "Squats",
  "Deadlifts",
  "Pullups",
  "Pushups",
  "Situps",
  "Stretching",
  "Flexibility",
  "Aerobic",
  "Weightlifting",
  "Plank",
  "Lunges",
  "Bench",
];
const Profile = ({ user }) => {
  const [posts, setPosts] = useState();
  const favExercises = exercises.filter((ex) => user.preferredExercises[ex]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        const allPosts = res.docs.map((p) => p.data());
        const ids = allPosts.map((p) => p.userName);

        setPosts(allPosts.filter((p) => p.userName === user.name));
      });
  }, []);

  function displayCondition() {
    if (posts === undefined) return false;
    else {
      console.log(posts.length);
      return posts.length > 0;
    }
  }
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Avatar aria-label="recipe" className={classes.large}>
        {user.name[0].toUpperCase()}
      </Avatar>
      <h3>{user.name}</h3>
      <h3>
        {user.exerciseGoal === "" ? "Exercise Goal Not Set" : user.exerciseGoal}
      </h3>
      <div className={classes.smallMargin}>
        <div>
          {" "}
          <h6>Favorite Exercises: </h6>
        </div>
        {/* <ul>
          {favExercises.map((ex) => (
            <li> {ex} </li>
          ))}
        </ul> */}
        <List className={classes.exerciseList}>
          {favExercises.map((ex) => (
            // <li> {ex} </li>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FitnessCenterIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={ex} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.postsDisplay}>
        <div className={classes.smallMargin}>
          <h6>Posts by {user.name}</h6>{" "}
        </div>
      </div>

      <Container>
        {displayCondition() ? (
          posts.map((p, i) => (
            <Card className={classes.post} key={i}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {p.userName[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <Typography
                    className={classes.action}
                    color="textSecondary"
                    component="p"
                  >
                    Exercise: {p.exercise}
                  </Typography>
                }
                title={p.userName}
                subheader={p.timestamp && p.timestamp.toDate().toString()}
              />
              {p.type.includes("video") ? (
                <VideoPlayer videoUrl={p.video} />
              ) : (
                <CardMedia
                  className={classes.media}
                  image={p.video}
                  title="Image/Video"
                />
              )}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {p.caption}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <h2 className={classes.mainContainer}> No Posts yet</h2>
        )}
      </Container>
    </Container>
  );
};

export default Profile;
