import React from 'react'
import './data.scss'
import { useState } from 'react';
import vector1 from '../../images/nav/Market.svg';
//componenets
import PerformerCard from '../../Components/Widgets/PerformerCard'
import ViewedCard from '../../Components/Widgets/ViewedCard';
import Table from '../../Components/Widgets/Table';
import { connect } from 'react-redux';

const Data = () => {
  const [selected, setSelected] = useState(1);

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
                 <button className={selected===1?'btn-link active':'btn-link'} onClick={()=>{setSelected(1)}}>Recent fillings</button>
                 <button className={selected===2?'btn-link active':'btn-link'} onClick={()=>{setSelected(2)}}>Bookmarked</button>
                 <button className={selected===3?'btn-link active':'btn-link'} onClick={()=>{setSelected(3)}}>All Companies</button>
               </div>
               <Table/>
            </div>
         </div>
    </div>
  )
}

// export default Data;
const mapStateToProps = (state) => {
	console.log("State:", state);
    return {
        // To get the list of employee details from store
        state: state
    };
};

export default connect(mapStateToProps, null)(Data);
