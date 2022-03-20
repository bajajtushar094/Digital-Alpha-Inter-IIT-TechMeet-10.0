import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import BasketFilter from "../../Components/Widgets/Filters/BasketFilter";
import InfoCard from '../../Components/Widgets/Filters/InfoCard/InfoCard';
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
import BasketImage from "../../images/widgets/Basket.svg";
import './indibasket.scss';
import { useDispatch, connect } from 'react-redux';
import {deselectInBasket, getBasketDetails, selectInBasket} from "../../actions/action";
import { useParams } from 'react-router-dom';
import { Checkbox, List, ListItem } from '@mui/material';
import Chart from '../../Components/Widgets/Chart/Chart'
import { Box } from '@mui/system';
import { ResponsiveContainer } from 'recharts';
import MetricTabs from './MetricTabs';
import {handleDownloadGet} from '../../utils/downloadCsv';
import { LOCAL_SERVER_URL } from '../../config';

const IndividualBasket = (props)=>{
    const dispatch = useDispatch();
    const basket_id = useParams().basket_id;
    const state = props.state;
    // const [visualize, setVisualize] = useState(false);
    let basketDetails = props.state.basketDetails;
    const addSelector = () => {
        for(let i=0;i<basketDetails.data.companies.length;i++){
            basketDetails.data.companies[i].selected = true;
        }
    }
    let visualize = props.state.visualize;
    let tickers = props.state.queryFilings.tickers;

    const handleChange = (event, company) => {
        if(company.selected === true) {
            company.selected = false;
            const response = deselectInBasket(company, dispatch);
        } else {
            company.selected = true;
            const response = selectInBasket(company, dispatch);
        }
    }
    useEffect(()=>{
        const fetchBasketDetails = async () => {
            try {
                const response = await getBasketDetails(basket_id, dispatch);
            } catch(err) {
                console.log("Error: ", err);
            }
        };
        fetchBasketDetails();
        addSelector();
    }, []);

    const downloadCSV = () => {
        handleDownloadGet(LOCAL_SERVER_URL + "api/basket/detailsCSV" + "?basket_id=" + basket_id, );
    }

    return (
        <>
            <Navbar/>
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center'}}>
                <div><img src={BasketImage} height={50} width={50} alt=""/></div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center'}}><h2 className="heading heading-2">WatchLists</h2></div>
            </div>
            <div className='indibasketcontent'>
            <div style={{display:'flex', flexDirection:'column',  justifyItems:'space-around'}}>
            <BasketFilter basketDetails={basketDetails} />
            <InfoCard/>
            </div>
            {/* <Table /> */}
            {/* <List>
                {basketDetails.data.companies.map((company)=> {
                    return(
                        <ListItem>
                            <Checkbox checked={company.selected} onChange={(event) => handleChange(event,company)}/>
                            {company.name}
                        </ListItem>
                    )
                })}
            </List> */}
            
                {/* <Chart/> */}
            
            
            {visualize?<MetricTabs/>:
            <List>
                 <div style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
            {basketDetails.data.companies.map((company)=> {
              console.log("hiiii"+company)
                return(
               
<div className="listingheader-wrapper" >
    <div className="listingheadergrid hascheckbox gap">
        <div>
            <input style={{height:"20px",width:"20px"}} type="checkbox" />
        </div>
        <div className="compcontainer isbig">
            <div className="logo-wrapper isbig watchlist">
                <img src={company.logo} alt=""/>
                    </div>
                    </div>
                    <div id="w-node-c89bc2cb-3ec9-b26a-c1ca-cdb566446426-5d4911ed">
                        <h3>{company.name}</h3>
                        <h4 className="black15">{company.ticker}</h4>
                        </div>
                        </div>
                        </div>
                        
                    // <ListItem>
                    //     <Checkbox checked={company.selected} onChange={(event) => handleChange(event,company)}/>
                    //     {company.name}
                    // </ListItem>
                )
            })}
            </div>
            </List>
            }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state,
    };
}

export default connect(mapStateToProps, null)(IndividualBasket);