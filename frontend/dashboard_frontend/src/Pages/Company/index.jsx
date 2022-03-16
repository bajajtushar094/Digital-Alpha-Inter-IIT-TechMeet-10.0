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
import {getKeyMetrics} from "../../actions/action"; 
import {useDispatch} from "react-redux";

// const metric_types = [
// 	{'ARR': 'Annual Recurring Revenue'},
// 	{'Customer Churn Rate': 'Customer Churn Rate'},
// 	{'LTV': 'Lifetime Value'},
// 	{'CAC': 'Customer Acquisition Cost'},
// 	{'ARPA': 'Average Run Per Account'},
// 	{'Revenue Churn Rate': 'Revenue Churn Rate'}
// ]

const metric_types = [
	'ARR',
	'Customer Churn Rate',
	'LTV',
	'CAC',
	'ARPA',
	'Revenue Churn Rate'
]

const Company = ()=>{
    const dispatch = useDispatch();
    const [arrMetric, setArrMetric] = useState([]);
    const [ccrMetric, setCcrMetric] = useState([]);
    const [ltvMetric, setLtvMetric] = useState([]);
    const [cacMetric, setCacMetric] = useState([]);
    const [arpaMetric, setArpaMetric] = useState([]);
    const [rcrMetric, setRcrMetric] = useState([]);
    const [isMetricLoading,setIsMetricLoading] = useState([]);
    // const [metric,setMetric] = useState([]);
    // const [copyMetric,setCopyMetric] = useState([]);
    const url_ticker = useParams().ticker;

    useEffect(async()=>{
        setIsMetricLoading(true);
        const response1 = await getKeyMetrics({ticker:url_ticker,metric_type:'ARR'},dispatch);
        setArrMetric(response1.data);
        const response2 = await getKeyMetrics({ticker:url_ticker,metric_type:'Customer Churn Rate'},dispatch);
        setCcrMetric(response2.data);
        const response3 = await getKeyMetrics({ticker:url_ticker,metric_type:'LTV'},dispatch);
        setLtvMetric(response3.data);
        const response4 = await getKeyMetrics({ticker:url_ticker,metric_type:'CAC'},dispatch);
        setCacMetric(response4.data);
        const response5 = await getKeyMetrics({ticker:url_ticker,metric_type:'ARPA'},dispatch);
        setArpaMetric(response5.data);
        const response6 = await getKeyMetrics({ticker:url_ticker,metric_type:'Revenue Churn Rate'},dispatch);
        setRcrMetric(response6.data);
        setIsMetricLoading(false);
    },[])

    
    return (
        <>
            <Navbar/>
            <div className='companycontainer'>
                <div className="companyheading" style={{display:"flex",color:"#9B9B9C"}}>
              <ApartmentOutlinedIcon />
              <h2 style={{lineHeight:"20px",fontWeight:"400"}}>Company</h2>
                </div>
                <div className="companycontent">
            <CompanyFilter arrMetric={arrMetric} ccrMetric={ccrMetric} ltvMetric={ltvMetric} cacMetric={cacMetric} arpaMetric={arpaMetric} rcrMetric={rcrMetric} isMetricLoading={isMetricLoading} />
            {/* <div > */}
            <div style={{width:"70%"}}>
            <div className="padchart" style={{padding:"0px 25px"}}>
                <TableHead />
                <h4 style={{padding:"12px 10px"}}>Key Metrices</h4>
                <div className="stat-tab isvisual">
                   <Button style={{color:"#9b9b9c"}}>ARR (in mil $)</Button>
                   <Button style={{color:"#9b9b9c"}}>LTV/CAC</Button>
                   <Button style={{color:"#9b9b9c"}} >Product-Market Fit</Button>
                   <Button style={{color:"#9b9b9c"}}>Churn Rate</Button>
                </div>
                <Chart />
                </div>
            </div>
            </div>
            </div>
        </>

    );
}

export default Company;