import React from 'react';
import CompanyTabs from './CompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import FilingType from './FilingType';
import TimeFrame from './TimeFrame';
import CompanyTitle from './CompanyTitle/CompanyTitle';


const CompanyFilter = () => {
    return (
       
            <div className="cardcontainer" >
                <CompanyTitle/>
                <TimeFrame/>
            </div>
        
    );
}

export default CompanyFilter;