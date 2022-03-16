import React, { useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CompanyFilter from '../../Components/Widgets/Filters/CompanyFilter';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import TableHead from '../../Components/Widgets/TableHead/TableHead';
import Chart from '../../Components/Widgets/Chart/Chart';
import { Button } from '@mui/material';
import './files.scss'



const File= (props) => {


    return (
        <>
           <Navbar/>
           <div className="filecontainer compcontainer">
           <div className="companyheading" style={{display:"flex",gap:"1rem",color:"#9B9B9C"}}>
              <FileCopyIcon />
              <h2 style={{lineHeight:"20px",fontWeight:"400"}}>Filling</h2>
                </div>
           </div>
           <div className="companycontent">
                    <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <CompanyFilter/>
            <RecentlyViewedLogIn />
            </div>
            {/* <div > */}
            <div style={{width:"70%"}}>
            <div className="padchart" style={{padding:"0px 25px"}}>
                <TableHead childone="metrices" childtwo="filling document"/>
                <h4 style={{padding:"12px 10px"}}>KPI's Retrived</h4>
                <div className="stat-tab isvisual">
                   <Button style={{color:"#9b9b9c"}}>ARR (in mil $)</Button>
                   <Button style={{color:"#9b9b9c"}}>LTV/CAC</Button>
                   <Button style={{color:"#9b9b9c"}} >Product-Market Fit</Button>
                   <Button style={{color:"#9b9b9c"}}>Churn Rate</Button>
                </div>
                <Chart />
                </div>
            </div>
            </div>
        </>
    );
}

export default File;