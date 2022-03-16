import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar';
import BasketFilter from "../../Components/Widgets/Filters/BasketFilter";
import InfoCard from '../../Components/Widgets/Filters/InfoCard/InfoCard';
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
import BasketImage from "../../images/widgets/Basket.svg";
import './indibasket.scss'

const IndividualBasket = ()=>{
    
    return (
        <>
            <Navbar/>
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center'}}>
                <div><img src={BasketImage} height={50} width={50} alt=""/></div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center'}}><h2 className="heading heading-2">WatchLists</h2></div>
            </div>
            <div className='indibasketcontent'>
            <div style={{display:'flex', flexDirection:'column',  justifyItems:'space-around'}}>
            <BasketFilter/>
            <InfoCard/>
            </div>
            <Table />
            </div>
        </>
    )
}

export default IndividualBasket;