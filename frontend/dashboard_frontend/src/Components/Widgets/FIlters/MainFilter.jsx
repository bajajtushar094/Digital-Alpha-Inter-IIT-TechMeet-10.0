import React from 'react';
import CompanyTabs from './CompanyTabs';
import Ticker from './Ticker';
import '../../../global.scss';
import './MainFilter.scss';
import FilingType from './FilingType';


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
                <div id="w-node-_6a908ad0-02ce-84fb-5195-d4c0f43f65e9-5d4911ed" className="filter-timeframe">
                    <div className="ui-text black100">Timeframe</div>
                    <div id="w-node-_41cc1a62-f60f-c68b-ea37-f0b418e4c9f4-5d4911ed" className="filter-ticker">
                        <div id="w-node-ec0d4782-ae1d-f1c1-9d9a-feb852a07851-5d4911ed" className="div-block-13">
                            <h4 id="w-node-_4a412ca3-f5ce-763d-829c-a0e5771ee42d-5d4911ed" className="black50">From</h4><img src="images/Cross.svg" loading="lazy" alt=""/>
                        </div>
                        <div className="tickersearch">
                            <div className="tickerinput">
                                <h4 className="black50">15 MAR’20</h4>
                            </div>
                            <a href="#" className="w-inline-block">
                                <div className="div-block-12"><img src="images/Calendar.svg" loading="lazy" alt=""/></div>
                            </a>
                        </div>
                    </div>
                    <div id="w-node-c071388f-cb3a-5bab-8d80-adf879c84f67-5d4911ed" className="filter-ticker">
                        <div id="w-node-_5800b8ef-4631-a1f8-ce8e-aed70a5571c0-5d4911ed" className="div-block-13">
                            <h4 id="w-node-_5800b8ef-4631-a1f8-ce8e-aed70a5571c1-5d4911ed" className="black50">To</h4><img src="images/Cross.svg" loading="lazy" alt=""/>
                        </div>
                        <div className="tickersearch">
                            <div className="tickerinput">
                                <h4 className="black50">27 MAR’20</h4>
                            </div>
                            <a href="#" className="w-inline-block">
                                <div className="div-block-12"><img src="images/Calendar.svg" loading="lazy" alt=""/></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainFilter;