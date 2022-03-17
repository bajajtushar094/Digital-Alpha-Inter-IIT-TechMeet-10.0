// import React from 'react'
// import { Line} from 'react-chartjs-2';
// import { Chart as ChartJS } from "chart.js/auto";

// export const data ={ 
//     labels:["mar 20","apr 20","may 20","june 20"],
//    datasets: [
//     { fill: true,
//         data:[12,33,40,25],
//         borderColor: '#5EE6EB',
//         tension: 0.3,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         // backgroundColor:["red","green","black","pink"]
//     }
//   ],




// }


// const Chart = () => {
//   return (
//     <div>
//     <Line 
//     options={{maintainAspectRatio:true,
      
//         plugins: {
//             legend: {
//               display: false
//             }
//           },
      
//         scales:{
//             x: {
//                 grid: {
//                   display: false
//                 }
//               },
          
//             y:{
//    beginAtZero:true,
//    grid: {
//     display: false
//   }
//             },
//             // gridLines: {
//             //     display:false
//             // } 
//         }
//     }}
//     data={data}
//     />    
//   </div>
//   )
// }

// export default Chart

// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    date:"Mar 2020",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    date:"Mar 2020",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    date:"Mar 2020",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    date:"Mar 2020",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    date:"Mar 2020",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    date:"Mar 2020",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    date:"Mar 2020",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function Chart() {
  return (
    <ResponsiveContainer height={600} width="50%">
    <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    </ResponsiveContainer>
  );
}