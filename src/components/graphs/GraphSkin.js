import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphSkin = ({ userLogs }) => {
  let date = [];
  let skin = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    skin.push(parseInt(userLogs[i]["skin"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Sum kožnih gub",
        data: skin,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphSkin;
