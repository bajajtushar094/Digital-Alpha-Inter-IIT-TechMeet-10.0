import React from 'react';
import "../../../../global.scss";
import "./CompanyTitle.scss";
import More from "../../../../images/widgets/More.svg";

const CompanyTitle = (props) => {
    return (
        <>
            <div id="w-node-a4d716ba-89a8-25f8-efb6-9256467879f7-5d4911ed" class="listing issmall comptitle">
                <div class="listingheader-wrapper">
                    <div class="listingheadergrid">
                        <div class="compcontainer isbig">
                            <div class="logo-wrapper isbig"><img src="https://uploads-ssl.webflow.com/6223552248fd5d64304911ec/622788b6ed5b1301d589b856_ASAN.svg" loading="lazy" alt=""/></div>
                        </div>
                        <div id="w-node-a76e39fc-47ab-e63f-05cc-34673b655eb5-5d4911ed">
                            <h3>Asana Ltd.</h3>
                            <h4 class="black15">ASAN</h4>
                        </div>
                    </div>
                </div>
                <div class="actions issmall">
                    <div class="actioncontainer"></div>
                    <div class="actioncontainer"><img src={More} loading="lazy" alt=""/></div>
                </div>
            </div>
            <div id="w-node-_38f3be73-8770-01e7-500a-24cc065575f2-5d4911ed" class="metrics">
                {props.isMetricLoading?
                    <div></div>
                        :
                    <div>
                        {props.arrMetric.map((item)=>{
                            return(
                                <div class="metric-entry">
                                    <h4 class="black50">{item.metric_type}</h4>
                                    <h4 id="w-node-_38f3be73-8770-01e7-500a-24cc06557600-5d4911ed" class="iscolumn black50">{item.metric_value} {item.metric_unit}</h4>
                                </div>
                            )
                            
                        })}
                            {props.ccrMetric.map((item)=>{
                            return(
                                <div class="metric-entry">
                                    <h4 class="black50">{item.metric_type}</h4>
                                    <h4 id="w-node-_38f3be73-8770-01e7-500a-24cc06557600-5d4911ed" class="iscolumn black50">{item.metric_value} {item.metric_unit}</h4>
                                </div>
                            )
                            
                        })}
                            {props.ltvMetric.map((item)=>{
                            return(
                                <div class="metric-entry">
                                    <h4 class="black50">{item.metric_type}</h4>
                                    <h4 id="w-node-_38f3be73-8770-01e7-500a-24cc06557600-5d4911ed" class="iscolumn black50">{item.metric_value} {item.metric_unit}</h4>
                                </div>
                            )
                            
                        })}
                            {props.cacMetric.map((item)=>{
                            return(
                                <div class="metric-entry">
                                    <h4 class="black50">{item.metric_type}</h4>
                                    <h4 id="w-node-_38f3be73-8770-01e7-500a-24cc06557600-5d4911ed" class="iscolumn black50">{item.metric_value} {item.metric_unit}</h4>
                                </div>
                            )
                            
                        })}
                            {props.rcrMetric.map((item)=>{
                            return(
                                <div class="metric-entry">
                                    <h4 class="black50">{item.metric_type}</h4>
                                    <h4 id="w-node-_38f3be73-8770-01e7-500a-24cc06557600-5d4911ed" class="iscolumn black50">{item.metric_value} {item.metric_unit}</h4>
                                </div>
                            )
                            
                        })}

                    </div>
                }
                
                <div class="separator"></div>
            </div>
        </>
    );
}

export default CompanyTitle;