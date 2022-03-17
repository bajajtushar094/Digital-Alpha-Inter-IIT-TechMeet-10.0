import React, { useEffect } from 'react';
import CompanyTabs from './BasketCompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import LightButton from './LightButton/LightButton';
import DarkButton from './DarkButton/DarkButton';
import InfoCard from './InfoCard/InfoCard';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from '@mui/material';
import {connect, useDispatch} from 'react-redux';

const BasketFilter = (props)=>{
    const dispatch = useDispatch();
    const basketDetails = props.basketDetails;
    const basketSelectedCompanies = props.state.basketSelectedCompanies;
    const checkImport = () => {
        console.log("checkImport")
        console.log(basketDetails);
    }

    const handleClick = () => {
        if(basketSelectedCompanies.length <= 1){
            alert("Data comparison can be done for 2 or more companies only");
        } else {
            dispatch({type:"ENABLE_VISUALIZE"});
        }
    };

    useEffect(()=>{checkImport();},[])
    return (
            <div className="cardcontainer">
                <div className="leftcardtitle">
                    <h3 className="heading-2">{basketDetails.data.basket.name}</h3>
                </div>
                <CompanyTabs list={basketDetails.data.companies}/>
                <Ticker/>
                <LightButton text="Cancel Selection" to={"/basketList"}/>
                {/* <DarkButton text="Visualize"/> */}
                <Button variant="contained" sx={{backgroundColor:"black" ,"&:hover":{backgroundColor:"black"}}} onClick={handleClick}>Visualize</Button>
            </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        state:state,
    }
}

export default connect(mapStateToProps, null)(BasketFilter);