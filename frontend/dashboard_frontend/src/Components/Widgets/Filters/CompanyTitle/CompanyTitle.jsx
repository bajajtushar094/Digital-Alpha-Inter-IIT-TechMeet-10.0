import React, { useState } from 'react';
import "../../../../global.scss";
import "./CompanyTitle.scss";
import More from "../../../../images/widgets/More.svg";
import { IconButton } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ShareIcon from '@mui/icons-material/Share';

const CompanyTitle = (props) => {

    const[hover,setHover]=useState(false)
    const[bool,setBool]=useState(props.isCompany)

    const handleMouseIn = () => {
        setHover(true);
        console.log("enter")
      };

      const handleMouseOut = () => {
        setHover(false);
        console.log("false")
      };

    return (
        <>
            <div id="w-node-a4d716ba-89a8-25f8-efb6-9256467879f7-5d4911ed" class="listing issmall comptitle">
                <div class="listingheader-wrapper">
                    <div class="listingheadergrid">
                        {bool?<><div class="compcontainer isbig">
                            <div class="logo-wrapper isbig"><img src="https://uploads-ssl.webflow.com/6223552248fd5d64304911ec/622788b6ed5b1301d589b856_ASAN.svg" loading="lazy" alt=""/></div>
                        </div>
                        <div id="w-node-a76e39fc-47ab-e63f-05cc-34673b655eb5-5d4911ed">
                            <h3>Asana Ltd.</h3>
                            <h4 class="black15">ASAN</h4>
                        </div></>: <>
    <div class="filingcontainer">
        <div class="ui-text issecondarybutton isfiling">8K</div>
    </div>
    <div id="w-node-b6ad1064-49e9-79f3-df7a-f41125cb80fe-5d4911ed">
            <div class="ui-text black100">Adobe Inc.</div>
            <h4 class="black15">ADBE</h4>
    </div>
    </>}
                        
                    </div>
                </div>
                <div class="actions issmall">
                 
                    <div class="actioncontainer" style={{display:"flex",justifyContent:"center",alignItems:"center"}} onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} >
                  {
                      bool?<><MoreVert className={hover&&"hide"}/>
                      <IconButton  className={!hover&&"hide"} style={{display:"flex",background:"transparent"}}>
                     <BookmarkBorderIcon />
                      </IconButton></>:<>
                      <ApartmentIcon className='color'/>
                      <ShareIcon className='color'/>
                      </>
                  }
                    </div>
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