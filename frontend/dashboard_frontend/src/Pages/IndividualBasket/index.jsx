import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import BasketFilter from "../../Components/Widgets/Filters/BasketFilter";
import InfoCard from '../../Components/Widgets/Filters/InfoCard/InfoCard';
import "../../global.scss";
import BasketImage from "../../images/widgets/Basket.svg";

const IndividualBasket = ()=>{
    return (
        <div>
            <Navbar/>
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center'}}>
                <div><img src={BasketImage} height={50} width={50} alt=""/></div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center'}}><h2 className="heading heading-2">WatchLists</h2></div>
            </div>
            <div style={{height:"75vh",display:'flex', flexDirection:'column', justifyContent:'space-evenly', justifyItems:'space-around'}}>
            <BasketFilter/>
            <InfoCard/>
            </div>
        </div>
    )
}

export default IndividualBasket;