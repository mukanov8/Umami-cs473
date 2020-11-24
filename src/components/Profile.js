import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  return (
    <container className={classes.mainContainer}>
      <Avatar aria-label="recipe" className={classes.large}>
        {user.name[0].toUpperCase()}
      </Avatar>
      <h3>{user.name}</h3>
      <h3>{user.exerciseGoal}</h3>
    </container>
  );
};

export default Profile;
