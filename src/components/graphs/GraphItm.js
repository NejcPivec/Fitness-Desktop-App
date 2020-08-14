import React from "react";
import { Line } from "react-chartjs-2";

var moment = require("moment");

const GraphItm = ({ userLogs }) => {
  let date = [];
  let itm = [];

  for (let i = 0; i < userLogs.length; i++) {
    date.push(moment(userLogs[i]["created"]).format("MMM Do YY"));
  }

  for (let i = 0; i < userLogs.length; i++) {
    itm.push(parseInt(userLogs[i]["itm"]));
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: "ITM",
        data: itm,
        fill: true,
        backgroundColor: "rgba(85,39,128,0.6)",
        borderColor: "rgb(85,39,128)",
      },
    ],
  };
  return (
    <>
      <Line data={data} />
    </>
  );
};

export default GraphItm;
