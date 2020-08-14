import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphWeight = ({ userLogs }) => {
  let date = [];
  let weight = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    weight.push(parseInt(userLogs[i]["weight"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Telesna masa",
        data: weight,
        fill: true,
        backgroundColor: "rgba(103, 89, 122, 0.6)",
        borderColor: "#67597A",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphWeight;
