import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, CardHeader, Card, Button, Icon } from "@material-ui/core";
// import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import NotificationModal from "./NotificationModal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginBottom: 10,
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
  button: {
    margin: theme.spacing(1),
  },
}));

const TraineeCard = ({ user, setUser, u, button }) => {
  const classes = useStyles();

  const handleClick = (user2) => {
    // If the user does not have any trainees yet
    const trainees = user.trainees
      ? user.trainees.concat(user2.id)
      : [user2.id];
    const trainees2 = user2.trainees
      ? user2.trainees.concat(user.id)
      : [user.id];

    //Updating user state
    setUser({ ...user, trainees });

    db.collection("users").doc(user.id).update({ trainees });
    db.collection("users").doc(user2.id).update({ trainees: trainees2 });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={}
        action={
          button ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleClick(u)}
            >
              Connect
            </Button>
          ) : (
            <NotificationModal sender={user} receiver={u} />
          )
        }
        title={u.name}
        subheader={"Exercise Goal : " + u.exerciseGoal}
      />
    </Card>
  );
};

const AddTrainee = ({ user, setUser }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    db.collection("users")
      .get()
      .then((users) => {
        setUsers(
          users.docs
            .filter((u) => u.id !== user.id)
            .map((user) => ({ ...user.data(), id: user.id }))
        );
      });
  }, [user]);

  return (
    <Paper>
      <h2>Current Co-Trainees</h2>
      {users &&
        user.trainees &&
        user.trainees.length &&
        users
          .filter((u) => user.trainees.includes(u.id))
          .map((u, i) => (
            <TraineeCard
              key={i}
              u={u}
              user={user}
              button={false}
              setUser={setUser}
            />
          ))}
      <h2>Add New Co-Trainees</h2>
      {users &&
        users
          .filter((u) => user.trainees && !user.trainees.includes(u.id))
          .map((u, i) => (
            <TraineeCard
              key={i}
              u={u}
              user={user}
              setUser={setUser}
              button={true}
            />
          ))}
    </Paper>
  );
};

export default AddTrainee;
