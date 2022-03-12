import React from 'react';
import CompanyTabs from './CompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import FilingType from './FilingType';
import TimeFrame from './TimeFrame';


const MainFilter = () => {
    return (
        <div>
            <div className="cardcontainer">
                <div className="leftcardtitle">
                    <h3 className="heading-2">Filter</h3>
                </div>
                <CompanyTabs/>
                <Ticker/>
                <FilingType/>
                <TimeFrame/>
            </div>
        </div>
    );
}

export default MainFilter;