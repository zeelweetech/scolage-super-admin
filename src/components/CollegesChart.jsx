import { useState } from "react";
import Chart from "react-apexcharts";

const CollegesChart = ({ activeData, countData }) => {
  const data = {
    options: {
      colors: ["#60269E", "#707070"],
      chart: {
        id: "revenue-chart",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      // yaxis: {
      //   min: 0,
      //   max: 1000,
      // },
    },
  };

  const serise = activeData
    ? [
        {
          name: "New",
          data: [
            countData?.currentWeekCounts?.college?.Monday,
            countData?.currentWeekCounts?.college?.Tuesday,
            countData?.currentWeekCounts?.college?.Wednesday,
            countData?.currentWeekCounts?.college?.Thursday,
            countData?.currentWeekCounts?.college?.Friday,
            countData?.currentWeekCounts?.college?.Saturday,
            countData?.currentWeekCounts?.college?.Sunday,
          ],
        },
      ]
    : [
        {
          name: "New",
          data: [
            countData?.previousWeekCounts?.college?.Monday,
            countData?.previousWeekCounts?.college?.Tuesday,
            countData?.previousWeekCounts?.college?.Wednesday,
            countData?.previousWeekCounts?.college?.Thursday,
            countData?.previousWeekCounts?.college?.Friday,
            countData?.previousWeekCounts?.college?.Saturday,
            countData?.previousWeekCounts?.college?.Sunday,
          ],
        },
      ];

  return (
    <Chart options={data?.options} series={serise} type="line" width="100%" />
  );
};

export default CollegesChart;
