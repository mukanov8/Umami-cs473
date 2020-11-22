import React, { useState, useEffect } from "react";
import NotifyMe from "react-notification-timeline";
import { db } from "../firebase";

const Notification = ({ user }) => {
  const [data, setData] = useState([]);

  // fetch 3 latest messages from db
  useEffect(() => {
    db.collection("messages")
      .where("receiverId", "==", user.id)
      .get()
      .then((messages) => {
        // const fr = messages.docs.map((m) => m.data());
        // console.log("messages", fr);
        const ordered = [...messages.docs].sort(
          (a, b) => b.data().timestamp - a.data().timestamp
        );
        // const o = ordered.map((a) => a.data().timestamp.toDate());
        // console.log("dates", o);
        setData(
          ordered.slice(0, 3).map((message) => ({
            update: message.data().message,
            timestamp: message.data().timestamp.toDate(),
          }))
        );

        console.log(data);
      });
    // something;
    db.collection("messages")
      .where("receiverId", "==", user.id)
      .onSnapshot(function (changes) {
        changes.docChanges().forEach((change) => {
          // console.log("snap", change.doc.data());
          if (change.type === "added") {
            const obj = {
              update: change.doc.data().message,
              timestamp: change.doc.data().timestamp.toDate(),
            };
            const b = data.find((m) => m.timestamp - obj.timestamp === 0);
            if (!b) {
              setData(data.concat(obj));
            }
          }
        });
      });
  }, []);

  return (
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
  );
};

export default Notification;
