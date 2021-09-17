import React from "react";
// import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const backgroundColor = [];
const numbers = [12, 19, 3, 5, 2, 3];
const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

var v = 0;
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > v) {
    v = numbers[i];
  }
}
console.log(v);

for (var i = 0; i < 6; i++) {
  if (numbers[i] === v) {
    backgroundColor.push("#0f7d28");
  } else {
    backgroundColor.push(colors[i]);
  }
}

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: numbers,
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => {
  return (
    <div className="vertical-bar">
      {/* <Bar data={data} options={options} /> */}
    </div>
  );
};

export default VerticalBar;
