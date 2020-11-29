import React, { useState, useEffect } from "react";
import NotifyMe from "react-notification-timeline";
import SnackBar from "./SnackBar";
import { db } from "../firebase";
import firebase from "firebase";

const Notification = ({ user }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    // Notifications about scheduled exercises
    db.collection("exercises")
      .where("userid", "==", user.id)
      .get()
      .then((exercises) => {
        const d = new Date();
        const day = d.getDay();
        const soon = exercises.docs.find((e) => e.data().day === day);
        if (!soon) {
          return;
        }

        const early =
          d.getHours() * 60 +
          d.getMinutes() -
          parseInt(soon.data().starthour) * 60 -
          parseInt(soon.data().startmin);

        if (early > 15) {
          return;
        }

        const latetime =
          d.getHours() * 60 +
          d.getMinutes() -
          parseInt(soon.data().finhour) * 60 -
          parseInt(soon.data().finmin);

        const message =
          latetime >= 30
            ? "it has been over 30 minutes since you were supposed to confirm your exercise"
            : early >= 0
            ? "you have a scheduled exercise soon"
            : "it is time to exercise";
        db.collection("messages").add({
          message: message,
          senderName: "System",
          receiverId: user.id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        if (latetime >= 30) {
          //notification both to the user and co-trainees
          console.log(
            "it has been over 30 minutes since you were supposed to confirm your exercise",
            soon.data()
          );
        } else if (early <= 15) {
          //Notification only to the user
          console.log("you have a scheduled exercise soon", soon.data());
        }
      });

    // fetch 5 latest messages from db
    db.collection("messages")
      .where("receiverId", "==", user.id)
      .onSnapshot(function (changes) {
        db.collection("messages")
          .where("receiverId", "==", user.id)
          .orderBy("timestamp", "desc")
          .limit(5)
          .get()
          .then((messages) => {
            if (mounted) {
              setData(
                messages.docs.map((message) => ({
                  update:
                    message.data().senderName + ": " + message.data().message,
                  timestamp:
                    message.data().timestamp &&
                    message.data().timestamp.toDate(),
                }))
              );
              setOpen(true);
            }
          });
      });
    return () => (mounted = false);
  }, [user.id]);

  return (
    <div>
      <SnackBar severity="info" open={open} setOpen={setOpen} />
      <NotifyMe
        data={data}
        storageKey="notific_key"
        notific_key="timestamp"
        notific_value="update"
        heading="Notification Alerts"
        sortedByKey={false}
        showDate={true}
        size={32}
        color="green"
      />
    </div>
  );
};

export default Notification;
