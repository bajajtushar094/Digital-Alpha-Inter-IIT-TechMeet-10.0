import React, { useEffect } from 'react';
import CompanyTabs from './BasketCompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import LightButton from './LightButton/LightButton';
import DarkButton from './DarkButton/DarkButton';
import InfoCard from './InfoCard/InfoCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import TimeFrame from './BasketTimeFrame';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const BasketFilter = (props)=>{
    
    const basketDetails = props.basketDetails;
    const checkImport = () => {
        console.log("checkImport")
        console.log(basketDetails);
    }
    const dispatch = useDispatch();
    const handleClick = () => {
        
    };
    // const queryFilings = props.state.queryFilings;
    //  useEffect(() => {
    //    const func = async () => {
    //      console.log("queryFilings", queryFilings);
    //      const data_byFilings = await axios.post('http://localhost:8000/api/basket/compare', queryFilings);
    //      console.log("Filings:", data_byFilings);
    //    };
    //    func();
    //  }, [dispatch, queryFilings]);

    useEffect(()=>{checkImport();},[])
    return (
            <div className="cardcontainer">
                <div className="leftcardtitle">
                    <h3 className="heading-2">{basketDetails.data.basket.name}</h3>
                </div>
                <CompanyTabs list={basketDetails.data.companies}/>
                <Ticker />
                <TimeFrame />
                <LightButton text="Cancel Selection" to={"/basketList"}/>
                {/* <DarkButton text="Visualize"/> */}
                <Button variant="contained" sx={{backgroundColor:"black" ,"&:hover":{backgroundColor:"black"}}} onClick={handleClick}>Visualize</Button>
            </div>
    )
}


export default BasketFilter;