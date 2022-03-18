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

const IndividualBasket = (props)=>{
    const dispatch = useDispatch();
    const basket_id = useParams().basket_id;
    // const [visualize, setVisualize] = useState(false);
    let basketDetails = props.state.basketDetails;
    const addSelector = () => {
        for(let company in basketDetails.data.companies){
            company["selected"] = false;
        }
    }
    let visualize = props.state.visualize;
    

    const handleChange = (event, company) => {
        if(company.selected === true) {
            company.selected = false;
            const response = deselectInBasket(company, dispatch);
            console.log(basketDetails.data);
        } else {
            company.selected = true;
            const response = selectInBasket(company, dispatch);
        }
    }
    useEffect(()=>{
        const fetchBasketDetails = async () => {
            try {
                const response = await getBasketDetails(basket_id, dispatch);
                console.log(response.data);
                console.log(basketDetails);
            } catch(err) {
                console.log("Error: ", err);
            }
        };
        fetchBasketDetails();
        addSelector();
    }, []);


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
            {basketDetails.data.companies.map((company)=> {
                return(
                    <ListItem>
                        <Checkbox checked={company.selected} onChange={(event) => handleChange(event,company)}/>
                        {company.name}
                    </ListItem>
                )
            })}
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