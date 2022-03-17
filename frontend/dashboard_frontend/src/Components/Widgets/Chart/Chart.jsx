import React from 'react'
import { LineChart, Line } from 'recharts';


const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },{ name: 'Page B', uv: 300, pv: 2400, amt: 2400 },{ name: 'Page C', uv: 300, pv: 2400, amt: 2400 },{ name: 'Page D', uv: 200, pv: 2400, amt: 2400 },{ name: 'Page E', uv: 280, pv: 2400, amt: 2400 },{ name: 'Page F', uv: 180, pv: 2400, amt: 2400 }];

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


const Chart = () => {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
      </div>
    </div>
  )
}

export default Chart