import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import Table from '../../Components/Widgets/Table';
import Watchlist from '../../Components/Widgets/Watchlist';
import BasketImage from "../../images/widgets/Basket.svg";
import './basket.scss'
const BasketList = () => {
    return (
        <>
            <Navbar />
           <div className="basketcontainer">
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center'}}>
                <div><img src={BasketImage} height={50} width={50} alt=""/></div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center'}}><h2 className="heading heading-2">WatchLists</h2></div>
            </div>
            <div className="basketcontent">
            <div style={{display:'flex', flexDirection:'column',gap:'1rem', justifyItems:'space-around'}}>
            <Watchlist/>
            <RecentlyViewedLogIn/>
            </div>
            
                <Table />
            
            </div>
            </div>
        </>
    );
}

export default BasketList;