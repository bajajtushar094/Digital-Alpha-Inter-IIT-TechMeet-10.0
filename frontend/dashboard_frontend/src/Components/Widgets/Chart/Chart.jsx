import React from 'react'
import { Line} from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

export const data ={ 
    labels:["mar 20","apr 20","may 20","june 20"],
   datasets: [
    { fill: true,
        data:[12,33,40,25],
        borderColor: '#5EE6EB',
        tension: 0.3,
        backgroundColor: "rgba(75,192,192,0.2)",
        // backgroundColor:["red","green","black","pink"]
    }
  ],




}


const Chart = () => {
  return (
    <div>
    <Line 
    options={{maintainAspectRatio:true,
        plugins: {
            legend: {
              display: false
            }
          },
      
        scales:{
            x: {
                grid: {
                  display: false
                }
              },
          
            y:{
   beginAtZero:true,
   grid: {
    display: false
  }
            },
            // gridLines: {
            //     display:false
            // } 
        }
    }}
    data={data}
    />    
  </div>
  )
}

export default Chart