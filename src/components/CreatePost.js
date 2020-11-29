import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  CardHeader,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Switch,
  FormHelperText,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const useField = (type) => {
  const val = type === "bool" ? true : "";
  const [value, setValue] = useState(val);
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    maxHeight: 800,
    marginBottom: 10,
    margin: "auto",
  },
  media: {
    height: 0,
    margin: 10,
    marginTop: -10,
    marginBottom: -5,
    paddingTop: "56.25%", // 16:9
  },
  action: {
    fontSize: "1rem",
  },
  post: {
    float: "right",
    marginLeft: "auto",
  },
  feed: {
    textAlign: "center",
  },
  formControl: {
    marginRight: 40,
    marginTop: 20,
    // minWidth: 120,
  },
  selector: {
    width: 50,
    minWidth: 120,
  },
}));

const CreatePost = ({ user }) => {
  const history = useHistory();
  const caption = useField("text");
  const exercise = useField("text");
  const [blur, setBlur] = useState(false);
  const [publicBool, setPublicBool] = useState(true);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [exercises, setExercises] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    db.collection("exercises")
      .where("userid", "==", user.id)
      .get()
      .then((exes) => {
        setExercises(exes.docs.map((e) => e.data()));
      });
  }, [user.id]);

  const onChange = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
      setVideoUrl(URL.createObjectURL(event.target.files[0]));
      // console.log(video);
      // console.log("url", videoUrl);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submit", video);
    const upload = storage.ref(`posts/${video.name}`).put(video);

    upload.on(
      "state_changed",
      (snapshot) => {
        const progr = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progr);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("posts")
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              video: url,
              type: video.type,
              caption: caption.value,
              blur: blur,
              public: publicBool,
              exercise: exercise.value,
              userId: user.id,
              userName: user.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.push("/");
          });
      }
    );
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleBlurChange = (event) => {
    setBlur(event.target.checked);
  };
  const handlePublicChange = (event) => {
    setPublicBool(event.target.checked);
  };
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          subheader={
            <div>
              <Button onClick={handleClick}>Upload a video/image</Button>
              <input
                ref={hiddenFileInput}
                type="file"
                onChange={onChange}
                style={{ display: "none" }}
              />
            </div>
          }
          action={
            <FormControl className={classes.formControl} error>
              <InputLabel id="demo-simple-select-error-label">
                Exercise
              </InputLabel>
              <Select
                className={classes.selector}
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                {...exercise}
              >
                {exercises &&
                  exercises.map((e, i) => (
                    <MenuItem key={i} value={e.exercise}>
                      {e.exercise}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          }
          title="Compose"
          // subheader="September 14, 2016"
        />

        {video &&
          (video.type.includes("video") ? (
            <VideoPlayer videoUrl={videoUrl} />
          ) : (
            <CardMedia
              className={classes.media}
              image={videoUrl}
              title="Image/Video"
            />
          ))}
        <CardContent>
          <TextField
            multiline
            rows={3}
            placeholder="Write your caption here ..."
            fullWidth
            variant="outlined"
            {...caption}
          />
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Blur Off</Grid>
              <Grid item>
                <AntSwitch
                  checked={blur}
                  onChange={handleBlurChange}
                  name="checkedC"
                />
              </Grid>
              <Grid item>On</Grid>
            </Grid>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Public Off</Grid>
              <Grid item>
                <AntSwitch
                  checked={publicBool}
                  onChange={handlePublicChange}
                  name="checkedC"
                />
              </Grid>
              <Grid item>On</Grid>
            </Grid>
          </Typography>

          <progress value={progress} max="100" />
          <Button className={classes.post} onClick={handleSubmit}>
            Post
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
