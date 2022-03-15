import React from 'react';
import CompanyTabs from './CompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import LightButton from './LightButton/LightButton';
import DarkButton from './DarkButton/DarkButton';
import InfoCard from './InfoCard/InfoCard';

const BasketFilter = ()=>{
    return (
            <div className="cardcontainer">
                <div className="leftcardtitle">
                    <h3 className="heading-2">Basket Title</h3>
                </div>
                <CompanyTabs/>
                <Ticker/>
                <LightButton text="Cancel Selection"/>
                <DarkButton text="Visualize"/>
            </div>
    )
}

export default BasketFilter;