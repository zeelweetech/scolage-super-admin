import { useState } from "react";
import Chart from "react-apexcharts";

const AdmissionChart = ({ selectedOption, countData }) => {
  console.log("countData", countData);
  const data = {
    options: {
      colors: ["#60269E", "#707070"],
      chart: {
        id: "admission-chart",
        height: 265,
      },
      plotOptions: {
        bar: {
          //  horizontal: false,
          columnWidth: "16px",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      },
      fill: {
        type: "image",
        opacity: 0.87,
        image: {
          src: ["bar-bg.png"],
          width: 466,
          height: 406,
        },
      },
    },
  };

  const series =
    selectedOption === "thisWeek"
      ? [
          {
            name: "New",
            data: [
              countData?.currentWeekCounts?.admission?.Monday,
              countData?.currentWeekCounts?.admission?.Tuesday,
              countData?.currentWeekCounts?.admission?.Wednesday,
              countData?.currentWeekCounts?.admission?.Thursday,
              countData?.currentWeekCounts?.admission?.Friday,
              countData?.currentWeekCounts?.admission?.Saturday,
              countData?.currentWeekCounts?.admission?.Sunday,
            ],
          },
        ]
      : [
          {
            name: "New",
            data: [
              countData?.previousWeekCounts?.admission?.Monday,
              countData?.previousWeekCounts?.admission?.Tuesday,
              countData?.previousWeekCounts?.admission?.Wednesday,
              countData?.previousWeekCounts?.admission?.Thursday,
              countData?.previousWeekCounts?.admission?.Friday,
              countData?.previousWeekCounts?.admission?.Saturday,
              countData?.previousWeekCounts?.admission?.Sunday,
            ],
          },
        ];

  return (
    <Chart
      options={data.options}
      series={series}
      type="bar"
      width="100%"
      height={265}
    />
  );
};

export default AdmissionChart;
