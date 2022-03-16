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
                <div class="metric-entry">
                    <h4 class="black50">LTV/CAC</h4>
                    <h4 id="w-node-_38f3be73-8770-01e7-500a-24cc06557600-5d4911ed" class="iscolumn black50">2.66</h4>
                </div>
                <div class="metric-entry">
                    <h4 class="black50">CAC Recovery</h4>
                    <h4 id="w-node-_12a758a7-925e-3862-0d63-6416fb8d6160-5d4911ed" class="iscolumn black50">13 M</h4>
                </div>
                <div class="metric-entry">
                    <h4 class="black50">Product-Market Fit</h4>
                    <h4 id="w-node-_0816c7f6-b3dd-460d-58e6-fd2302d1d09d-5d4911ed" class="iscolumn black50">34%</h4>
                </div>
                <div class="separator"></div>
            </div>
        </>
    );
}

export default CompanyTitle;