import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphWaist = ({ userLogs }) => {
  let date = [];
  let waist = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    waist.push(parseInt(userLogs[i]["waist"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Obseg pasu",
        data: waist,
        fill: true,
        backgroundColor: "rgba(110, 136, 148,0.6)",
        borderColor: "rgb(110, 136, 148)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphWaist;
