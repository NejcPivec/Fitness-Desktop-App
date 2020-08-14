import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphFat = ({ userLogs }) => {
  let date = [];
  let fat = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    fat.push(parseInt(userLogs[i]["fat"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Maščobna masa",
        data: fat,
        fill: true,
        backgroundColor: "rgba(206, 237, 219,0.6)",
        borderColor: "rgb(206, 237, 219)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphFat;
