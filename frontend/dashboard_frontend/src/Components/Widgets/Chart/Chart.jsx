import { useDispatch, connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart
} from "recharts";
import axios from 'axios';

let counter = 0;

const data = [
  {
    date:"Mar 2017",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    date:"Mar 2018",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    date:"Mar 2019",
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
    date:"Mar 2021",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    date:"Mar 2022",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

function Chart(props) {
  const dispatch = useDispatch();
  
  const queryFilings = props.state.queryFilings;
  const [dependency, setDependency] = useState(false);
  const metric = props.metric;
  const [chartData, setChartData] = useState([]);
  // console.log(companies);
  console.log(queryFilings);
  let company_ticker = [];
  const fetchChartData = async () => {
    console.log("Query Filings:", queryFilings)
    const configHeaders = localStorage.getItem('authTokens')?{
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
      }
    }:"";

    try{
      const response = await axios.post(
        "http://localhost:8000/api/basket/compare", props.state.queryFilings,
        {
          headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
          },
        }
      )
      let dummyArray = response.data.data;
      setChartData(dummyArray);
      console.log("Chart Data", chartData);
    }
    catch(err){
      console.log("Error", err);
    }


    
      // .then((response) => {
        // dummyArray = response.data.data;
        // setChartData(dummyArray);
      //   console.log("Data of charts",dummyArray);
      // })
      // .catch((err) => {
      //     console.log(err);
      // })
  // fetch("http://localhost:8000/api/basket/compare", {method:"POST", headers:configHeaders, body:queryFilings})
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  }

  
  useEffect(()=>{
    const func = async () => {
      await fetchChartData();
    }
    func();
  },[queryFilings]);

  const listOfBars = [];
  for (const [i, ticker] of props.state.queryFilings.tickers.entries()) {
    listOfBars.push(<Bar dataKey={ticker}/>)
  }

  return (
    <>
    {chartData.length!=0&&
    <>
    <ResponsiveContainer height={600} width="90%">
    <BarChart
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date"/>
      <YAxis domain={[0, 1]}/>
      <Tooltip />
      <Legend />
      {listOfBars}
    </BarChart>
    </ResponsiveContainer>
    </>}
    
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    state:state
  }
};

export default connect(mapStateToProps, null)(Chart);

