import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphFatPart = ({ userLogs }) => {
  let date = [];
  let fat_part = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    fat_part.push(parseInt(userLogs[i]["fat_part"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Delež maščobe",
        data: fat_part,
        fill: true,
        backgroundColor: "rgba(133, 186, 161,0.6)",
        borderColor: "rgb(133, 186, 161)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphFatPart;
