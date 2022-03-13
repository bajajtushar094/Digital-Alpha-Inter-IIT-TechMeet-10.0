import React from 'react'
import './data.scss'
import { useState } from 'react';
import vector1 from '../../images/nav/Market.svg';
//componenets
import PerformerCard from '../../Components/Widgets/PerformerCard'
import ViewedCard from '../../Components/Widgets/ViewedCard';
import Table from '../../Components/Widgets/Table';

const Data = () => {
  const[selected,setsetselected]=useState(true)
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
               <div className="table_top">
                 <button className={selected?'btn-link active':'btn-link'}>Recent fillings</button>
                 <button className='btn-link'>Bookmarked</button>
                 <button className='btn-link'>All Companies</button>
               </div>
               <Table />
            </div>
         </div>
    </div>
  )
}

export default Data