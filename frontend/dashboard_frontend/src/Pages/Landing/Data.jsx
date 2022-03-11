import React from 'react'
import './data.scss'
import vector1 from '../../images/nav/Market.svg';
//componenets
import PerformerCard from '../../Components/Widgets/PerformerCard'
import ViewedCard from '../../Components/Widgets/ViewedCard';

const Data = () => {
  return (
    <div className='landingdata'>
         <div className='top'>
         <img src={vector1} alt="" /> 
         <h3>The Market</h3>   
         </div>
         <div className='body'>
           <div className='cardsec'>
             <PerformerCard />
             <ViewedCard />
           </div>
           <div className='tablesec'>
               Table
            </div>
         </div>
    </div>
  )
}

export default Data