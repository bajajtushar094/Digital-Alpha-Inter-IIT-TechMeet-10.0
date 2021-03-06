import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../../Components/Global/Navbar/Navbar'
import CompanyFilter from '../../Components/Widgets/Filters/CompanyFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import './company.scss'
import "../../global.scss";
import TableHead from '../../Components/Widgets/TableHead/TableHead';
import { Button } from '@mui/material';
import Chart from '../../Components/Widgets/Chart/Chart';
import { connect } from 'react-redux';
import { getKeyMetrics, searchCompanies, addRecentlyViewedCompany } from "../../actions/action";
import { useDispatch } from "react-redux";
import Watchlist from '../../Components/Widgets/Watchlist';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {config} from "../../config";
// const metric_types = [
// 	{'ARR': 'Annual Recurring Revenue'},
// 	{'Customer Churn Rate': 'Customer Churn Rate'},
// 	{'LTV': 'Lifetime Value'},
// 	{'CAC': 'Customer Acquisition Cost'},
// 	{'ARPA': 'Average Run Per Account'},
// 	{'Revenue Churn Rate': 'Revenue Churn Rate'}
// ]


const Company = (props) => {

  const metrics = [
    "Total Revenue",
    "Number of customers",
    "MRR",
    "ARR",
    "ARPU",
    "MRR Expansion",
    "Number of qualified leads",
    "Penetration Rate",
    "Sales and Marketing",
    "CAC",
    "CAC payback",
    "Gross Margin",
    "CAC payback period",
    "ASP",
    "Total Assets",
    "Total Liabilities Net Minority Interest",
    "debt ratio",
    "Total Equity Gross Minority Interest",
    "Total Debt",
    "Common Stock Equity",
    "Total Capitalization",
    "Shareholder Equity",
    "Private Shareholding",
    "Public Shareholding",
  ];
  const [allMetrics , setAllMetrics] = useState({
    "Total Revenue": [],
    "Number of customers": [],
    "MRR": [],
    "ARR": [],
    "ARPU": [],
    "MRR Expansion": [],
    "Number of qualified leads": [],
    "Penetration Rate": [],
    "Sales and Marketing": [],
    "CAC": [],
    "CAC payback": [],
    "Gross Margin": [],
    "CAC payback period": [],
    "ASP": [],
    "Total Assets": [],
    "Total Liabilities Net Minority Interest": [],
    "debt ratio": [],
    "Total Equity Gross Minority Interest": [],
    "Total Debt": [],
    "Common Stock Equity": [],
    "Total Capitalization": [],
    "Shareholder Equity": [],
    "Private Shareholding": [],
    "Public Shareholding": []
  })

  const dispatch = useDispatch();
  const [company, setCompany] = useState([]);
  // const [arrMetric, setArrMetric] = useState([]);
  // const [ccrMetric, setCcrMetric] = useState([]);
  // const [ltvMetric, setLtvMetric] = useState([]);
  // const [cacMetric, setCacMetric] = useState([]);
  // const [arpaMetric, setArpaMetric] = useState([]);
  // const [rcrMetric, setRcrMetric] = useState([]);
  const [isMetricLoading, setIsMetricLoading] = useState([]);
  // const [metric,setMetric] = useState([]);
  // const [copyMetric,setCopyMetric] = useState([]);
  const url_ticker = useParams().ticker;

  const [value, setValue] = React.useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const companies = props.state.basketSelectedCompanies;
  const queryFilings = props.state.queryFilings;
  // let company_ticker = [];
  // function getTickers() {
  //   for(let i=0;i<companies.length;i++){
  //     console.log(companies[i]);
  //     company_ticker.push(companies[i].ticker);
  //   }
  //   console.log(company_ticker);
  // }

  function addTickerToRequest() {
    dispatch({
      type: 'UPDATE_QUERY_FILINGS',
      queryFilings: {
        ...queryFilings,
        tickers: [url_ticker],
        metric_type: metrics[value],
      }
    })
  }

  // const handleClickM1 = async () => {
  //   setValue(0);
  // }

  // const handleClickM2 = async () => {
  //   setValue(1);
  // }

  // const handleClickM3 = () => {
  //   setValue(2);
  //   // console.log(metric_types[value])
  // }
  // const handleClickM4 = () => {
  //   setValue(3);
  //   // console.log(metric_types[value])
  // }
  // const handleClickM5 = () => {
  //   setValue(4);
  //   // console.log(metric_types[value])
  // }
  // const handleClickM6 = () => {
  //   setValue(5);
  //   // console.log(metric_types[value])
  // }



  useEffect(() => {
    const func = async () => {
    setIsMetricLoading(true);
    const response = await searchCompanies(url_ticker, dispatch);
    // console.log("Response EEEEEEEEEe:", response);
    // console.log("Response EEEEEEEEEe:", response.data);
    setCompany(response[0]);

    addRecentlyViewedCompany(url_ticker);

    await Promise.all(
      metrics.map(async (el) => {
        const res = await getKeyMetrics(
          { ticker: url_ticker, metric_type: el },
          dispatch
        );
        setAllMetrics({
          ...allMetrics,
          el: res.data,
        });
      })
    );

    // const response1 = await getKeyMetrics({ ticker: url_ticker, metric_type: 'ARR' }, dispatch);
    // setArrMetric(response1.data);
    // const response2 = await getKeyMetrics({ ticker: url_ticker, metric_type: 'CCR' }, dispatch);
    // setCcrMetric(response2.data);
    // const response3 = await getKeyMetrics({ ticker: url_ticker, metric_type: 'LTV' }, dispatch);
    // setLtvMetric(response3.data);
    // const response4 = await getKeyMetrics({ ticker: url_ticker, metric_type: 'CAC' }, dispatch);
    // setCacMetric(response4.data);
    // const response5 = await getKeyMetrics({ ticker: url_ticker, metric_type: 'ARPA' }, dispatch);
    // setArpaMetric(response5.data);
    // const response6 = await getKeyMetrics({ ticker: url_ticker, metric_type: 'RCR' }, dispatch);
    // setRcrMetric(response6.data);


    setIsMetricLoading(false);
    }
    func();
  }, []);
  React.useEffect(() => {
    console.log(metrics[value]);
    addTickerToRequest();
  }, [value])

  return (
    <>
      <Navbar />
      <div className='companycontainer'>
        <div className="companyheading" style={{ display: "flex", color: "#9B9B9C" }}>
          <ApartmentOutlinedIcon />
          <h2 style={{ lineHeight: "20px", fontWeight: "400" }}>Company</h2>
        </div>

        <div className="companycontent">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* <CompanyFilter company={company} arrMetric={arrMetric} ccrMetric={ccrMetric} ltvMetric={ltvMetric} cacMetric={cacMetric} arpaMetric={arpaMetric} rcrMetric={rcrMetric} isMetricLoading={isMetricLoading} /> */}
            <CompanyFilter company={company} allMetrics={allMetrics} isMetricLoading={isMetricLoading} />
            <RecentlyViewedLogIn />
          </div>

          {/* <div > */}
          <div style={{ width: "70%" }}>
            <div className="padchart" style={{ padding: "0px 25px" }}>

              {/* <div className='tablesec' style={{display:"flex"}}>
                                <div className="table_top">
                                    <button className='btn-link active' >Key Metrics</button>
                                </div>
                                <div style={{marginLeft:"auto", paddingBottom:"10px"}}>
                                    <Button style={{ color: '#9B9B9C' }}>Download stats CSV  <FileDownloadIcon /></Button>
                                </div>
                            </div> */}
              <TableHead childone="Key Metrics" childthree={config().getKeyMetricsCSVUrl} data=
                {{
                  "ticker": props.state.queryFilings.tickers[0],
                  'time_start': props.state.queryFilings.time_start,
                  'time_end': props.state.queryFilings.time_end,
                  "metric_type": props.state.queryFilings.metric_type,
                }} />
              <div className="stat-tab">
                {metrics.map((el, i) => {
                  return (
                    <div><Button style={(metrics[value] === el) ? { color: "black" } : { color: "#9b9b9c" }} name={el} onClick={() => {setValue(i)}}>{el}</Button></div>
                  )
                })}
              </div>
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps, null)(Company);