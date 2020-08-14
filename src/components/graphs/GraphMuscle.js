import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphMuscle = ({ userLogs }) => {
  let date = [];
  let muscle = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    muscle.push(parseInt(userLogs[i]["muscle"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "Pusta masa",
        data: muscle,
        fill: true,
        backgroundColor: "rgba(84, 78, 97, 0.6)",
        borderColor: "rgb(84, 78, 97)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphMuscle;
