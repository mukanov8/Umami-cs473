import React, { useState } from "react";
import NotifyMe from "react-notification-timeline";

const Notification = () => {
  return (
    <NotifyMe
      data={[
        {
          update: "70 new employees are shifted",
          timestamp: 1596119688264,
        },
        {
          update: "Time to take a Break, TADA!!!",
          timestamp: 1596119686811,
        },
      ]}
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
