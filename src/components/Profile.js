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
}));

const Profile = ({ user }) => {
  const [posts, setPosts] = useState();

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
    <container className={classes.mainContainer}>
      <Avatar aria-label="recipe" className={classes.large}>
        {user.name[0].toUpperCase()}
      </Avatar>
      <h3>{user.name}</h3>
      <h3>{user.exerciseGoal}</h3>
      <div> </div>
      <div className={classes.postsDisplay}>
        <div className={classes.smallMargin}>Posts by {user.name} </div>
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
    </container>
  );
};

export default Profile;
