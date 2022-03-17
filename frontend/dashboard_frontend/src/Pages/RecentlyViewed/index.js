import React, { useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import MainFilter from '../../Components/Widgets/Filters/MainFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import AccessTimeIcon from '@mui/icons-material/ApartmentOutlined';
import './recentlyviewed.scss'
import "../../global.scss";
import TableHead from '../../Components/Widgets/TableHead/TableHead';
import { Button } from '@mui/material';
import Chart from '../../Components/Widgets/Chart/Chart';
import Watchlist from '../../Components/Widgets/Watchlist';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import Table from '../../Components/Widgets/Table';

const RecentlyViewed= ()=>{
    const[selected,setsetselected]=useState(true)
    
    return (
        <>
            <Navbar/>
            <div className='companycontainer'>
                <div className="companyheading" style={{display:"flex",color:"#9B9B9C"}}>
              <AccessTimeIcon />
              <h2 style={{lineHeight:"20px",fontWeight:"400"}}>Recently Viewed</h2>
                </div>
                <div className="companycontent">
                    <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <MainFilter/>
            </div>
            {/* <div > */}
            <div style={{width:"70%"}}>
            <div className='tablesec'>
               <Table />
            </div>
            </div>
            </div>
            </div>
        </>

    );
}

export default RecentlyViewed;