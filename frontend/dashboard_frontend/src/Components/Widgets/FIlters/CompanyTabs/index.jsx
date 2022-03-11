import React from "react";
import '../../../../global.scss';
import './companyTabs.scss';

const CompanyTabs = ()=>{
    return (
        <div className="tagsflex">
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">AMZN</h4><img src="images/Cross.svg" loading="lazy" alt=""/>
            </div>
        </div>
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">AMZN</h4><img src="images/Cross.svg" loading="lazy" alt=""/>
            </div>
        </div>
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">AMZN</h4><img src="images/Cross.svg" loading="lazy" alt=""/>
            </div>
        </div>
        </div>
    );
}

export default CompanyTabs;