import React, { useEffect } from 'react';
import CompanyTabs from './CompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import LightButton from './LightButton/LightButton';
import DarkButton from './DarkButton/DarkButton';
import InfoCard from './InfoCard/InfoCard';
import { useNavigate } from 'react-router-dom';

const BasketFilter = (props)=>{

    const basketDetails = props.basketDetails;
    const checkImport = () => {
        console.log("checkImport")
        console.log(basketDetails);
    }
    useEffect(()=>{checkImport();},[])
    return (
            <div className="cardcontainer">
                <div className="leftcardtitle">
                    <h3 className="heading-2">{basketDetails.data.basket.name}</h3>
                </div>
                <CompanyTabs list={basketDetails.data.companies}/>
                <Ticker/>
                <LightButton text="Cancel Selection" to={"/basketList"}/>
                <DarkButton text="Visualize"/>
            </div>
    )
}

export default BasketFilter;