import React, { useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

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

const CreatePost = ({ user }) => {
  const history = useHistory();
  const caption = useField("text");
  const exercise = useField("text");
  const blur = useField("bool");
  const publicBool = useField("bool");
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState();

  const onChange = (event) => {
    if (event.target.files[0]) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", video);
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
              caption: caption.value,
              blur: blur.value,
              public: publicBool.value,
              exercise: exercise.value,
              userId: user.id,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.push("/");
          });
      }
    );
  };

  return (
    <div>
      <h1>Compose</h1>
      <div>
        videoLink: <input type="file" onChange={onChange} />
      </div>
      <progress value={progress} max="100" />
      <div>
        Write your caption here:
        <input {...caption} />
      </div>
      <div>
        Choose your exercise: <input {...exercise} />
      </div>
      <div>
        Blur? <input {...blur} />
      </div>
      <div>
        Who can see your posts: <input {...publicBool} />
      </div>

      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default CreatePost;
