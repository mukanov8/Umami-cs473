import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import VideoPlayer from "./VideoPlayer";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardHeader, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import NotificationModal from "./NotificationModal";
import Blur from "react-css-blur";
import { green } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    maxHeight: 800,
    minWidth: 275,
    marginBottom: 10,
    margin: "auto",
    flexGrow: 1,
    // display: "flex",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
  action: {
    fontSize: "1rem",
  },
  feed: {
    textAlign: "center",
  },
  message: {
    float: "right",
    marginBottom: 20,
  },
  addButton: {
    top: "auto",
    bottom: 20,
    position: "fixed",
    zIndex: 1,
    right: "20%",
    margin: "0 auto",
    backgroundColor: green[500],
  },
}));

const Feed = ({ user }) => {
  const history = useHistory();
  const [posts, setPosts] = useState();

  const goToCompose = (event) => {
    event.preventDefault();

    history.push("/createpost");
    return;
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        setPosts(res.docs.map((p) => p.data()));
      });
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <h1 className={classes.feed}>Feed</h1>
      <Fab aria-label="add" className={classes.addButton} onClick={goToCompose}>
        <AddIcon />
      </Fab>
      {posts &&
        posts.map((p, i) => (
          <Card className={classes.root} key={i}>
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
              <Blur radius={p.blur && "5px"}>
                <CardMedia
                  className={classes.media}
                  image={p.video}
                  title="Image/Video"
                />
              </Blur>
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {p.caption}
              </Typography>
              {user && (
                <NotificationModal
                  style={classes.message}
                  senderName={user.name}
                  receiverid={p.userId}
                />
              )}
            </CardContent>
          </Card>
        ))}
      {/* </div> */}
    </Container>
  );
};

export default Feed;
