import React from "react";
import '../../../../global.scss';
import './companyTabs.scss';
import cross from "../../../../images/widgets/Cross.svg";

const CompanyTabs = ()=>{
    return (
        <div className="tagsflex">
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">AMZN</h4><img src={cross} loading="lazy" alt=""/>
            </div>
        </div>
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">AMZN</h4><img src={cross} loading="lazy" alt=""/>
            </div>
        </div>
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">AMZN</h4><img src={cross} loading="lazy" alt=""/>
            </div>
        </div>
        </div>
    );
}

export default CompanyTabs;