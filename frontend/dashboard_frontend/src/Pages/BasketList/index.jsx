import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import Watchlist from '../../Components/Widgets/Watchlist';
import BasketImage from "../../images/widgets/Basket.svg";
const BasketList = () => {
    return (
        <div>
            <Navbar />
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center'}}>
                <div><img src={BasketImage} height={50} width={50} alt=""/></div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center'}}><h2 className="heading heading-2">WatchLists</h2></div>
            </div>
            <div style={{height:"50vh",display:'flex', flexDirection:'column', justifyContent:'space-evenly', justifyItems:'space-around'}}>
            <Watchlist/>
            </div>
        </div>
    );
}

export default BasketList;