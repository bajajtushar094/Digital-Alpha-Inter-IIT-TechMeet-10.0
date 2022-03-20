import React from 'react';
import CompanyTabs from './CompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import FilingType from './FilingType';
import TimeFrame from './TimeFrame';
import CompanyTitle from './CompanyTitle/CompanyTitle';


const CompanyFilter = (props) => {
    return (
       
            <div className="cardcontainer" >
                <CompanyTitle company={props.company} allMetrics={props.allMetrics} isMetricLoading={props.isMetricLoading} />
               
                <TimeFrame/>
            </div>
        
    );
}

export default CompanyFilter;