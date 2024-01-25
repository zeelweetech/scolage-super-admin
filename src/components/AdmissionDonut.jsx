import { useState } from "react";
import Chart from "react-apexcharts";

const  AdmissionDonut = () => {
   const [data, setData] = useState({
      options: {
         chart: {
            width: 380,
            type: "donut",
         },
         plotOptions: {
            pie: {
               startAngle: 0,
               endAngle: 360,
            },
         },
         dataLabels: {
            enabled: false,
         },
         fill: {
            type: "gradient",
         },
         labels: ["Applied", "Accepted", "Rejected", "Withdraw"],
         legend: {
            formatter: function (val, opts) {
               // val + " " + opts.w.globals.series[opts.seriesIndex]
               return val + " " + opts.w.globals.series[opts.seriesIndex];
            },
         },
         responsive: [
            {
               breakpoint: 480,
               options: {
                  chart: {
                     width: 200,
                  },
                  legend: {
                     position: "bottom",
                  },
               },
            },
         ],
      },
      series: [568, 450, 120, 50],
   });

   return <Chart options={data.options} series={data.series} type="donut" width="100%" height={265} />;
};

export default AdmissionDonut;
