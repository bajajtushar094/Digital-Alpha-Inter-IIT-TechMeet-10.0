import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { getBasketDetails } from '../../actions/action';
import Navbar from '../../Components/Global/Navbar/Navbar';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';
import Table from '../../Components/Widgets/Table';
import Watchlist from '../../Components/Widgets/Watchlist';
import BasketImage from "../../images/widgets/Basket.svg";
import img from './NoBasket.png';
import './basket.scss'
const BasketList = (props) => {
    // const dispatch = useDispatch();
    // const basket = props.state.currentBasket || [];
    // // const basketDetails = props.state.basketDetails.companies || [];

    // React.useEffect(()=>{
        
    //     const fetchBasketDetails = async () => {
    //         try {
    //             const response = await getBasketDetails(basket.id, dispatch);
    //         } catch(err) {
    //             console.log("Error: ", err);
    //         }
    //     };
    //     if(basket.id)
    //         fetchBasketDetails();
    // },[basket])

    // React.useEffect(()=>{
    //     // console.log("Bl",basketDetails)
    //     console.log(basket)
    // },[]);
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
                <div style={{width:"100%",height:"430px",display:"flex",justifyContent:"center"}}>
                <img style={{marginTop:"6rem"}}  src={img} alt="" />
                </div>
            </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps, null)(BasketList);