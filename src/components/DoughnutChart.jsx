import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DoughnutChart = ({data}) => {
 
   const options = {
      chart: {
         type: "pie",
         plotShadow: false,
         width: 120,
         height: 120,
      },
      credits: {
         enabled: false,
      },
      plotOptions: {
         pie: {
            innerSize: "99%",
            borderWidth: 18,
            borderColor: null,
            slicedOffset: 0,
            dataLabels: {
               connectorWidth: 5,
               enabled: false,
            },
         },
      },
      title: {
         verticalAlign: "middle",
         text: "",
         floating: false,
      },
      // legend: {
      //    enabled: true,
      // },
      series: [
         {
            name: "Total",
            colorByPoint: true,
            data: data,
         },
      ],
   };

   return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DoughnutChart;
