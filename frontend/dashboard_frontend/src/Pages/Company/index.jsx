import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import CompanyFilter from '../../Components/Widgets/Filters/CompanyFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import './company.scss'
import "../../global.scss";
import TableHead from '../../Components/Widgets/TableHead/TableHead';
import { Button } from '@mui/material';
import Chart from '../../Components/Widgets/Chart/Chart';

const Company = ()=>{

    
    return (
        <>
            <Navbar/>
            <div className='companycontainer'>
                <div className="companyheading" style={{display:"flex",color:"#9B9B9C"}}>
              <ApartmentOutlinedIcon />
              <h2 style={{lineHeight:"20px",fontWeight:"400"}}>Company</h2>
                </div>
                <div className="companycontent">
            <CompanyFilter/>
            {/* <div > */}
            <div style={{width:"70%"}}>
            <div className="padchart" style={{padding:"0px 25px"}}>
                <TableHead />
                <h4 style={{padding:"12px 10px"}}>Key Metrices</h4>
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
            </div>
        </>

    );
}

export default Company;