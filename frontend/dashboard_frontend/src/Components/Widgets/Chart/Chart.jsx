import { useDispatch, connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import no from '../../../images/no.png'
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
import {config} from "../../../config"; 

 const colors = [
  "#8884D8",
  "#413EA0",
  "#AC07D8",
  "#F7D439",
  "#7A07D8",
  "#07D88B",
  "#0794D8",
  "#D807D7",
  "#D8078F",
  "#D80753"
]

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
  const companies = props.state.basketSelectedCompanies;
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
        console.log("Basket compare: ", props.state.queryFilings)
        // if(props.state.queryFiling)
      const response = await axios.post(
        config().basketCompanreUrl, props.state.queryFilings,
        {
          headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
          },
        }
      )

      console.log("Response data:", response.data);
      let dummyArray = response.data.data;
      setChartData(dummyArray);

    }
    catch(err){
      console.log("Error", err);
    }

// }

    
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
  const colvar=0;
  console.log("Bars",props.state.queryFilings.tickers.entries())
  for (const [i, ticker] of props.state.queryFilings.tickers.entries()) {
    listOfBars.push(<Bar fill={colors[i]} dataKey={ticker}/>);
  }

  const  bool=true
  return (
    <>
    {chartData.length==0?<>
      {/* {bool?<> */}
      <div style={{width:"100%",display:"flex",flexDirection:"column",textAlign:"center"}}>
        <div>
        <img src={no} alt="" />
        </div>
        <h2>Data is not available for this metric</h2>
        <br />
        <p className='color'>Try another metric</p>
      </div>
    </>:
    <>
    <ResponsiveContainer height={600} width="90%">
    <BarChart
      barSize={75}
      data={chartData}
      margin={{
        top: 50,
        right: 20,
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

