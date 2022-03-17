import React, { useEffect } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import BasketFilter from "../../Components/Widgets/Filters/BasketFilter";
import InfoCard from '../../Components/Widgets/Filters/InfoCard/InfoCard';
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
import BasketImage from "../../images/widgets/Basket.svg";
import './indibasket.scss';
import { useDispatch, connect } from 'react-redux';
import {getBasketDetails} from "../../actions/action";
import { useParams } from 'react-router-dom';
import { Checkbox, List, ListItem } from '@mui/material';

const IndividualBasket = (props)=>{
    const dispatch = useDispatch();
    const basket_id = useParams().basket_id;
    const basketDetails = props.state.basketDetails;
    useEffect(async ()=>{
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
            <BasketFilter basketDetails={basketDetails}/>
            <InfoCard/>
            </div>
            {/* <Table /> */}
            <List>
                {basketDetails.data.companies.map((company)=> {
                    return(
                        <ListItem>
                            <Checkbox/>
                            {company.name}
                        </ListItem>
                    )
                })}
            </List>
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